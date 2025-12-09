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
import { renderModuleRoutes } from "./module-route-loader";
import { RouteController } from "./route-controller";

import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "@/pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "@/pages/categories";

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
          {/* <Route index element={<NavigateToResource resource="dashboard" />} /> */}
          <Route index element={<NavigateToResource resource="blog_posts" />} />
          <Route path="/blog-posts">
            <Route index element={<BlogPostList />} />
            <Route path="create" element={<BlogPostCreate />} />
            <Route path="edit/:id" element={<BlogPostEdit />} />
            <Route path="show/:id" element={<BlogPostShow />} />
          </Route>
          <Route path="/categories">
            <Route index element={<CategoryList />} />
            <Route path="create" element={<CategoryCreate />} />
            <Route path="edit/:id" element={<CategoryEdit />} />
            <Route path="show/:id" element={<CategoryShow />} />
          </Route>
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
