export function Blob({ top, right, bottom, left, size = 400, color = "rgba(160,65,0,.12)", blur = 120 }) {
  return (
    <div style={{ position: "absolute", top, right, bottom, left, width: size, height: size, background: color, borderRadius: "50%", filter: `blur(${blur}px)`, pointerEvents: "none" }} />
  );
}
