import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "solid" | "outline";
};

export default function Button({
  children,
  className = "",
  variant = "solid",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-3 px-5 text-[11px] font-semibold tracking-[0.18em] transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5 ${
        variant === "solid"
          ? "bg-red text-white hover:bg-[#ff3c43]"
          : "border border-white/25 text-white hover:border-white/65 hover:bg-white/10"
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}