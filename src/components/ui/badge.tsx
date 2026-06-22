import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-navy text-white hover:bg-navy/80",
        secondary:
          "border-transparent bg-sky-100 text-sky-800 hover:bg-sky-100/80",
        destructive:
          "border-transparent bg-rose-100 text-rose-800 hover:bg-rose-100/80",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
        warning: "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-100/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
