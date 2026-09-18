import type { LucideIcon } from "lucide-react";

type IconSize = "sm" | "md" | "lg" | "xl";

interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
}

const sizeClasses: Record<IconSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
};

export default function Icon({
  icon: IconComponent,
  size = "md",
  className = "",
}: IconProps) {
  return (
    <IconComponent
      className={`${sizeClasses[size]} shrink-0 ${className}`}
      strokeWidth={2}
    />
  );
}