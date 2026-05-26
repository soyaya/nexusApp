import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  EmailLogin,
  EmailSignup,
  OtpVerify,
  RoleSelection,
  EmailVerificationSuccess,
} from "@/features/auth/components";
import {
  ProfessionalProfile,
  PayoutSetup,
} from "@/features/onboarding/components";
import { WaitlistFlowPage } from "@/features/waitlist/components/WaitlistFlowPage";
import { WaitlistLandingStep } from "@/features/waitlist/components/WaitlistLandingStep";
import { WaitlistSuccessStep } from "@/features/waitlist/components/WaitlistSuccessStep";
import { PATHS } from "./paths";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "signup", element: <EmailSignup /> },
      { path: "login", element: <EmailLogin /> },
      { path: "verify-otp", element: <OtpVerify /> },
      { path: "verification-success", element: <EmailVerificationSuccess /> },
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
  {
    path: "/",
    element: (
      <Navigate to={PATHS.medicalStaff.onboarding.registration} replace />
    ),
  },
  {
    path: "/waitlist",
    element: <WaitlistFlowPage />,
    children: [
      { index: true, element: <Navigate to="landing" replace /> },
      { path: "landing", element: <WaitlistLandingStep /> },
      { path: "join", element: <Navigate to="/waitlist/landing" replace /> },
      {
        path: "form/hospital",
        element: <Navigate to="/waitlist/landing" replace />,
      },
      {
        path: "form/health-worker",
        element: <Navigate to="/waitlist/landing" replace />,
      },
      { path: "success", element: <WaitlistSuccessStep /> },
      { path: "*", element: <Navigate to="landing" replace /> },
    ],
  },
];
