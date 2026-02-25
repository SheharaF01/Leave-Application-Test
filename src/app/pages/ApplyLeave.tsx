import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/layout/Header";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { leaveBalances, currentUser, type LeaveType } from "../data/mockData";
import { CheckCircle, Upload, AlertCircle, ChevronRight } from "lucide-react";

const leaveTypes: LeaveType[] = [
  "Annual Leave",
  "Sick Leave",
  "Emergency Leave",
  "Maternity / Paternity",
  "Unpaid Leave",
];

const typeColors: Record<LeaveType, string> = {
  "Annual Leave": "var(--accent)",
  "Sick Leave": "var(--chart-3)",
  "Emergency Leave": "var(--chart-4)",
  "Maternity / Paternity": "var(--chart-5)",
  "Unpaid Leave": "var(--muted)",
};

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label
      style={{
        fontFamily: "'Source Code Pro', monospace",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--font-weight-medium)",
        textTransform: "uppercase",
        color: "var(--secondary-foreground)",
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </Label>
  );
}

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    leaveType: "" as LeaveType | "",
    startDate: "",
    endDate: "",
    reason: "",
    contactNumber: "",
    handoverTo: "",
    attachments: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function calcDays() {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(0, diff);
  }

  const days = calcDays();
  const selectedBalance = leaveBalances.find((b) => b.type === form.leaveType);

  function handleNext() {
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  }
  function handleBack() {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2 | 3);
  }
  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-full">
        <Header title="Apply for Leave" />
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="flex flex-col items-center gap-5 max-w-sm text-center">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full"
              style={{ background: "rgba(34, 197, 94, 0.12)" }}
            >
              <CheckCircle size={32} color="var(--chart-3)" />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "var(--text-xl)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                }}
              >
                Application Submitted
              </h3>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-base)",
                  color: "var(--secondary-foreground)",
                  marginTop: "8px",
                  lineHeight: 1.6,
                }}
              >
                Your leave request has been sent to {currentUser.managerName} for
                review. You'll be notified once it's processed.
              </p>
            </div>
            <Card className="w-full p-4 bg-secondary">
              <div className="flex flex-col gap-2">
                {[
                  ["Leave Type", form.leaveType],
                  ["Duration", `${form.startDate} → ${form.endDate}`],
                  ["Days", `${days} working day(s)`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: "var(--text-xs)",
                        textTransform: "uppercase",
                        color: "var(--secondary-foreground)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {k}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Baskervville', serif",
                        fontSize: "var(--text-sm)",
                        color: "var(--foreground)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => navigate("/my-applications")}
                className="flex-1"
                style={{
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                View Applications
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setForm({
                    leaveType: "",
                    startDate: "",
                    endDate: "",
                    reason: "",
                    contactNumber: "",
                    handoverTo: "",
                    attachments: false,
                  });
                }}
                className="flex-1"
                style={{
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                New Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Apply for Leave"
        subtitle="Complete the form to submit your leave request"
      />

      <div className="flex-1 px-8 py-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {/* Stepper */}
          <div className="flex items-center gap-0">
            {[
              { n: 1, label: "Leave Type & Dates" },
              { n: 2, label: "Details" },
              { n: 3, label: "Review" },
            ].map(({ n, label }, i, arr) => (
              <div key={n} className="flex items-center flex-1">
                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                    style={{
                      background: step >= n ? "var(--primary)" : "var(--border)",
                      transition: "background 0.2s",
                    }}
                  >
                    {step > n ? (
                      <CheckCircle size={14} color="white" />
                    ) : (
                      <span
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "var(--text-xs)",
                          fontWeight: "var(--font-weight-bold)",
                          color: step >= n ? "white" : "var(--secondary-foreground)",
                        }}
                      >
                        {n}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontFamily: "'Source Code Pro', monospace",
                      fontSize: "var(--text-xs)",
                      fontWeight: "var(--font-weight-medium)",
                      textTransform: "uppercase",
                      color: step >= n ? "var(--foreground)" : "var(--secondary-foreground)",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div
                    className="flex-1 h-px mx-3"
                    style={{ background: step > n ? "var(--primary)" : "var(--border)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Leave Type & Dates */}
          {step === 1 && (
            <Card className="p-6 bg-white flex flex-col gap-5">
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                }}
              >
                Select Leave Type & Dates
              </h4>

              {/* Leave Type Grid */}
              <div>
                <FormLabel>Leave Type *</FormLabel>
                <div className="grid grid-cols-2 gap-2.5 mt-1">
                  {leaveTypes.map((t) => {
                    const bal = leaveBalances.find((b) => b.type === t);
                    const isSelected = form.leaveType === t;
                    const color = typeColors[t];
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, leaveType: t }))}
                        className="flex items-center justify-between px-4 py-3 rounded-md border transition-all text-left"
                        style={{
                          borderColor: isSelected ? color : "var(--border)",
                          background: isSelected ? `${color}10` : "var(--input-background)",
                          outline: isSelected ? `2px solid ${color}` : "none",
                          outlineOffset: "-1px",
                        }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontSize: "var(--text-sm)",
                              fontWeight: "var(--font-weight-medium)",
                              color: isSelected ? color : "var(--foreground)",
                            }}
                          >
                            {t}
                          </span>
                          {bal && (
                            <span
                              style={{
                                fontFamily: "'Baskervville', serif",
                                fontSize: "var(--text-xs)",
                                color: "var(--secondary-foreground)",
                              }}
                            >
                              {bal.remaining} days remaining
                            </span>
                          )}
                        </div>
                        {isSelected && <CheckCircle size={16} color={color} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Start Date *</FormLabel>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-base)",
                    }}
                  />
                </div>
                <div>
                  <FormLabel>End Date *</FormLabel>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-base)",
                    }}
                  />
                </div>
              </div>

              {/* Days Preview */}
              {days > 0 && (
                <Card className="flex items-center gap-3 px-4 py-3 bg-secondary">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-md shrink-0"
                    style={{ background: "var(--accent)", color: "white" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-bold)",
                      }}
                    >
                      {days}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--foreground)",
                      }}
                    >
                      {days} day{days !== 1 ? "s" : ""} requested
                    </p>
                    {selectedBalance && days > selectedBalance.remaining && (
                      <p
                        className="flex items-center gap-1"
                        style={{
                          fontFamily: "'Baskervville', serif",
                          fontSize: "var(--text-xs)",
                          color: "var(--primary)",
                          marginTop: "2px",
                        }}
                      >
                        <AlertCircle size={12} />
                        Exceeds your remaining balance ({selectedBalance.remaining} days)
                      </p>
                    )}
                  </div>
                </Card>
              )}
            </Card>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <Card className="p-6 bg-white flex flex-col gap-5">
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                }}
              >
                Additional Details
              </h4>

              <div>
                <FormLabel>Reason for Leave *</FormLabel>
                <Textarea
                  rows={4}
                  placeholder="Please describe the reason for your leave request..."
                  value={form.reason}
                  onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                  style={{
                    fontFamily: "'Baskervville', serif",
                    lineHeight: 1.6,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Emergency Contact</FormLabel>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.contactNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, contactNumber: e.target.value }))
                    }
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-base)",
                    }}
                  />
                </div>
                <div>
                  <FormLabel>Handover To</FormLabel>
                  <Input
                    type="text"
                    placeholder="Colleague name..."
                    value={form.handoverTo}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, handoverTo: e.target.value }))
                    }
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-base)",
                    }}
                  />
                </div>
              </div>

              {/* Attachment upload area */}
              <div>
                <FormLabel>Supporting Documents</FormLabel>
                <button
                  type="button"
                  className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-md border border-dashed hover:bg-secondary/50 transition-colors"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => setForm((f) => ({ ...f, attachments: true }))}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                      background: form.attachments
                        ? "rgba(34, 197, 94, 0.12)"
                        : "var(--secondary)",
                    }}
                  >
                    {form.attachments ? (
                      <CheckCircle size={20} color="var(--chart-3)" />
                    ) : (
                      <Upload size={20} color="var(--secondary-foreground)" />
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-sm)",
                      color: form.attachments
                        ? "var(--chart-3)"
                        : "var(--secondary-foreground)",
                    }}
                  >
                    {form.attachments
                      ? "Document attached"
                      : "Click to upload supporting documents"}
                  </p>
                  {!form.attachments && (
                    <p
                      style={{
                        fontFamily: "'Baskervville', serif",
                        fontSize: "var(--text-xs)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      PDF, JPG, PNG up to 10MB
                    </p>
                  )}
                </button>
              </div>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card className="p-6 bg-white flex flex-col gap-5">
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                }}
              >
                Review Your Application
              </h4>

              <Card className="p-4 bg-secondary flex flex-col gap-3">
                {[
                  ["Employee", `${currentUser.name} (${currentUser.employeeId})`],
                  ["Department", currentUser.department],
                  ["Leave Type", form.leaveType || "—"],
                  ["Start Date", form.startDate || "—"],
                  ["End Date", form.endDate || "—"],
                  ["Total Days", days ? `${days} day(s)` : "—"],
                  ["Reason", form.reason || "—"],
                  ["Emergency Contact", form.contactNumber || "—"],
                  ["Handover To", form.handoverTo || "—"],
                  ["Approving Manager", currentUser.managerName],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between items-start pb-2.5 border-b border-border"
                  >
                    <span
                      style={{
                        fontFamily: "'Source Code Pro', monospace",
                        fontSize: "var(--text-xs)",
                        textTransform: "uppercase",
                        color: "var(--secondary-foreground)",
                        letterSpacing: "0.05em",
                        minWidth: 140,
                      }}
                    >
                      {k}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Baskervville', serif",
                        fontSize: "var(--text-sm)",
                        color: "var(--foreground)",
                        textAlign: "right",
                        maxWidth: "60%",
                        lineHeight: 1.5,
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </Card>

              <Card
                className="flex items-start gap-3 px-4 py-3 border"
                style={{ background: "rgba(20, 101, 245, 0.06)", borderColor: "rgba(20, 101, 245, 0.2)" }}
              >
                <AlertCircle size={16} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                <p
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-sm)",
                    color: "var(--accent)",
                    lineHeight: 1.6,
                  }}
                >
                  By submitting, you confirm the details above are accurate. Your
                  manager {currentUser.managerName} will be notified for approval.
                </p>
              </Card>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={step === 1 ? () => navigate("/") : handleBack}
              style={{
                fontFamily: "'Source Code Pro', monospace",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>

            <Button
              type="button"
              onClick={step === 3 ? handleSubmit : handleNext}
              disabled={
                step === 1 && (!form.leaveType || !form.startDate || !form.endDate)
              }
              className="flex items-center gap-2"
              style={{
                fontFamily: "'Source Code Pro', monospace",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {step === 3 ? "Submit Application" : "Continue"}
              {step < 3 && <ChevronRight size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}