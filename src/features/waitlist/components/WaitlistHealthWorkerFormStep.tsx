import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/Button";
import {
  WaitlistSubmissionError,
  submitWaitlistLeadToFirebase,
} from "../services/waitlistFirebaseService";
import { useWaitlistFlow } from "./waitlistFlowContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "loading" | "error";

export function WaitlistHealthWorkerFormStep() {
  const navigate = useNavigate();
  const { state, updateHealthWorkerForm } = useWaitlistFlow();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  const canSubmit = useMemo(() => {
    return (
      state.role === "health-worker" &&
      state.healthWorkerForm.fullName.trim() &&
      state.healthWorkerForm.email.trim() &&
      state.healthWorkerForm.phoneNumber.trim() &&
      state.healthWorkerForm.professionalTitle.trim() &&
      state.healthWorkerForm.licenseNumber.trim()
    );
  }, [state.healthWorkerForm, state.role]);

  if (state.role !== "health-worker") {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-soft">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Select your profile first
          </h1>
          <p className="mt-3 text-sm text-neutral-600">
            Please choose Hospital or Health Worker before continuing.
          </p>
          <Link
            to="/waitlist/join"
            className="mt-6 inline-flex text-sm font-semibold text-onboarding-primaryBlue"
          >
            Go to role selection
          </Link>
        </div>
      </section>
    );
  }

  const handleChange = (
    field: keyof typeof state.healthWorkerForm,
    value: string,
  ) => {
    updateHealthWorkerForm({ [field]: value });

    if (submitState !== "idle") {
      setSubmitState("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = state.healthWorkerForm.email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      setSubmitState("error");
      setFeedback("Enter a valid work email address.");
      return;
    }

    if (!canSubmit) {
      setSubmitState("error");
      setFeedback("Complete all required fields before submitting.");
      return;
    }

    setSubmitState("loading");
    setFeedback("");

    try {
      await submitWaitlistLeadToFirebase({
        role: "health-worker",
        source: "waitlist-health-worker-form",
        fullName: state.healthWorkerForm.fullName.trim(),
        email,
        phoneNumber: state.healthWorkerForm.phoneNumber.trim(),
        professionalTitle: state.healthWorkerForm.professionalTitle.trim(),
        licenseNumber: state.healthWorkerForm.licenseNumber.trim(),
      });

      navigate("/waitlist/success");
    } catch (error) {
      if (
        error instanceof WaitlistSubmissionError &&
        error.code === "duplicate"
      ) {
        setSubmitState("error");
        setFeedback("This email is already on the waitlist.");
        return;
      }

      setSubmitState("error");
      setFeedback("We could not submit your form. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="absolute inset-0">
        <img
          src="/waitlist/hospital-form.jpg"
          alt="Clinician background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(7,40,70,0.52),_rgba(4,34,64,0.82))]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center text-white">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/95 backdrop-blur">
            Redefining Clinical Efficiency
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Secure Your Place in the
            <span className="block text-onboarding-primaryBlue">Future</span>
            of Care.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
            Empowering healthcare facilities with AI-driven documentation and a
            high-fidelity marketplace for elite clinical talent.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/45 bg-[linear-gradient(180deg,_rgba(236,241,246,0.94)_0%,_rgba(169,196,208,0.78)_54%,_rgba(48,100,144,0.68)_100%)] p-6 shadow-strong backdrop-blur-xl sm:p-8">
          <div>
            <h1 className="text-4xl font-semibold text-onboarding-primaryBlue">
              Registration
            </h1>
            <p className="mt-2 text-sm leading-6 text-neutral-700">
              Join the priority access list for the next phase.
            </p>
          </div>

          <form
            className="mt-6 flex flex-col gap-6"
            onSubmit={handleSubmit}
            noValidate
          >
            <label className="space-y-2 text-sm text-neutral-700">
              FULL NAME
              <input
                type="text"
                value={state.healthWorkerForm.fullName}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/55 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(238,245,251,0.88))] px-4 text-neutral-800 outline-none backdrop-blur transition focus:border-onboarding-primaryBlue"
                placeholder="Dr. Jane Doe"
              />
            </label>

            <label className="space-y-2 text-sm text-neutral-700">
              EMAIL
              <input
                type="email"
                value={state.healthWorkerForm.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="h-12 w-full rounded-xl border border-white/55 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(238,245,251,0.88))] px-4 text-neutral-800 outline-none backdrop-blur transition focus:border-onboarding-primaryBlue"
                placeholder="jane@hospital-network.org"
              />
            </label>

            <label className="space-y-2 text-sm text-neutral-700">
              PHONE NUMBER
              <input
                type="tel"
                value={state.healthWorkerForm.phoneNumber}
                onChange={(event) =>
                  handleChange("phoneNumber", event.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/55 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(238,245,251,0.88))] px-4 text-neutral-800 outline-none backdrop-blur transition focus:border-onboarding-primaryBlue"
                placeholder="+234 8000 0000"
              />
            </label>

            <label className="space-y-2 text-sm text-neutral-700">
              PROFESSIONAL TITLE / SPECIALITY
              <input
                type="text"
                value={state.healthWorkerForm.professionalTitle}
                onChange={(event) =>
                  handleChange("professionalTitle", event.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/55 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(238,245,251,0.88))] px-4 text-neutral-800 outline-none backdrop-blur transition focus:border-onboarding-primaryBlue"
                placeholder="Emergency Physician"
              />
            </label>

            <label className="block space-y-2 text-sm text-neutral-700">
              LICENSE NUMBER (MDC/NGR)
              <input
                type="text"
                value={state.healthWorkerForm.licenseNumber}
                onChange={(event) =>
                  handleChange("licenseNumber", event.target.value)
                }
                className="h-12 w-full rounded-xl border border-white/55 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(238,245,251,0.88))] px-4 text-neutral-800 outline-none backdrop-blur transition focus:border-onboarding-primaryBlue"
                placeholder="MDC-12345-6789"
              />
            </label>

            <p
              aria-live="polite"
              className={
                submitState === "error"
                  ? "text-sm text-error-700"
                  : "text-sm text-neutral-700"
              }
            >
              {feedback ||
                "Priority access is reserved for verified healthcare professionals."}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/waitlist/join"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-onboarding-primaryBlue"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>

              <Button
                type="submit"
                isLoading={submitState === "loading"}
                disabled={!canSubmit}
                className="rounded-xl bg-gradient-to-r from-onboarding-primaryGreen to-onboarding-primaryBlue px-7 text-white shadow-medium"
              >
                Join Waitlist
              </Button>
            </div>
          </form>

          <div className="mt-7 border-t border-white/40 pt-5 text-center">
            <p className="text-sm text-neutral-800">
              "NexusCare has transformed how we manage floor staffing during
              peak surges."
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-secondary-700">
              Chief Medical Officer, Metro General
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
