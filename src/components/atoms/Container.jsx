export function Container({ children, style = {}, className = '', ...rest }) {
  return (
    <div
      className={className}
      style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
