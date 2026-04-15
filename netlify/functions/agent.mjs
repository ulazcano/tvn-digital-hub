export default async function handler(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const { noteData, question } = await req.json();

  if (!question || !noteData) {
    return new Response(JSON.stringify({ error: "Missing noteData or question" }), { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), { status: 500 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system:
        "Eres un asistente editorial inteligente de TVN (Televisión Nacional de Chile). " +
        "Ayudas al equipo de producción digital a analizar, mejorar y tomar decisiones sobre notas periodísticas generadas por IA. " +
        "Tienes acceso a los datos completos de la nota seleccionada. " +
        "Responde en español, de forma concisa, profesional y útil. " +
        "Si te piden reescribir textos, mantén el estilo periodístico de TVN.",
      messages: [
        {
          role: "user",
          content:
            `Datos de la nota seleccionada:\n\`\`\`json\n${JSON.stringify(noteData, null, 2)}\n\`\`\`\n\n` +
            `Pregunta del editor: ${question}`,
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: data.error?.message || "API error" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const text = data.content?.[0]?.text || "";

  return new Response(JSON.stringify({ response: text }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export const config = {
  path: "/api/agent",
};
