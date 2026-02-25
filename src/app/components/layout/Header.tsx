import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-8 py-5 border-b border-border bg-background shrink-0"
    >
      <div>
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "var(--text-xl)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        {subtitle && (
          <p
            style={{
              fontFamily: "'Baskervville', serif",
              fontSize: "var(--text-sm)",
              color: "var(--secondary-foreground)",
              marginTop: "2px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-border"
          style={{ background: "var(--input-background)", minWidth: 200 }}
        >
          <Search size={15} color="var(--secondary-foreground)" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none border-none flex-1"
            style={{
              fontFamily: "'Baskervville', serif",
              fontSize: "var(--text-sm)",
              color: "var(--foreground)",
            }}
          />
        </div>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-md border border-border hover:bg-secondary transition-colors"
          style={{ background: "var(--input-background)" }}
        >
          <Bell size={17} color="var(--secondary-foreground)" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </button>
      </div>
    </header>
  );
}
