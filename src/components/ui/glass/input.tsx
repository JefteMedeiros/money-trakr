"use client";

import * as React from "react";
import { Input as BaseInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { GlassCustomization } from "@/lib/glass-utils";
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects";

export interface InputProps extends Omit<
  React.ComponentProps<typeof BaseInput>,
  "glass"
> {
  error?: boolean;
  hover?: HoverEffect;
  glass?: GlassCustomization;
}

/**
 * Glass UI Input - A beautifully designed input component with glassy effects
 * Built on top of the base Input component with enhanced visual styling
 *
 * @example
 * ```tsx
 * <Input
 *   glass={{
 *     color: "rgba(255, 255, 255, 0.15)",
 *     blur: 15,
 *     outline: "rgba(255, 255, 255, 0.3)"
 *   }}
 *   placeholder="Enter text..."
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = "glass", error, hover = "none", glass, ...props },
    ref,
  ) => {
    return (
      <BaseInput
        ref={ref}
        variant={variant}
        glass={glass}
        className={cn(
          "relative overflow-hidden",
          error && "border-destructive focus-visible:ring-destructive",
          "transition-all duration-200 focus-visible:scale-[1.02]",
          hoverEffects({ hover }),
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
