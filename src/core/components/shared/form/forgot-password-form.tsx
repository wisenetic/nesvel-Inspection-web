"use client";

import { ArrowLeft, GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";

import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";

import { cn } from "@/core/lib/utils";
import { useForgotPassword, useLink, useRefineOptions } from "@refinedev/core";
import { FieldGroup, Field, FieldLabel } from "../../ui/field";

export const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("");

  const Link = useLink();

  const { title } = useRefineOptions();

  const { mutate: forgotPassword } = useForgotPassword();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    forgotPassword({
      email,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleForgotPassword} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <a
                  href="#"
                  className="flex items-center gap-2 self-center font-medium"
                >
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    {title.icon ?? <GalleryVerticalEnd className="size-4" />}
                  </div>
                  <div className="">IMS</div>
                </a>
                <h1 className="text-2xl font-bold">Forgot password</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your email to change your password.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Send</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-black relative hidden md:block">
            <img
              src="/ims.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ForgotPasswordForm.displayName = "ForgotPasswordForm";
