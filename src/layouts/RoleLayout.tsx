import { Outlet } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import type { AppProfile } from "@/types";

interface RoleLayoutProps {
  profile: AppProfile;
}

/**
 * Layout route wrapper used as the parent element for all role-scoped
 * authenticated pages. Renders the role-specific MainLayout shell and
 * exposes <Outlet /> so React Router can mount the matched child page.
 */
export function RoleLayout({ profile }: RoleLayoutProps) {
  return (
    <MainLayout profile={profile}>
      <Outlet />
    </MainLayout>
  );
}
