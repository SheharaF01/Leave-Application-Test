import type { LeaveType } from "../../data/mockData";

const typeConfig: Record<LeaveType, { bg: string; text: string }> = {
  "Annual Leave": {
    bg: "rgba(20, 101, 245, 0.10)",
    text: "rgba(20, 101, 245, 1)",
  },
  "Sick Leave": {
    bg: "rgba(34, 197, 94, 0.10)",
    text: "rgba(22, 130, 62, 1)",
  },
  "Emergency Leave": {
    bg: "rgba(245, 158, 11, 0.10)",
    text: "rgba(180, 110, 0, 1)",
  },
  "Maternity / Paternity": {
    bg: "rgba(168, 85, 247, 0.10)",
    text: "rgba(130, 50, 210, 1)",
  },
  "Unpaid Leave": {
    bg: "rgba(203, 213, 219, 0.5)",
    text: "var(--secondary-foreground)",
  },
};

interface LeaveTypeBadgeProps {
  type: LeaveType;
}

export function LeaveTypeBadge({ type }: LeaveTypeBadgeProps) {
  const cfg = typeConfig[type];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg }}
    >
      <span
        style={{
          fontFamily: "'Source Code Pro', monospace",
          fontSize: "var(--text-xs)",
          fontWeight: "var(--font-weight-medium)",
          textTransform: "uppercase",
          color: cfg.text,
          letterSpacing: "0.04em",
        }}
      >
        {type}
      </span>
    </span>
  );
}
