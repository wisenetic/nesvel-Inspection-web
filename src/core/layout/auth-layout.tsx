"use client";

import type React from "react";

import { Card, CardContent } from "@/core/components/ui/card";
import { cn } from "@/core/lib/utils";

type AuthLayoutProps = React.PropsWithChildren<
  React.ComponentProps<"div"> & {
    /** Override the width constraints of the centered content container */
    contentClassName?: string;

    /** Content rendered below the card (e.g. legal disclaimer) */
    below?: React.ReactNode;

    /** Right-side panel wrapper. Hidden on mobile by default. */
    rightClassName?: string;

    /** Right-side image settings */
    imageSrc?: string;
    imageAlt?: string;
    imageClassName?: string;
  }
>;

export function AuthLayout({
  className,
  contentClassName,
  children,
  below,
  rightClassName = "bg-muted relative hidden md:block",
  imageSrc = "/ims.png",
  imageAlt = "Image",
  imageClassName =
    "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale",
  ...props
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10",
        className,
      )}
      {...props}
    >
      <div className={cn("w-full max-w-sm md:max-w-4xl", contentClassName)}>
        <div className="flex flex-col gap-6">
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
      </div>
    </div>
  );
}
