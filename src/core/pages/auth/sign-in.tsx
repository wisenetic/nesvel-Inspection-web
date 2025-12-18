"use client";

import { useState } from "react";

import { useLink, useLogin, useRefineOptions } from "@refinedev/core";
import { GalleryVerticalEnd } from "lucide-react";

import { AuthLayout } from "@/core/layout";

import { InputPassword } from "@/core/components/shared/form/input-password";
import { Button } from "@/core/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Link = useLink();
  const { title } = useRefineOptions();
  const { mutate: login } = useLogin();

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <AuthLayout
      rightClassName="bg-black relative hidden md:block"
      below={
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      }
    >
      <form onSubmit={handleSignIn} className="p-6 md:p-8">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
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
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </FieldGroup>
      </form>
    </AuthLayout>
  );
};
