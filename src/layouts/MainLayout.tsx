import { ReactNode, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopNavigation } from "./components/TopNavigation";
import { AppProfile } from "@/types";

interface MainLayoutProps {
  children: ReactNode;
  profile: AppProfile;
}

const profileLayoutStyles: Record<
  AppProfile,
  { shell: string; content: string }
> = {
  hospital: {
    shell: "bg-secondary-50/40",
    content:
      "mx-auto max-w-7xl rounded-2xl border border-secondary-100 bg-white/90 p-4 lg:p-6",
  },
  patient: {
    shell: "bg-success-50/40",
    content:
      "mx-auto max-w-6xl rounded-2xl border border-success-100 bg-white p-4 lg:p-6",
  },
  "medical-staff": {
    shell: "bg-warning-50/50",
    content:
      "mx-auto max-w-7xl rounded-2xl border border-warning-100 bg-white p-4 lg:p-6",
  },
};

export function MainLayout({ children, profile }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const layoutStyles = profileLayoutStyles[profile];

  return (
    <div className={`flex h-screen ${layoutStyles.shell}`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        profile={profile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden lg:ml-0">
        {/* Top Navigation */}
        <TopNavigation
          profile={profile}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className={layoutStyles.content}>{children}</div>
        </main>
      </div>
    </div>
  );
}
