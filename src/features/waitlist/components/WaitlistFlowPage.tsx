import { Navigate } from "react-router-dom";
import { WaitlistFlowProvider } from "./waitlistFlowContext";
import { WaitlistFlowShell } from "./WaitlistFlowShell";

export function WaitlistFlowPage() {
  return (
    <WaitlistFlowProvider>
      <WaitlistFlowShell />
    </WaitlistFlowProvider>
  );
}

export function WaitlistFlowRedirect() {
  return <Navigate to="/waitlist/landing" replace />;
}
