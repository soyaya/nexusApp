import type { RouteObject } from "react-router-dom";
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";

export const patientPageRoutes: RouteObject[] = [
  { path: "dashboard", element: <DashboardOverview /> },
  { path: "appointments", element: <div>Appointments — Coming Soon</div> },
  { path: "doctors", element: <div>Doctors — Coming Soon</div> },
  { path: "messages", element: <div>Messages — Coming Soon</div> },
  { path: "settings", element: <div>Settings — Coming Soon</div> },
  { path: "help", element: <div>Help — Coming Soon</div> },
];
