import type { RouteObject } from "react-router-dom";
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";

export const hospitalPageRoutes: RouteObject[] = [
  { path: "dashboard", element: <DashboardOverview /> },
  { path: "patients", element: <div>Patients — Coming Soon</div> },
  { path: "doctors", element: <div>Doctors — Coming Soon</div> },
  { path: "appointments", element: <div>Appointments — Coming Soon</div> },
  { path: "analytics", element: <div>Analytics — Coming Soon</div> },
  { path: "settings", element: <div>Settings — Coming Soon</div> },
  { path: "help", element: <div>Help — Coming Soon</div> },
];
