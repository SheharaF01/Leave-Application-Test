import { NavLink } from "react-router";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  CheckSquare,
  CalendarDays,
  LogOut,
  Briefcase,
  Package,
} from "lucide-react";
import { currentUser } from "../../data/mockData";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/apply", icon: FilePlus, label: "Apply Leave" },
  { to: "/my-applications", icon: FileText, label: "My Applications" },
  { to: "/approvals", icon: CheckSquare, label: "Approvals" },
  { to: "/calendar", icon: CalendarDays, label: "Team Calendar" },
  { to: "/components", icon: Package, label: "Components" },
];

export function Sidebar() {
  return (
    <aside
      className="flex flex-col w-64 shrink-0 h-full border-r border-border bg-background"
      style={{ minHeight: "100vh" }}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-md"
          style={{ background: "var(--primary)" }}
        >
          <Briefcase size={18} color="var(--primary-foreground)" />
        </div>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "var(--font-weight-bold)",
            fontSize: "var(--text-base)",
            color: "var(--foreground)",
            letterSpacing: "0.02em",
          }}
        >
          LeaveFlow
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? "text-primary-foreground"
                  : "text-card-foreground hover:bg-secondary"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: "var(--primary)" }
                : {}
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  color={isActive ? "var(--primary-foreground)" : "var(--secondary-foreground)"}
                />
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--text-xs)",
            }}
          >
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="truncate"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                lineHeight: 1.3,
              }}
            >
              {currentUser.name}
            </p>
            <p
              className="truncate"
              style={{
                fontFamily: "'Baskervville', serif",
                fontSize: "var(--text-xs)",
                color: "var(--secondary-foreground)",
                lineHeight: 1.3,
              }}
            >
              {currentUser.role}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="p-1.5 h-auto w-auto"
            title="Sign out"
          >
            <LogOut size={15} color="var(--secondary-foreground)" />
          </Button>
        </div>
      </div>
    </aside>
  );
}