// src/core/routing/AppRoutes.tsx
import React from "react";
import { Routes, Route, Outlet } from "react-router";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/react-router";

import { AppLayout } from "@/core/layout/layout";
import { ErrorComponent } from "@/core/layout/error-component";

import {
  SignInForm,
  SignUpForm,
  ForgotPasswordForm,
} from "@/core/components/shared/form";

import { bootstrap } from "@/core/bootstrap";
import { ModuleRouteLoader } from "./module-route-loader";
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
              <AppLayout>
                <Outlet />
              </AppLayout>
            </Authenticated>
          }
        >
          {/* Redirect root → first usable resource */}
          <Route index element={<NavigateToResource resource="dashboard" />} />

          {/* Module routes */}
          <ModuleRouteLoader modules={modules} />

          {/* 404 inside authenticated app */}
          <Route path="*" element={<ErrorComponent />} />
        </Route>

        {/* Public Authentication Routes */}
        <Route path="/login" element={<SignInForm />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      </Routes>

      {/* Overlay Controller (Modal/Drawer) */}
      <RouteController modules={modules} />
    </>
  );
};
