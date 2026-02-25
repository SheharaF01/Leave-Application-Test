import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { LeaveTypeBadge } from "../components/ui/LeaveTypeBadge";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { leaveApplications, type LeaveStatus, type LeaveType } from "../data/mockData";
import {
  FilePlus,
  ChevronDown,
  MessageSquare,
  CalendarDays,
  X,
} from "lucide-react";

type FilterStatus = "All" | LeaveStatus;

const statusFilters: FilterStatus[] = ["All", "Pending", "Approved", "Rejected", "Cancelled"];

export default function MyApplications() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = leaveApplications.filter(
    (a) => statusFilter === "All" || a.status === statusFilter
  );

  const selected = leaveApplications.find((a) => a.id === selectedId);

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="My Applications"
        subtitle="Track and manage your leave requests"
      />

      <div className="flex-1 px-8 py-6 flex flex-col gap-5">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          {/* Status Filter Tabs */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg"
            style={{ background: "var(--secondary)" }}
          >
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className="px-3 py-1.5 rounded-md transition-all"
                style={{
                  background: statusFilter === f ? "white" : "transparent",
                  boxShadow: statusFilter === f ? "var(--elevation-sm)" : "none",
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--font-weight-medium)",
                  textTransform: "uppercase",
                  color: statusFilter === f ? "var(--foreground)" : "var(--secondary-foreground)",
                  letterSpacing: "0.04em",
                }}
              >
                {f}
                {f !== "All" && (
                  <span
                    className="ml-1.5 px-1.5 py-0.5 rounded-full"
                    style={{
                      background:
                        statusFilter === f ? "var(--primary)" : "var(--border)",
                      color: statusFilter === f ? "white" : "var(--secondary-foreground)",
                      fontSize: "10px",
                    }}
                  >
                    {leaveApplications.filter((a) => a.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={() => navigate("/apply")}
            className="gap-2"
            style={{
              fontFamily: "'Source Code Pro', monospace",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <FilePlus size={15} />
            New Request
          </Button>
        </div>

        {/* Applications List */}
        {filtered.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full"
                style={{ background: "var(--secondary)" }}
              >
                <CalendarDays size={26} color="var(--secondary-foreground)" />
              </div>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-base)",
                  color: "var(--secondary-foreground)",
                }}
              >
                No {statusFilter !== "All" ? statusFilter.toLowerCase() : ""} applications found.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((app) => (
              <Card
                key={app.id}
                className="p-5 flex items-start gap-4 cursor-pointer hover:border-accent/50 transition-colors bg-white"
                style={{
                  borderColor: selectedId === app.id ? "var(--accent)" : undefined,
                }}
                onClick={() => setSelectedId(selectedId === app.id ? null : app.id)}
              >
                {/* Left: Leave Type colour bar */}
                <div
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{
                    background:
                      app.type === "Annual Leave"
                        ? "var(--accent)"
                        : app.type === "Sick Leave"
                        ? "var(--chart-3)"
                        : app.type === "Emergency Leave"
                        ? "var(--chart-4)"
                        : app.type === "Maternity / Paternity"
                        ? "var(--chart-5)"
                        : "var(--muted)",
                    minHeight: 24,
                  }}
                />

                <div className="flex-1 flex flex-col gap-3">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        style={{
                          fontFamily: "'Source Code Pro', monospace",
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--accent)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {app.id}
                      </span>
                      <LeaveTypeBadge type={app.type as LeaveType} />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={app.status} />
                      <ChevronDown
                        size={15}
                        color="var(--secondary-foreground)"
                        style={{
                          transform: selectedId === app.id ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </div>
                  </div>

                  {/* Date & Days */}
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
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
                  </div>

                  <p
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-sm)",
                      color: "var(--secondary-foreground)",
                      lineHeight: 1.5,
                    }}
                  >
                    {app.reason}
                  </p>

                  {/* Expanded Details */}
                  {selectedId === app.id && (
                    <div
                      className="mt-1 pt-3 border-t border-border flex flex-col gap-2"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          ["Applied On", app.appliedDate],
                          ["Approved By", app.approvedBy || "—"],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <p
                              style={{
                                fontFamily: "'Source Code Pro', monospace",
                                fontSize: "var(--text-xs)",
                                textTransform: "uppercase",
                                color: "var(--secondary-foreground)",
                                letterSpacing: "0.05em",
                                marginBottom: "3px",
                              }}
                            >
                              {k}
                            </p>
                            <p
                              style={{
                                fontFamily: "'Baskervville', serif",
                                fontSize: "var(--text-sm)",
                                color: "var(--foreground)",
                              }}
                            >
                              {v}
                            </p>
                          </div>
                        ))}
                      </div>
                      {app.comments && (
                        <Card
                          className="flex items-start gap-2 px-3 py-2.5 bg-secondary"
                        >
                          <MessageSquare size={14} color="var(--secondary-foreground)" style={{ marginTop: 2, flexShrink: 0 }} />
                          <div>
                            <p
                              style={{
                                fontFamily: "'Source Code Pro', monospace",
                                fontSize: "var(--text-xs)",
                                textTransform: "uppercase",
                                color: "var(--secondary-foreground)",
                                letterSpacing: "0.05em",
                                marginBottom: "3px",
                              }}
                            >
                              Manager Comment
                            </p>
                            <p
                              style={{
                                fontFamily: "'Baskervville', serif",
                                fontSize: "var(--text-sm)",
                                color: "var(--foreground)",
                                lineHeight: 1.5,
                              }}
                            >
                              {app.comments}
                            </p>
                          </div>
                        </Card>
                      )}
                      {app.status === "Pending" && (
                        <div className="flex gap-2 mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            style={{
                              fontFamily: "'Source Code Pro', monospace",
                              fontSize: "var(--text-xs)",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                            }}
                          >
                            Edit Request
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 hover:bg-red-50"
                            style={{
                              borderColor: "var(--primary)",
                              fontFamily: "'Source Code Pro', monospace",
                              fontSize: "var(--text-xs)",
                              textTransform: "uppercase",
                              color: "var(--primary)",
                              letterSpacing: "0.04em",
                            }}
                          >
                            <X size={12} />
                            Cancel Request
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}