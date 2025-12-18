"use client";

import { useState } from "react";

import {
  useLink,
  useNotification,
  useRefineOptions,
  useRegister,
} from "@refinedev/core";
import { GalleryVerticalEnd } from "lucide-react";

import { AuthCardLayout, AuthPageLayout } from "@/core/layout";

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

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { open } = useNotification();
  const Link = useLink();
  const { title } = useRefineOptions();
  const { mutate: register } = useRegister();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      open?.({
        type: "error",
        message: "Passwords don't match",
        description: "Please make sure both password fields contain the same value.",
      });

      return;
    }

    register({
      email,
      password,
    });
  };

  return (
    <AuthPageLayout>
      <AuthCardLayout
        below={
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </FieldDescription>
        }
      >
        <form className="p-6 md:p-8" onSubmit={handleSignUp}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  {title.icon ?? <GalleryVerticalEnd className="size-4" />}
                </div>
                <div className="">IMS</div>
              </a>
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Enter your email below to create your account
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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
            </Field>

            <Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputPassword
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                  <InputPassword
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Field>
              </Field>
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>

            <Field>
              <Button type="submit">Create Account</Button>
            </Field>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"></FieldSeparator>

            <FieldDescription className="text-center">
              Already have an account? <Link to="/signin">Sign in</Link>
            </FieldDescription>
          </FieldGroup>
        </form>
      </AuthCardLayout>
    </AuthPageLayout>
  );
};
