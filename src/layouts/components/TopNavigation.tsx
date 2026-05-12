import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { AppProfile } from "@/types";

interface TopNavigationProps {
  onMenuClick: () => void;
  profile: AppProfile;
}

const profileContent: Record<
  AppProfile,
  { roleLabel: string; searchPlaceholder: string; accent: string }
> = {
  hospital: {
    roleLabel: "Hospital Operations",
    searchPlaceholder: "Search wards, facilities, patient requests...",
    accent: "text-secondary-700",
  },
  patient: {
    roleLabel: "Patient Portal",
    searchPlaceholder: "Search appointments, prescriptions, support...",
    accent: "text-success-700",
  },
  "medical-staff": {
    roleLabel: "Medical Staff Workspace",
    searchPlaceholder: "Search rounds, patients, case notes...",
    accent: "text-warning-800",
  },
};

export function TopNavigation({ onMenuClick, profile }: TopNavigationProps) {
  const content = profileContent[profile];

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:px-6">
      {/* Left side - Menu button and Search */}
      <div className="flex items-center space-x-4 flex-1">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search Bar */}
        <div className="flex flex-1 items-center max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder={content.searchPlaceholder}
              className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-error-500 text-xs"></span>
        </Button>

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-neutral-900">whiteghost</p>
            <p className={"text-xs " + content.accent}>{content.roleLabel}</p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full p-2">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
