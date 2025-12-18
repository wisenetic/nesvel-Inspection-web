"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import {
  useLink,
  useNotification,
  useRefineOptions,
  useUpdatePassword,
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
} from "@/core/components/ui/field";

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [done, setDone] = useState(false);

  const Link = useLink();
  const { open } = useNotification();
  const { title } = useRefineOptions();
  const { mutate: updatePassword } = useUpdatePassword();

  const canSubmit = useMemo(
    () => password.length > 0 && confirmPassword.length > 0,
    [password, confirmPassword],
  );

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      open?.({
        type: "error",
        message: "Missing token",
        description: "The reset token is missing. Please use the link from your email.",
      });
      return;
    }

    if (password !== confirmPassword) {
      open?.({
        type: "error",
        message: "Passwords don't match",
        description: "Please make sure both password fields match.",
      });
      return;
    }

    updatePassword(
      { password, confirmPassword, token },
      {
        onSuccess: () => {
          setDone(true);
          open?.({
            type: "success",
            message: "Password updated",
            description: "You can now sign in with your new password.",
          });
        },
      },
    );
  };

  return (
    <AuthPageLayout>
      <AuthCardLayout>
        <form onSubmit={handleResetPassword} className="p-6 md:p-8">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  {title.icon ?? <GalleryVerticalEnd className="size-4" />}
                </div>
                <div className="">IMS</div>
              </a>
              <h1 className="text-2xl font-bold">Reset password</h1>
              <p className="text-muted-foreground text-balance">
                Choose a new password for your account.
              </p>
            </div>

            <Field>
              <FieldLabel htmlFor="password">New password</FieldLabel>
              <InputPassword
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
              <InputPassword
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>

            <Field>
              <Button type="submit" disabled={!canSubmit}>
                Update password
              </Button>
            </Field>

            {done && (
              <Field className="items-center">
                <Link
                  to="/signin"
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Back to sign in
                </Link>
              </Field>
            )}
          </FieldGroup>
        </form>
      </AuthCardLayout>
    </AuthPageLayout>
  );
};
