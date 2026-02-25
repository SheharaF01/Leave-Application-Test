import { useState } from "react";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { LeaveTypeBadge } from "../components/ui/LeaveTypeBadge";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { pendingApprovals, type LeaveApplication, type LeaveStatus } from "../data/mockData";
import {
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Users,
  CalendarDays,
} from "lucide-react";

export default function ManagerApprovals() {
  const [applications, setApplications] = useState<LeaveApplication[]>(pendingApprovals);
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});
  const [showCommentFor, setShowCommentFor] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  function handleAction(id: string, action: "Approved" | "Rejected") {
    setProcessing(id);
    setTimeout(() => {
      setApplications((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, status: action as LeaveStatus, comments: commentMap[id] || undefined, approvedBy: "Sarah Chen" }
            : a
        )
      );
      setProcessing(null);
      setShowCommentFor(null);
    }, 600);
  }

  const pending = applications.filter((a) => a.status === "Pending");
  const processed = applications.filter((a) => a.status !== "Pending");

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Team Approvals"
        subtitle="Review and action your team's leave requests"
      />

      <div className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Awaiting Action", value: pending.length, icon: Clock, color: "var(--chart-4)" },
            { label: "Approved This Month", value: processed.filter((a) => a.status === "Approved").length, icon: CheckCircle, color: "var(--chart-3)" },
            { label: "Rejected This Month", value: processed.filter((a) => a.status === "Rejected").length, icon: XCircle, color: "var(--primary)" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card
              key={label}
              className="p-4 flex items-center gap-4 bg-white"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-md shrink-0"
                style={{ background: `${color}15` }}
              >
                <Icon size={19} color={color} />
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
          ))}
        </div>

        {/* Pending Approvals */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} color="var(--chart-4)" />
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
              }}
            >
              Pending Review
            </h4>
            {pending.length > 0 && (
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full"
                style={{
                  background: "var(--chart-4)",
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: "10px",
                  fontWeight: "var(--font-weight-bold)",
                  color: "white",
                }}
              >
                {pending.length}
              </span>
            )}
          </div>

          {pending.length === 0 ? (
            <Card className="p-10 flex flex-col items-center gap-3 bg-white">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full"
                style={{ background: "rgba(34, 197, 94, 0.10)" }}
              >
                <CheckCircle size={26} color="var(--chart-3)" />
              </div>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-base)",
                  color: "var(--secondary-foreground)",
                  textAlign: "center",
                }}
              >
                All caught up! No pending approvals.
              </p>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {pending.map((app) => (
                <Card
                  key={app.id}
                  className="overflow-hidden bg-white"
                >
                  <div className="p-5 flex flex-col gap-4">
                    {/* Employee info + meta */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                          style={{
                            background: "var(--primary)",
                            color: "var(--primary-foreground)",
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: "var(--font-weight-bold)",
                            fontSize: "var(--text-xs)",
                          }}
                        >
                          {app.avatar}
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontSize: "var(--text-sm)",
                              fontWeight: "var(--font-weight-medium)",
                              color: "var(--foreground)",
                              lineHeight: 1.2,
                            }}
                          >
                            {app.employeeName}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Baskervville', serif",
                              fontSize: "var(--text-xs)",
                              color: "var(--secondary-foreground)",
                              marginTop: "2px",
                            }}
                          >
                            {app.employeeId} · {app.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <LeaveTypeBadge type={app.type} />
                        <StatusBadge status={app.status} />
                      </div>
                    </div>

                    {/* Details row */}
                    <div className="flex items-center gap-5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays size={14} color="var(--secondary-foreground)" />
                        <span
                          style={{
                            fontFamily: "'Baskervville', serif",
                            fontSize: "var(--text-sm)",
                            color: "var(--card-foreground)",
                          }}
                        >
                          {app.startDate} → {app.endDate}
                        </span>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--secondary)",
                          fontFamily: "'Source Code Pro', monospace",
                          fontSize: "var(--text-xs)",
                          color: "var(--foreground)",
                          fontWeight: "var(--font-weight-medium)",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {app.days} day{app.days !== 1 ? "s" : ""}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Baskervville', serif",
                          fontSize: "var(--text-xs)",
                          color: "var(--secondary-foreground)",
                        }}
                      >
                        Applied: {app.appliedDate}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Baskervville', serif",
                        fontSize: "var(--text-sm)",
                        color: "var(--card-foreground)",
                        lineHeight: 1.6,
                      }}
                    >
                      {app.reason}
                    </p>

                    {/* Comment Input */}
                    {showCommentFor === app.id && (
                      <div className="flex flex-col gap-2">
                        <Label
                          style={{
                            fontFamily: "'Source Code Pro', monospace",
                            fontSize: "var(--text-xs)",
                            textTransform: "uppercase",
                            color: "var(--secondary-foreground)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Comment (optional)
                        </Label>
                        <Textarea
                          rows={2}
                          placeholder="Add a comment for the employee..."
                          value={commentMap[app.id] || ""}
                          onChange={(e) =>
                            setCommentMap((m) => ({ ...m, [app.id]: e.target.value }))
                          }
                          style={{
                            fontFamily: "'Baskervville', serif",
                            fontSize: "var(--text-sm)",
                          }}
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-1 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCommentFor(showCommentFor === app.id ? null : app.id)}
                        className="gap-1.5"
                        style={{
                          fontFamily: "'Source Code Pro', monospace",
                          fontSize: "var(--text-xs)",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        <MessageSquare size={13} />
                        {showCommentFor === app.id ? "Hide Comment" : "Add Comment"}
                      </Button>

                      <div className="flex-1" />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(app.id, "Rejected")}
                        disabled={processing === app.id}
                        className="gap-1.5"
                        style={{
                          borderColor: "var(--primary)",
                          color: "var(--primary)",
                          fontFamily: "'Source Code Pro', monospace",
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-weight-medium)",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        <XCircle size={14} />
                        Reject
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleAction(app.id, "Approved")}
                        disabled={processing === app.id}
                        className="gap-1.5"
                        style={{
                          background: "var(--chart-3)",
                          color: "white",
                          fontFamily: "'Source Code Pro', monospace",
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-weight-medium)",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {processing === app.id ? (
                          <span style={{ opacity: 0.7 }}>Processing…</span>
                        ) : (
                          <>
                            <CheckCircle size={14} />
                            Approve
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recently Processed */}
        {processed.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} color="var(--secondary-foreground)" />
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                }}
              >
                Recently Processed
              </h4>
            </div>
            <Card className="overflow-hidden bg-white p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b">
                    {["Employee", "Type", "Duration", "Days", "Status", "Action By"].map((h) => (
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
                  {processed.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                            style={{
                              background: "var(--secondary)",
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: "var(--font-weight-bold)",
                              fontSize: "10px",
                              color: "var(--foreground)",
                            }}
                          >
                            {app.avatar}
                          </div>
                          <span
                            style={{
                              fontFamily: "'Baskervville', serif",
                              fontSize: "var(--text-sm)",
                              color: "var(--foreground)",
                            }}
                          >
                            {app.employeeName}
                          </span>
                        </div>
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
                          fontFamily: "'Source Code Pro', monospace",
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                        }}
                      >
                        {app.days}d
                      </TableCell>
                      <TableCell className="px-5 py-3.5">
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell
                        className="px-5 py-3.5"
                        style={{
                          fontFamily: "'Baskervville', serif",
                          fontSize: "var(--text-sm)",
                          color: "var(--secondary-foreground)",
                        }}
                      >
                        {app.approvedBy || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}