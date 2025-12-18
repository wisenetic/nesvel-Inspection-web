"use client";

import { useMemo, useState } from "react";

import { useLink, useNotification, useRefineOptions } from "@refinedev/core";
import { GalleryVerticalEnd } from "lucide-react";

import { AuthLayout } from "@/core/layout";

import { Button } from "@/core/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/core/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/core/components/ui/input-otp";

export const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const Link = useLink();
  const { open } = useNotification();
  const { title } = useRefineOptions();

  const resetLink = useMemo(() => {
    const params = new URLSearchParams();
    params.set("token", "demo-token");
    return `/reset-password?${params.toString()}`;
  }, []);

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      open?.({
        type: "error",
        message: "Invalid code",
        description: "Please enter the 6-digit code.",
      });
      return;
    }

    setVerified(true);
    open?.({
      type: "success",
      message: "Code verified",
      description: "You can now reset your password.",
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleVerify} className="p-6 md:p-8">
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  {title.icon ?? <GalleryVerticalEnd className="size-4" />}
                </div>
                <div className="">IMS</div>
              </a>
              <h1 className="text-2xl font-bold">Verify code</h1>
              <p className="text-muted-foreground text-balance">
                Enter the 6-digit code sent to your email.
              </p>
            </div>

            <Field className="items-center">
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>

              <div className="flex justify-center">
                <InputOTP
                  id="otp"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={setOtp}
                  containerClassName="gap-4"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>

            <Field className="items-center">
              <Button type="submit">Verify</Button>

              <FieldDescription className="text-center">
                Didn&apos;t receive the code?{" "}
                <Link to="/forgot-password" className="underline underline-offset-4">
                  Resend
                </Link>
              </FieldDescription>
            </Field>

            {verified && (
              <Field className="items-center">
                <Link
                  to={resetLink}
                  className="text-sm font-medium underline underline-offset-4"
                >
                  Continue to reset password
                </Link>
              </Field>
            )}

            <Field className="items-center">
              <Link
                to="/signin"
                className="text-muted-foreground text-sm underline underline-offset-4"
              >
                Back to sign in
              </Link>
            </Field>
          </FieldGroup>
      </form>
    </AuthLayout>
  );
};
