// src/core/routing/AppRoutes.tsx
import React from "react";
import { Routes, Route, Outlet } from "react-router";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";

import { ErrorComponent } from "@/core/layout/error-component";
import { AppShell } from "@/app/layout";

import {
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
} from "@/core/components/shared/form";

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
            <Authenticated fallback={<NavigateToResource to="/login" />}>
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

        {/* Public Authentication Routes <Login /> <Register /> <ForgotPassword />*/}
        <Route path="/login" element={<SignInForm />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      </Routes>

      {/* Overlay Controller (Modal/Drawer) */}
      <RouteController modules={modules} />
    </>
  );
};
