export const timeToSec = (t) => t.split(":").reduce((a, b) => a * 60 + +b, 0);

export const secToTime = (s) =>
  [Math.floor(s / 3600), Math.floor((s % 3600) / 60), Math.floor(s % 60)]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
