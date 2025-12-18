"use client";

import { useMemo, useState } from "react";

import { useForgotPassword, useLink, useRefineOptions } from "@refinedev/core";
import { ArrowLeft, GalleryVerticalEnd } from "lucide-react";

import { AuthLayout } from "@/core/layout";

import { Button } from "@/core/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [requested, setRequested] = useState(false);

  const Link = useLink();
  const { title } = useRefineOptions();
  const { mutate: forgotPassword } = useForgotPassword();

  const demoResetLink = useMemo(() => {
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    params.set("token", "demo-token");
    return `/reset-password?${params.toString()}`;
  }, [email]);

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    forgotPassword(
      {
        email,
      },
      {
        onSuccess: () => {
          setRequested(true);
        },
      },
    );
  };

  return (
    <AuthLayout rightClassName="bg-black relative hidden md:block">
      <form onSubmit={handleForgotPassword} className="p-6 md:p-8">
          <FieldGroup>
            <div className="flex items-center justify-between">
              <Link
                to="/signin"
                className="text-muted-foreground inline-flex items-center gap-2 text-sm hover:underline"
              >
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  {title.icon ?? <GalleryVerticalEnd className="size-4" />}
                </div>
                <div className="">IMS</div>
              </a>
              <h1 className="text-2xl font-bold">Forgot password</h1>
              <p className="text-muted-foreground text-balance">
                Enter your email and we&apos;ll send you a reset link.
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

            {requested && (
              <Field>
                <FieldLabel className="sr-only">Next steps</FieldLabel>
                <div className="rounded-md border border-border p-4">
                  <p className="text-muted-foreground text-sm">
                    If an account exists for{" "}
                    <span className="text-foreground font-medium">{email}</span>, we&apos;ve
                    sent a password reset link.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <Link className="text-sm font-medium underline" to="/otp">
                      Enter OTP
                    </Link>
                    <Link className="text-sm font-medium underline" to={demoResetLink}>
                      Open reset page (demo)
                    </Link>
                  </div>
                </div>
              </Field>
            )}

            <FieldDescription className="text-center">
              Remembered your password? <Link to="/signin">Sign in</Link>
            </FieldDescription>
          </FieldGroup>
      </form>
    </AuthLayout>
  );
};
