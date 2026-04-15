import { useRef, useCallback, useEffect, useState } from "react";
import { secToTime } from "../utils/time";

const B = "#2662DB";

export default function TrimSelector({ duration, start, end, onChangeEnd }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const [localStart, setLocalStart] = useState(start);
  const [localEnd, setLocalEnd] = useState(end);

  // Sync local state when props change (e.g. switching notes)
  useEffect(() => { setLocalStart(start); }, [start]);
  useEffect(() => { setLocalEnd(end); }, [end]);

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const pct = (val) => (duration > 0 ? clamp((val / duration) * 100, 0, 100) : 0);

  const posToTime = useCallback(
    (clientX) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect || duration <= 0) return 0;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(ratio * duration);
    },
    [duration]
  );

  const handleMove = useCallback(
    (e) => {
      if (!dragging) return;
      e.preventDefault();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const t = posToTime(cx);
      if (dragging === "start") {
        setLocalStart(clamp(t, 0, localEnd - 5));
      } else {
        setLocalEnd(clamp(t, localStart + 5, duration));
      }
    },
    [dragging, localStart, localEnd, duration, posToTime]
  );

  const handleUp = useCallback(() => {
    setDragging(null);
    // Commit final values to parent → triggers iframe reload
    onChangeEnd?.({ start: localStart, end: localEnd });
  }, [localStart, localEnd, onChangeEnd]);

  useEffect(() => {
    if (!dragging) return;
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [dragging, handleMove, handleUp]);

  if (!duration || duration <= 0) return null;

  return (
    <div style={{ padding: "8px 0 2px", userSelect: "none", touchAction: "none" }}>
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", fontWeight: 600, marginBottom: 6 }}>
        Trim del clip
      </div>

      <div style={{ padding: "10px 7px", margin: "0 -7px" }}>
        <div
          ref={trackRef}
          style={{ position: "relative", height: 6, background: "#e2e8f0", borderRadius: 3 }}
          onClick={(e) => {
            if (dragging) return;
            const t = posToTime(e.clientX);
            if (Math.abs(t - localStart) < Math.abs(t - localEnd)) {
              const ns = clamp(t, 0, localEnd - 5);
              setLocalStart(ns);
              onChangeEnd?.({ start: ns, end: localEnd });
            } else {
              const ne = clamp(t, localStart + 5, duration);
              setLocalEnd(ne);
              onChangeEnd?.({ start: localStart, end: ne });
            }
          }}
        >
          {/* Selected range */}
          <div style={{
            position: "absolute", top: 0,
            left: `${pct(localStart)}%`, width: `${pct(localEnd) - pct(localStart)}%`,
            height: "100%", background: B, borderRadius: 3, zIndex: 1,
          }} />

          {/* Start handle */}
          <div
            style={{
              position: "absolute", top: -12, left: `${pct(localStart)}%`,
              width: 30, height: 30, transform: "translateX(-50%)",
              cursor: "grab", zIndex: 5,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseDown={(e) => { e.preventDefault(); setDragging("start"); }}
            onTouchStart={(e) => { e.preventDefault(); setDragging("start"); }}
          >
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "#fff", border: `2.5px solid ${B}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)", pointerEvents: "none",
            }} />
          </div>

          {/* End handle */}
          <div
            style={{
              position: "absolute", top: -12, left: `${pct(localEnd)}%`,
              width: 30, height: 30, transform: "translateX(-50%)",
              cursor: "grab", zIndex: 5,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseDown={(e) => { e.preventDefault(); setDragging("end"); }}
            onTouchStart={(e) => { e.preventDefault(); setDragging("end"); }}
          >
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "#fff", border: `2.5px solid ${B}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)", pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>

      {/* Time labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: B, fontWeight: 600 }}>
          {secToTime(localStart)}
        </span>
        <span style={{ fontSize: 9, fontFamily: "monospace", color: "#94a3b8" }}>
          duración: {secToTime(localEnd - localStart)}
        </span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: B, fontWeight: 600 }}>
          {secToTime(localEnd)}
        </span>
      </div>
    </div>
  );
}
