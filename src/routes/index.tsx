import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { RoleLayout } from "@/layouts/RoleLayout";
import type { AppProfile } from "@/types";
import { DEFAULT_REDIRECT } from "./paths";
import { buildOnboardingRoutes } from "./roles/onboarding.routes";
import { hospitalPageRoutes } from "./roles/hospital.routes";
import { medicalStaffPageRoutes } from "./roles/medical-staff.routes";
import { patientPageRoutes } from "./roles/patient.routes";

function buildRoleTree(
  basePath: string,
  profile: AppProfile,
  pageRoutes: RouteObject[],
): RouteObject {
  return {
    path: `${basePath}/*`,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },

      ...buildOnboardingRoutes(profile),

      {
        element: <RoleLayout profile={profile} />,
        children: pageRoutes,
      },

      { path: "*", element: <Navigate to="dashboard" replace /> },
    ],
  };
}

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to={DEFAULT_REDIRECT} replace /> },

  buildRoleTree("/hospital", "hospital", hospitalPageRoutes),
  buildRoleTree("/medical-staff", "medical-staff", medicalStaffPageRoutes),
  buildRoleTree("/patient", "patient", patientPageRoutes),

  { path: "*", element: <Navigate to={DEFAULT_REDIRECT} replace /> },
];
