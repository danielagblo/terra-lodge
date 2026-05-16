type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  title?: string;
};

export default function Icon({
  name,
  className = "",
  filled = false,
  title,
}: IconProps) {
  const ariaProps = title
    ? { role: "img" as const, "aria-label": title }
    : { "aria-hidden": true as const };
  const variantClassName = filled ? "material-symbols-outlined fill-1" : "material-symbols-outlined";

  return (
    <span
      {...ariaProps}
      className={`${variantClassName} ${className}`.trim()}
    >
      {name}
    </span>
  );
}
