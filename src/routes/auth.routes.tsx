import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  EmailLogin,
  OtpVerify,
  RoleSelection,
} from "@/features/auth/components";
import {
  ProfessionalProfile,
  PayoutSetup,
} from "@/features/onboarding/components";
import { WaitlistFlowPage } from "@/features/waitlist/components/WaitlistFlowPage";
import { WaitlistLandingStep } from "@/features/waitlist/components/WaitlistLandingStep";
import { WaitlistRoleStep } from "@/features/waitlist/components/WaitlistRoleStep";
import { WaitlistHospitalFormStep } from "@/features/waitlist/components/WaitlistHospitalFormStep";
import { WaitlistHealthWorkerFormStep } from "@/features/waitlist/components/WaitlistHealthWorkerFormStep";
import { WaitlistSuccessStep } from "@/features/waitlist/components/WaitlistSuccessStep";
import { WaitlistPage } from "@/features/waitlist/components/WaitlistPage";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <EmailLogin /> },
      { path: "verify-otp", element: <OtpVerify /> },
      { path: "role-selection", element: <RoleSelection /> },
      {
        path: "onboarding",
        children: [
          {
            index: true,
            element: <Navigate to="professional-profile" replace />,
          },
          { path: "professional-profile", element: <ProfessionalProfile /> },
          { path: "payout-setup", element: <PayoutSetup /> },
          {
            path: "*",
            element: <Navigate to="professional-profile" replace />,
          },
        ],
      },
      { path: "*", element: <Navigate to="login" replace /> },
    ],
  },
  { path: "/", element: <WaitlistPage /> },
  {
    path: "/waitlist",
    element: <WaitlistFlowPage />,
    children: [
      { index: true, element: <Navigate to="landing" replace /> },
      { path: "landing", element: <WaitlistLandingStep /> },
      { path: "join", element: <WaitlistRoleStep /> },
      { path: "form/hospital", element: <WaitlistHospitalFormStep /> },
      {
        path: "form/health-worker",
        element: <WaitlistHealthWorkerFormStep />,
      },
      { path: "success", element: <WaitlistSuccessStep /> },
      { path: "*", element: <Navigate to="landing" replace /> },
    ],
  },
];
