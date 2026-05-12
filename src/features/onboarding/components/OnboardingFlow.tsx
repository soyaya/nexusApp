import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FolderUp,
  Lock,
  Shield,
  Upload,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";

type OnboardingRoute = {
  label: string;
  path: string;
};

const onboardingRoutes: OnboardingRoute[] = [
  { label: "Hospital Registration", path: "registration" },
  { label: "Legal Verification", path: "legal-verification" },
  { label: "Onboarding Status", path: "onboarding-status" },
  { label: "Verification Pending", path: "verification-pending" },
  { label: "Accreditation Granted", path: "accreditation-granted" },
];

function useRoleBasePath() {
  const location = useLocation();
  const [baseSegment] = location.pathname.split("/").filter(Boolean);
  return baseSegment ? `/${baseSegment}` : "/hospital";
}

function OnboardingShell({
  title,
  subtitle,
  children,
  currentPath,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  currentPath: string;
}) {
  const stepIndex = onboardingRoutes.findIndex(
    (item) => item.path === currentPath,
  );

  return (
    <div className="min-h-screen bg-primary-50/30">
      <header className="border-b border-secondary-100 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nexus-care-logo.png"
              alt="Nexus Care Logo"
              className="h-9 w-9"
            />
            <span className="text-2xl font-semibold text-primary-800">
              NEXUSCARE
            </span>
          </div>
          <div className="text-sm text-neutral-600">Onboarding Status</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold text-neutral-900">{title}</h1>
          <p className="max-w-3xl text-neutral-600">{subtitle}</p>
        </div>

        <div className="mb-10">
          <div className="grid grid-cols-1 gap-3 text-xs font-semibold text-neutral-500 sm:grid-cols-5">
            {onboardingRoutes.map((step, index) => {
              const isActive = index <= stepIndex;

              return (
                <div key={step.path} className="space-y-2">
                  <div className="h-1.5 rounded-full bg-primary-100">
                    <div
                      className={`h-1.5 rounded-full ${isActive ? "bg-primary-600" : "bg-transparent"}`}
                    />
                  </div>
                  <p
                    className={
                      isActive ? "text-primary-700" : "text-neutral-400"
                    }
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

export function HospitalRegistrationStep() {
  const navigate = useNavigate();
  const basePath = useRoleBasePath();

  return (
    <OnboardingShell
      currentPath="registration"
      title="Hospital Registration"
      subtitle="Please verify and complete your institutional credentials to continue with staffing excellence."
    >
      <Card className="mx-auto max-w-3xl border-primary-100 shadow-soft">
        <CardContent className="space-y-6 p-8">
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Hospital Name
              </label>
              <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3 font-medium text-neutral-900">
                Lagos University Teaching Hospital
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Registration Number
              </label>
              <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                RC-1234567
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Email
              </label>
              <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                admin@luth.gov.ng
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Address
              </label>
              <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                Idi-Araba, Surulere, Lagos
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Phone Number
              </label>
              <div className="rounded-lg border border-primary-100 bg-primary-50 px-4 py-3">
                +234 123 456 7890
              </div>
            </div>
          </div>

          <div className="pt-3">
            <Button
              onClick={() =>
                navigate(`${basePath}/onboarding/legal-verification`)
              }
              className="w-full bg-gradient-to-r from-secondary-600 to-primary-700"
            >
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </OnboardingShell>
  );
}

export function LegalVerificationStep() {
  const navigate = useNavigate();
  const basePath = useRoleBasePath();

  return (
    <OnboardingShell
      currentPath="legal-verification"
      title="Legal Verification"
      subtitle="Please provide high-resolution copies of your institution's operational credentials for accreditation review."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-primary-100 lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  Operational License
                </h2>
                <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-semibold text-secondary-800">
                  Required
                </span>
              </div>
              <p className="text-sm text-neutral-600">
                Valid hospital registration from the Ministry of Health
              </p>
            </div>

            <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50 p-8 text-center">
              <Upload className="mx-auto mb-3 h-8 w-8 text-primary-700" />
              <p className="font-semibold text-primary-700">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-neutral-600">
                PDF, PNG, JPG up to 10MB
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Registration Number
                </label>
                <div className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-2">
                  HOSP-4829-X
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Expiry Date
                </label>
                <div className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-2">
                  mm/dd/yyyy
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Issuing Authority
                </label>
                <div className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-2">
                  Ministry of Health
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => navigate(`${basePath}/onboarding/registration`)}
                className="text-sm font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Back to Identity
              </button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`${basePath}/onboarding/onboarding-status`)
                  }
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() =>
                    navigate(`${basePath}/onboarding/onboarding-status`)
                  }
                >
                  Submit for Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-secondary-700 text-white">
          <CardContent className="space-y-4 p-6">
            <Shield className="h-8 w-8" />
            <h3 className="text-2xl font-semibold">Compliance Check</h3>
            <p className="text-sm text-secondary-50">
              Our legal team reviews all submitted documents in 24-48 business
              hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </OnboardingShell>
  );
}

export function OnboardingStatusStep() {
  const navigate = useNavigate();
  const basePath = useRoleBasePath();

  return (
    <OnboardingShell
      currentPath="onboarding-status"
      title="Onboarding Status"
      subtitle="Your institutional profile and credentials are now in formal review."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-primary-100 lg:col-span-2">
          <CardContent className="space-y-6 p-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-warning-100">
              <Clock3 className="h-8 w-8 text-warning-700" />
            </div>
            <h2 className="text-5xl font-bold text-neutral-900">
              Verification Pending
            </h2>
            <p className="max-w-2xl text-lg text-neutral-600">
              Excellent work. Your professional documents have been uploaded and
              are now under administrative review.
            </p>
            <div className="rounded-xl bg-primary-50 px-5 py-4 text-primary-800">
              <span className="font-semibold">24-48 Hours</span> estimated time
              for final verification.
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  navigate(`${basePath}/onboarding/verification-pending`)
                }
              >
                Explore Dashboard
              </Button>
              <Button variant="outline">View Submitted Docs</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-primary-100 bg-primary-50">
            <CardContent className="space-y-2 p-5">
              <h3 className="text-xl font-semibold text-neutral-900">
                Need Assistance?
              </h3>
              <p className="text-sm text-neutral-600">
                support@luthstaffing.gov.ng
              </p>
              <p className="text-sm text-neutral-600">+234 (0) 1 234 5678</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary-900 to-secondary-700 text-white">
            <CardContent className="space-y-3 p-5">
              <h3 className="text-2xl font-semibold">Institutional Quality</h3>
              <p className="text-sm text-primary-50">
                Ensuring the highest standards for medical staff.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </OnboardingShell>
  );
}

export function VerificationPendingStep() {
  const basePath = useRoleBasePath();

  return (
    <div className="min-h-screen bg-primary-50/40">
      <header className="border-b border-primary-100 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/nexus-care-logo.png"
              alt="Nexus Care Logo"
              className="h-9 w-9"
            />
            <span className="text-2xl font-semibold text-primary-800">
              NEXUSCARE
            </span>
          </div>
          <span className="text-sm text-neutral-500">?</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <Card className="border-primary-100">
          <CardContent className="space-y-7 p-10 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100">
              <Clock3 className="h-9 w-9 text-primary-700" />
            </div>
            <h1 className="text-5xl font-bold text-neutral-900">
              Verification Pending
            </h1>
            <p className="text-2xl text-secondary-700">
              Your hospital is under review
            </p>
            <p className="mx-auto max-w-2xl text-neutral-600">
              We'll verify your credentials within 24-48 hours and notify you
              once your institutional profile is activated.
            </p>
            <Link
              to={`${basePath}/onboarding/accreditation-granted`}
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-primary-700 to-secondary-600 px-8">
                Go to Dashboard
              </Button>
            </Link>
            <button className="block w-full text-center font-semibold text-primary-700">
              View Verification Status Details
            </button>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="border-primary-100 bg-primary-50">
            <CardContent className="flex items-start gap-3 p-5">
              <FileCheck2 className="h-5 w-5 text-primary-700" />
              <div>
                <p className="font-semibold text-neutral-900">Read-Only Mode</p>
                <p className="text-sm text-neutral-600">
                  You can browse tools while verification is pending.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary-100 bg-primary-50">
            <CardContent className="flex items-start gap-3 p-5">
              <Lock className="h-5 w-5 text-primary-700" />
              <div>
                <p className="font-semibold text-neutral-900">
                  Action Restricted
                </p>
                <p className="text-sm text-neutral-600">
                  New shifts and contract approvals are disabled until verified.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export function AccreditationGrantedStep() {
  const basePath = useRoleBasePath();

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto flex max-w-[1300px] gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-64 rounded-2xl border border-primary-100 bg-white p-4 lg:block">
          <div className="mb-5 flex items-center gap-3 px-2">
            <img
              src="/nexus-care-logo.png"
              alt="Nexus Care Logo"
              className="h-8 w-8"
            />
            <span className="text-2xl font-semibold text-primary-800">
              NEXUSCARE
            </span>
          </div>
          <ul className="space-y-2 text-sm font-medium text-neutral-700">
            <li className="rounded-lg bg-primary-50 px-3 py-2 text-primary-700">
              Clinical Dashboard
            </li>
            <li className="rounded-lg px-3 py-2 hover:bg-neutral-100">
              Shift Schedule
            </li>
            <li className="rounded-lg px-3 py-2 hover:bg-neutral-100">
              Staff Rosters
            </li>
            <li className="rounded-lg px-3 py-2 hover:bg-neutral-100">
              Secure Messaging
            </li>
            <li className="rounded-lg px-3 py-2 hover:bg-neutral-100">
              Settings
            </li>
          </ul>
          <Button className="mt-8 w-full bg-gradient-to-r from-primary-700 to-secondary-600">
            Quick Schedule
          </Button>
        </aside>

        <main className="flex-1">
          <Card className="border-primary-100">
            <CardContent className="space-y-7 p-8 text-center lg:p-10">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-xl bg-secondary-100">
                <BadgeCheck className="h-9 w-9 text-primary-700" />
              </div>
              <h1 className="text-5xl font-bold text-neutral-900">
                Accreditation Granted
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-neutral-700">
                Lagos University Teaching Hospital is now a verified institution
                on the NexusCare platform.
              </p>

              <div className="grid gap-3 text-left sm:grid-cols-2">
                {[
                  "Unlimited Shift Broadcasting",
                  "Direct Clinician Outreach",
                  "Verified Payroll Integration",
                  "Performance Analytics",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-primary-100 bg-primary-50 p-4"
                  >
                    <div className="mb-1 flex items-center gap-2 font-semibold text-neutral-900">
                      <CheckCircle2 className="h-4 w-4 text-secondary-700" />
                      {item}
                    </div>
                    <p className="text-sm text-neutral-600">
                      Feature now available for your institution.
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link to={`${basePath}/dashboard`}>
                  <Button className="bg-gradient-to-r from-primary-700 to-secondary-600 px-8">
                    Go to Dashboard
                  </Button>
                </Link>
                <Button variant="ghost">View Credentials Profile</Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-5 flex flex-wrap gap-3 rounded-xl border border-primary-100 bg-white px-4 py-3 text-sm text-neutral-600">
            <div className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-secondary-700" />
              256-bit Institutional Encryption Active
            </div>
            <div className="inline-flex items-center gap-2">
              <FolderUp className="h-4 w-4 text-secondary-700" />
              Trusted by 12,000+ healthcare professionals
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
