"use client";

import type React from "react";

import { Card, CardContent } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";

type AuthCardLayoutProps = React.PropsWithChildren<
  React.ComponentProps<"div"> & {
    below?: React.ReactNode;

    /** Right-side panel wrapper. Hidden on mobile by default. */
    rightClassName?: string;

    /** Right-side image settings. */
    imageSrc?: string;
    imageAlt?: string;
    imageClassName?: string;
  }
>;

export function AuthCardLayout({
  className,
  children,
  below,
  rightClassName = "bg-muted relative hidden md:block",
  imageSrc = "/ims.png",
  imageAlt = "Image",
  imageClassName =
    "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale",
  ...props
}: AuthCardLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {children}

          <div className={rightClassName}>
            <img src={imageSrc} alt={imageAlt} className={imageClassName} />
          </div>
        </CardContent>
      </Card>

      {below}
    </div>
  );
}
