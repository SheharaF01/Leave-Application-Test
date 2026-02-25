import { useNavigate } from "react-router";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { LeaveTypeBadge } from "../components/ui/LeaveTypeBadge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  leaveBalances,
  leaveApplications,
  currentUser,
} from "../data/mockData";
import { ArrowRight, TrendingUp, Clock, CheckCircle, XCircle, FilePlus } from "lucide-react";

function BalanceCard({
  type,
  total,
  used,
  remaining,
  color,
}: {
  type: string;
  total: number;
  used: number;
  remaining: number;
  color: string;
}) {
  const pct = Math.round((used / total) * 100);
  return (
    <Card className="p-5 bg-white">
      <div className="flex items-start justify-between">
        <span
          style={{
            fontFamily: "'Source Code Pro', monospace",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-medium)",
            textTransform: "uppercase",
            color: "var(--secondary-foreground)",
            letterSpacing: "0.05em",
          }}
        >
          {type}
        </span>
        <span
          className="px-2 py-0.5 rounded-full"
          style={{
            background: `${color}18`,
            fontFamily: "'Source Code Pro', monospace",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--font-weight-medium)",
            color,
            textTransform: "uppercase" as const,
            letterSpacing: "0.04em",
          }}
        >
          {remaining} left
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-end gap-1.5">
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "var(--text-2xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--foreground)",
              lineHeight: 1,
            }}
          >
            {remaining}
          </span>
          <span
            style={{
              fontFamily: "'Baskervville', serif",
              fontSize: "var(--text-sm)",
              color: "var(--secondary-foreground)",
              marginBottom: "2px",
            }}
          >
            / {total} days
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <Progress 
          value={pct} 
          className="h-1.5 bg-border"
          style={{
            // @ts-ignore
            '--progress-indicator-color': color,
          }}
        />
        <p
          className="mt-1.5"
          style={{
            fontFamily: "'Baskervville', serif",
            fontSize: "var(--text-xs)",
            color: "var(--secondary-foreground)",
          }}
        >
          {used} days used
        </p>
      </div>
    </Card>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconColor,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <Card className="p-4 bg-white flex-row items-center gap-4">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-md shrink-0"
        style={{ background: `${iconColor}15` }}
      >
        <Icon size={19} color={iconColor} />
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "var(--text-xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground)",
            lineHeight: 1.1,
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontFamily: "'Baskervville', serif",
            fontSize: "var(--text-xs)",
            color: "var(--secondary-foreground)",
            marginTop: "2px",
          }}
        >
          {label}
        </p>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = {
    pending: leaveApplications.filter((a) => a.status === "Pending").length,
    approved: leaveApplications.filter((a) => a.status === "Approved").length,
    rejected: leaveApplications.filter((a) => a.status === "Rejected").length,
    total: leaveApplications.length,
  };

  const recent = leaveApplications.slice(0, 4);

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${currentUser.name.split(" ")[0]}. Here's your leave overview.`}
      />

      <div className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Quick Apply Banner */}
        <Card
          className="px-6 py-5 flex-row items-center justify-between border-0"
          style={{
            background: "linear-gradient(135deg, var(--primary) 0%, rgba(235,26,82,0.80) 100%)",
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "var(--text-lg)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--primary-foreground)",
                lineHeight: 1.2,
              }}
            >
              Planning time off?
            </h4>
            <p
              style={{
                fontFamily: "'Baskervville', serif",
                fontSize: "var(--text-sm)",
                color: "rgba(255,255,255,0.8)",
                marginTop: "4px",
              }}
            >
              Submit a leave request and track it in real time.
            </p>
          </div>
          <Button
            onClick={() => navigate("/apply")}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2"
            style={{
              fontFamily: "'Source Code Pro', monospace",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <FilePlus size={16} />
            Apply Now
          </Button>
        </Card>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Applications" value={stats.total} icon={TrendingUp} iconColor="var(--accent)" />
          <StatCard label="Pending Review" value={stats.pending} icon={Clock} iconColor="var(--chart-4)" />
          <StatCard label="Approved" value={stats.approved} icon={CheckCircle} iconColor="var(--chart-3)" />
          <StatCard label="Rejected" value={stats.rejected} icon={XCircle} iconColor="var(--primary)" />
        </div>

        {/* Leave Balances */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
              }}
            >
              Leave Balances
            </h4>
            <span
              style={{
                fontFamily: "'Baskervville', serif",
                fontSize: "var(--text-xs)",
                color: "var(--secondary-foreground)",
              }}
            >
              2026 Entitlement
            </span>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {leaveBalances.map((b) => (
              <BalanceCard key={b.type} {...b} />
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
              }}
            >
              Recent Applications
            </h4>
            <Button
              variant="ghost"
              onClick={() => navigate("/my-applications")}
              className="flex items-center gap-1 h-auto p-0 hover:bg-transparent hover:opacity-70"
              style={{
                fontFamily: "'Source Code Pro', monospace",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--font-weight-medium)",
                textTransform: "uppercase",
                color: "var(--accent)",
                letterSpacing: "0.04em",
              }}
            >
              View all <ArrowRight size={13} />
            </Button>
          </div>

          <Card className="bg-white overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  {["ID", "Type", "Duration", "Days", "Applied", "Status"].map((h) => (
                    <TableHead
                      key={h}
                      className="h-auto px-5 py-3 bg-secondary"
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: "var(--text-xs)",
                        fontWeight: "var(--font-weight-medium)",
                        textTransform: "uppercase",
                        color: "var(--secondary-foreground)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell
                      className="px-5 py-3.5"
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: "var(--text-sm)",
                        color: "var(--accent)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {app.id}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <LeaveTypeBadge type={app.type} />
                    </TableCell>
                    <TableCell
                      className="px-5 py-3.5"
                      style={{
                        fontFamily: "'Baskervville', serif",
                        fontSize: "var(--text-sm)",
                        color: "var(--card-foreground)",
                      }}
                    >
                      {app.startDate} → {app.endDate}
                    </TableCell>
                    <TableCell
                      className="px-5 py-3.5"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--foreground)",
                      }}
                    >
                      {app.days}d
                    </TableCell>
                    <TableCell
                      className="px-5 py-3.5"
                      style={{
                        fontFamily: "'Baskervville', serif",
                        fontSize: "var(--text-sm)",
                        color: "var(--secondary-foreground)",
                      }}
                    >
                      {app.appliedDate}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <StatusBadge status={app.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}