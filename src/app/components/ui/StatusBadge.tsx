import type { LeaveStatus } from "../../data/mockData";

const statusConfig: Record<
  LeaveStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  Pending: {
    bg: "rgba(245, 158, 11, 0.12)",
    text: "rgba(180, 110, 0, 1)",
    dot: "var(--chart-4)",
    label: "Pending",
  },
  Approved: {
    bg: "rgba(34, 197, 94, 0.12)",
    text: "rgba(22, 130, 62, 1)",
    dot: "var(--chart-3)",
    label: "Approved",
  },
  Rejected: {
    bg: "rgba(235, 26, 82, 0.10)",
    text: "rgba(180, 15, 60, 1)",
    dot: "var(--primary)",
    label: "Rejected",
  },
  Cancelled: {
    bg: "rgba(203, 213, 219, 0.4)",
    text: "var(--secondary-foreground)",
    dot: "var(--muted)",
    label: "Cancelled",
  },
};

interface StatusBadgeProps {
  status: LeaveStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: cfg.dot }}
      />
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
        {cfg.label}
      </span>
    </span>
  );
}
