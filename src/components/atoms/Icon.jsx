export function Icon({ name, size = 24, style = {}, className = "" }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "Material Symbols Outlined",
        fontSize: size,
        fontVariationSettings: "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24",
        verticalAlign: "middle",
        lineHeight: 1,
        userSelect: "none",
        ...style,
      }}
    >
      {name}
    </span>
  );
}
