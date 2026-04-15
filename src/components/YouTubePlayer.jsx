import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

let apiLoaded = false;
let apiReady = false;
const readyCallbacks = [];

function loadApi() {
  if (apiLoaded) return;
  apiLoaded = true;
  window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    readyCallbacks.forEach((cb) => cb());
    readyCallbacks.length = 0;
  };
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
}

function onApiReady(cb) {
  if (apiReady) return cb();
  readyCallbacks.push(cb);
}

const YouTubePlayer = forwardRef(function YouTubePlayer(
  { videoId, startSeconds, endSeconds },
  ref
) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    loadApi();
    onApiReady(() => {
      if (!containerRef.current) return;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          start: Math.floor(startSeconds ?? 0),
          end: endSeconds ? Math.ceil(endSeconds) : undefined,
          rel: 0,
          modestbranding: 1,
          autoplay: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => setReady(true),
        },
      });
    });
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, startSeconds, endSeconds]);

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => {
      try {
        return playerRef.current?.getCurrentTime?.() ?? 0;
      } catch { return 0; }
    },
  }), [ready]);

  return (
    <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", background: "#000" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
});

export default YouTubePlayer;
