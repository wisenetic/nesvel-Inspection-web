"use client";

import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { useLink, useLogin, useRefineOptions } from "@refinedev/core";

import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";

import { cn } from "@/core/lib/utils";
import { InputPassword } from "@/core/components/shared/form/input-password";

export const SignInForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Link = useLink();

  const { title } = useRefineOptions();

  const { mutate: login } = useLogin();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSignIn} className="p-6 md:p-8">
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
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Enter your email below to login to your account
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
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <InputPassword
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit">Login</Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
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
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </>
  );
};

SignInForm.displayName = "SignInForm";
