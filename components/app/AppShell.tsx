import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <AppHeader />

      <div className="flex">
        <AppSidebar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
