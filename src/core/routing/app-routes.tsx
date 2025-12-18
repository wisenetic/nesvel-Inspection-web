// src/core/routing/AppRoutes.tsx
import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router";

import { Authenticated } from "@refinedev/core";

import { AppShell } from "@/app/layout";

import {
  ForgotPasswordPage,
  OtpPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
} from "@/core/pages/auth";
import { bootstrap } from "@/core/bootstrap";
import { renderModuleRoutes } from "./module-route-loader";
import { RouteController } from "./route-controller";

export const AppRoutes: React.FC = () => {
  const modules = bootstrap.modules;

  return (
    <>
      <Routes>
        {/* Authenticated Application Shell */}
        <Route
          element={
            <Authenticated
              key="authenticated"
              fallback={<Navigate to="/signin" replace />}
            >
              <AppShell>
                <Outlet />
              </AppShell>
            </Authenticated>
          }
        >
          {/* Redirect root → first usable resource */}
          {/* <Route index element={<NavigateToResource resource="dashboard" />} /> */}
          {/* Module routes */}
          {renderModuleRoutes(modules)}
        </Route>

        {/* Public Authentication Routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Backwards-compatible aliases */}
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
      </Routes>

      {/* Overlay Controller (Modal/Drawer) */}
      <RouteController modules={modules} />
    </>
  );
};
