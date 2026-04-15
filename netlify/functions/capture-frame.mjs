import { execSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const { videoId, timestamp } = await req.json();
  if (!videoId || timestamp === undefined) {
    return new Response(JSON.stringify({ error: "Missing videoId or timestamp" }), { status: 400 });
  }

  const tmp = mkdtempSync(join(tmpdir(), "frame-"));
  const outPath = join(tmp, "frame.jpg");

  try {
    // Get direct stream URL
    const streamUrl = execSync(
      `yt-dlp -f "b" --get-url "https://www.youtube.com/watch?v=${videoId}"`,
      { encoding: "utf-8", timeout: 15000 }
    ).trim();

    // Extract single frame at timestamp
    execSync(
      `ffmpeg -ss ${Math.floor(timestamp)} -i "${streamUrl}" -frames:v 1 -q:v 2 -y "${outPath}"`,
      { timeout: 15000, stdio: "pipe" }
    );

    const imageBuffer = readFileSync(outPath);
    const base64 = imageBuffer.toString("base64");

    return new Response(JSON.stringify({ image: `data:image/jpeg;base64,${base64}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

export const config = {
  path: "/api/capture-frame",
};
