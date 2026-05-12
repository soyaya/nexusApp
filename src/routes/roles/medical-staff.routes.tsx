import type { RouteObject } from "react-router-dom";
import { DashboardOverview } from "@/features/dashboard/components/DashboardOverview";
import { PatientList } from "@/features/patients/components/PatientList";
import { DoctorList } from "@/features/doctors/components/DoctorList";
import { AppointmentList } from "@/features/appointments/components/AppointmentList";

export const medicalStaffPageRoutes: RouteObject[] = [
  { path: "dashboard", element: <DashboardOverview /> },
  { path: "appointments", element: <AppointmentList /> },
  { path: "patients", element: <PatientList /> },
  { path: "doctors", element: <DoctorList /> },
  { path: "analytics", element: <div>Analytics — Coming Soon</div> },
  { path: "settings", element: <div>Settings — Coming Soon</div> },
  { path: "help", element: <div>Help — Coming Soon</div> },
];
