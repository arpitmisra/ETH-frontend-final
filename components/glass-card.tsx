import { cn } from "@/lib/utils"
import type React from "react"

export function GlassCard({
  className,
  children,
  as: Tag = "div",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { as?: React.ElementType }) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40",
        "shadow-[0_1px_0_0_hsla(0,0%,100%,0.05)_inset,0_8px_32px_rgba(0,0,0,0.15)]",
        "transition-transform duration-200 will-change-transform hover:scale-[1.01]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
