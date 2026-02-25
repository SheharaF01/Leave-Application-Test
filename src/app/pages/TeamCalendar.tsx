import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { teamCalendarEvents, leaveApplications, type LeaveType } from "../data/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const typeColors: Record<LeaveType, { bg: string; text: string }> = {
  "Annual Leave": { bg: "rgba(20, 101, 245, 0.15)", text: "rgba(20, 101, 245, 1)" },
  "Sick Leave": { bg: "rgba(34, 197, 94, 0.15)", text: "rgba(22, 130, 62, 1)" },
  "Emergency Leave": { bg: "rgba(245, 158, 11, 0.15)", text: "rgba(180, 110, 0, 1)" },
  "Maternity / Paternity": { bg: "rgba(168, 85, 247, 0.15)", text: "rgba(130, 50, 210, 1)" },
  "Unpaid Leave": { bg: "rgba(203, 213, 219, 0.5)", text: "var(--secondary-foreground)" },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function dateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isDateInRange(date: string, start: string, end: string) {
  return date >= start && date <= end;
}

export default function TeamCalendar() {
  const today = new Date(2026, 1, 24); // Feb 24 2026
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const allEvents = [
    ...teamCalendarEvents,
    ...leaveApplications
      .filter((a) => a.status === "Approved" || a.status === "Pending")
      .map((a) => ({
        name: a.employeeName,
        avatar: a.avatar,
        type: a.type,
        startDate: a.startDate,
        endDate: a.endDate,
        status: a.status,
      })),
  ];

  // Deduplicate by name+start+end
  const seen = new Set<string>();
  const events = allEvents.filter((e) => {
    const key = `${e.name}-${e.startDate}-${e.endDate}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const todayStr = dateStr(today.getFullYear(), today.getMonth(), today.getDate());

  function getEventsForDay(day: number) {
    const d = dateStr(year, month, day);
    return events.filter((e) => isDateInRange(d, e.startDate, e.endDate));
  }

  // Legend
  const leaveTypes: LeaveType[] = [
    "Annual Leave",
    "Sick Leave",
    "Emergency Leave",
    "Maternity / Paternity",
    "Unpaid Leave",
  ];

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Team Calendar"
        subtitle="See who's on leave across your team"
      />

      <div className="flex-1 px-8 py-6 flex flex-col gap-5">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMonth}
              className="w-8 h-8"
            >
              <ChevronLeft size={16} />
            </Button>
            <h3
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "var(--text-xl)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                minWidth: 220,
              }}
            >
              {MONTHS[month]} {year}
            </h3>
            <Button
              variant="outline"
              size="icon"
              onClick={nextMonth}
              className="w-8 h-8"
            >
              <ChevronRight size={16} />
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); }}
            style={{
              fontFamily: "'Source Code Pro', monospace",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--font-weight-medium)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Today
          </Button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {leaveTypes.map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: typeColors[t].text }}
              />
              <span
                style={{
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  color: "var(--secondary-foreground)",
                  letterSpacing: "0.04em",
                }}
              >
                {t}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <Card className="overflow-hidden flex-1 bg-white p-0">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-2.5 text-center"
                style={{ borderRight: "1px solid var(--border)" }}
              >
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                    textTransform: "uppercase",
                    color: "var(--secondary-foreground)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              const isToday = day !== null && dateStr(year, month, day) === todayStr;
              const dayEvents = day !== null ? getEventsForDay(day) : [];
              const isWeekend = idx % 7 === 0 || idx % 7 === 6;

              return (
                <div
                  key={idx}
                  className="min-h-24 p-2 flex flex-col gap-1"
                  style={{
                    borderRight: (idx + 1) % 7 !== 0 ? "1px solid var(--border)" : "none",
                    borderBottom: idx < cells.length - 7 ? "1px solid var(--border)" : "none",
                    background: !day ? "var(--secondary)" : isWeekend ? "rgba(248,250,252,0.6)" : "white",
                  }}
                >
                  {day && (
                    <>
                      <div
                        className="self-start flex items-center justify-center w-6 h-6 rounded-full"
                        style={{
                          background: isToday ? "var(--primary)" : "transparent",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: "var(--text-xs)",
                            fontWeight: isToday ? "var(--font-weight-bold)" : "var(--font-weight-normal)",
                            color: isToday ? "white" : isWeekend ? "var(--secondary-foreground)" : "var(--foreground)",
                          }}
                        >
                          {day}
                        </span>
                      </div>

                      {/* Events */}
                      <div className="flex flex-col gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((ev, i) => {
                          const cfg = typeColors[ev.type as LeaveType];
                          const isPending = ev.status === "Pending";
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded"
                              style={{
                                background: cfg.bg,
                                opacity: isPending ? 0.7 : 1,
                                border: isPending ? `1px dashed ${cfg.text}` : "none",
                              }}
                              title={`${ev.name} - ${ev.type}${isPending ? " (Pending)" : ""}`}
                            >
                              <div
                                className="flex items-center justify-center w-4 h-4 rounded-full shrink-0"
                                style={{
                                  background: cfg.text,
                                  color: "white",
                                  fontFamily: "'Montserrat', sans-serif",
                                  fontWeight: "700",
                                  fontSize: "8px",
                                }}
                              >
                                {ev.avatar[0]}
                              </div>
                              <span
                                className="truncate"
                                style={{
                                  fontFamily: "'Source Code Pro', monospace",
                                  fontSize: "10px",
                                  color: cfg.text,
                                  fontWeight: "600",
                                }}
                              >
                                {ev.name.split(" ")[0]}
                              </span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <span
                            style={{
                              fontFamily: "'Source Code Pro', monospace",
                              fontSize: "10px",
                              color: "var(--secondary-foreground)",
                              paddingLeft: "4px",
                            }}
                          >
                            +{dayEvents.length - 3} more
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Leave Summary */}
        <div>
          <h4
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--foreground)",
              marginBottom: "12px",
            }}
          >
            Upcoming Team Leave
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {events
              .filter((e) => e.startDate >= todayStr)
              .sort((a, b) => a.startDate.localeCompare(b.startDate))
              .slice(0, 6)
              .map((ev, i) => {
                const cfg = typeColors[ev.type as LeaveType];
                return (
                  <Card
                    key={i}
                    className="p-3 flex items-center gap-3 bg-white"
                  >
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                      style={{
                        background: cfg.text,
                        color: "white",
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: "700",
                        fontSize: "var(--text-xs)",
                      }}
                    >
                      {ev.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="truncate"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-weight-medium)",
                          color: "var(--foreground)",
                          lineHeight: 1.2,
                        }}
                      >
                        {ev.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Baskervville', serif",
                          fontSize: "var(--text-xs)",
                          color: "var(--secondary-foreground)",
                          marginTop: "2px",
                        }}
                      >
                        {ev.startDate}
                        {ev.startDate !== ev.endDate && ` → ${ev.endDate}`}
                      </p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: cfg.text }}
                      title={ev.type}
                    />
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}