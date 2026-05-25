import { Building2, ChevronRight, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import { waitlistPartners, waitlistSteps } from "../constants/waitlistContent";
import { useWaitlistFlow, type WaitlistRole } from "./waitlistFlowContext";

const roleCards: Array<{
  role: WaitlistRole;
  title: string;
  description: string;
  icon: typeof Building2;
  image: string;
}> = [
  {
    role: "hospital",
    title: "Hospital",
    description:
      "Join as a facility admin to secure verified clinicians and streamline staffing coverage.",
    icon: Building2,
    image: "/waitlist/hospitals.jpg",
  },
  {
    role: "health-worker",
    title: "Health Worker",
    description:
      "Join as a clinician to discover high-priority shifts and get AI-assisted documentation tools.",
    icon: Stethoscope,
    image: "/waitlist/health-workers.jpg",
  },
];

export function WaitlistRoleStep() {
  const navigate = useNavigate();
  const { state, setRole } = useWaitlistFlow();

  const handleContinue = () => {
    if (!state.role) {
      return;
    }

    if (state.role === "hospital") {
      navigate("/waitlist/form/hospital");
      return;
    }

    navigate("/waitlist/form/health-worker");
  };

  return (
    <div className="bg-[#f4f6fa]">
      <section className="px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
            Secure Your Place in the
            <span className="block bg-gradient-to-r from-onboarding-primaryBlue via-secondary-700 to-onboarding-primaryGreen bg-clip-text text-transparent">
              Future of Care.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            Select your role to continue to the right registration form.
          </p>

          <div className="mt-7 flex justify-center">
            <Button
              type="button"
              disabled={!state.role}
              onClick={handleContinue}
              className="rounded-xl bg-gradient-to-r from-onboarding-primaryGreen to-onboarding-primaryBlue px-8 text-white"
            >
              Join As <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
            {roleCards.map((card) => {
              const Icon = card.icon;
              const isSelected = state.role === card.role;

              return (
                <button
                  key={card.role}
                  type="button"
                  onClick={() => setRole(card.role)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border text-left shadow-strong transition-all",
                    isSelected
                      ? "border-onboarding-primaryBlue ring-2 ring-onboarding-primaryBlue/40"
                      : "border-neutral-200 hover:border-secondary-300",
                  )}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-[25rem] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06345c]/90 via-[#06345c]/40 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      {card.role === "hospital"
                        ? "Institutional Excellence"
                        : "Clinician Empowerment"}
                    </p>
                    <h2 className="mt-2 text-4xl font-semibold">
                      {card.title === "Hospital"
                        ? "Hospitals"
                        : "For Health Workers"}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/80">
                      {card.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-onboarding-primaryBlue">
                      <Icon className="h-4 w-4" />
                      {isSelected ? "Selected" : "Select"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-[#eef0f5] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 sm:text-sm">
          <span className="text-secondary-700">Partnered with</span>
          {waitlistPartners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-onboarding-primaryGreen">
              Precision Workflow
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 sm:text-base">
              A seamless 3-step transition from registration to your first
              clinical payout.
            </p>
          </div>

          <div className="mt-12 grid gap-6 border-t border-neutral-200 pt-8 md:grid-cols-3">
            {waitlistSteps.map((step) => (
              <article key={step.id} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-onboarding-primaryBlue to-onboarding-primaryGreen text-sm font-semibold text-white">
                  {step.id}
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-10 text-center">
        <Link
          to="/waitlist/landing"
          className="text-sm font-semibold text-neutral-700 transition-colors hover:text-onboarding-primaryBlue"
        >
          Back to landing
        </Link>
      </div>
    </div>
  );
}
