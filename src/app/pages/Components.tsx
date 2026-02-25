import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/ui/StatusBadge";
import { LeaveTypeBadge } from "../components/ui/LeaveTypeBadge";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
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
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  FilePlus,
  ArrowRight,
  Search,
} from "lucide-react";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "var(--text-lg)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: "'Baskervville', serif",
              fontSize: "var(--text-sm)",
              color: "var(--secondary-foreground)",
              marginTop: "4px",
            }}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function ComponentBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
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
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}

export default function Components() {
  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Component Library"
        subtitle="A comprehensive showcase of all UI components in the leave application system"
      />

      <div className="flex-1 px-8 py-6 flex flex-col gap-8">
        {/* Typography */}
        <Section
          title="Typography"
          description="Font hierarchy using Montserrat for headings, Baskervville for body text, and Source Code Pro for labels/buttons"
        >
          <Card className="p-6 bg-white flex flex-col gap-4">
            <div>
              <h1>Heading 1 - Montserrat Bold 48px</h1>
            </div>
            <div>
              <h2>Heading 2 - Montserrat Bold 36px</h2>
            </div>
            <div>
              <h3>Heading 3 - Montserrat Medium 24px</h3>
            </div>
            <div>
              <h4>Heading 4 - Montserrat Medium 20px</h4>
            </div>
            <div>
              <p>
                Body text - Baskervville Regular 16px. This is
                the default paragraph style used throughout the
                application for readable content.
              </p>
            </div>
            <div>
              <label>
                Label - Source Code Pro Medium 14px uppercase
              </label>
            </div>
            <div>
              <button
                style={{
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: "var(--text-base)",
                  fontWeight: "var(--font-weight-medium)",
                  textTransform: "uppercase",
                  color: "var(--foreground)",
                }}
              >
                Button - Source Code Pro Medium 16px uppercase
              </button>
            </div>
          </Card>
        </Section>

        {/* Buttons */}
        <Section
          title="Buttons"
          description="Button variants with different styles and sizes"
        >
          <Card className="p-6 bg-white flex flex-col gap-6">
            <ComponentBlock label="Primary Buttons">
              <Button>Default Button</Button>
              <Button className="gap-2">
                <FilePlus size={16} />
                With Icon
              </Button>
              <Button disabled>Disabled</Button>
            </ComponentBlock>

            <ComponentBlock label="Outline Buttons">
              <Button variant="outline">Outline Button</Button>
              <Button variant="outline" className="gap-2">
                <ArrowRight size={16} />
                With Icon
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </ComponentBlock>

            <ComponentBlock label="Ghost Buttons">
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="ghost" className="gap-2">
                <Search size={16} />
                With Icon
              </Button>
            </ComponentBlock>

            <ComponentBlock label="Secondary Buttons">
              <Button variant="secondary">
                Secondary Button
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </ComponentBlock>

            <ComponentBlock label="Destructive Buttons">
              <Button variant="destructive">
                Destructive Button
              </Button>
              <Button variant="destructive" className="gap-2">
                <XCircle size={16} />
                With Icon
              </Button>
            </ComponentBlock>
          </Card>
        </Section>

        {/* Badges */}
        <Section
          title="Badges"
          description="Status and type indicators with color-coded backgrounds"
        >
          <Card className="p-6 bg-white flex flex-col gap-6">
            <ComponentBlock label="Status Badges">
              <StatusBadge status="Pending" />
              <StatusBadge status="Approved" />
              <StatusBadge status="Rejected" />
              <StatusBadge status="Cancelled" />
            </ComponentBlock>

            <ComponentBlock label="Leave Type Badges">
              <LeaveTypeBadge type="Annual Leave" />
              <LeaveTypeBadge type="Sick Leave" />
              <LeaveTypeBadge type="Emergency Leave" />
              <LeaveTypeBadge type="Maternity / Paternity" />
              <LeaveTypeBadge type="Unpaid Leave" />
            </ComponentBlock>
          </Card>
        </Section>

        {/* Cards */}
        <Section
          title="Cards"
          description="Various card layouts used throughout the application"
        >
          <div className="grid grid-cols-3 gap-4">
            {/* Balance Card */}
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
                  Annual Leave
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(20, 101, 245, 0.09)",
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  14 left
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
                    14
                  </span>
                  <span
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-sm)",
                      color: "var(--secondary-foreground)",
                      marginBottom: "2px",
                    }}
                  >
                    / 20 days
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <Progress
                  value={30}
                  className="h-1.5 bg-border"
                  style={{
                    // @ts-ignore
                    "--progress-indicator-color":
                      "var(--accent)",
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
                  6 days used
                </p>
              </div>
            </Card>

            {/* Stat Card */}
            <Card className="p-4 bg-white flex-row items-center gap-4">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-md shrink-0"
                style={{
                  background: "rgba(20, 101, 245, 0.08)",
                }}
              >
                <TrendingUp size={19} color="var(--accent)" />
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
                  24
                </p>
                <p
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-xs)",
                    color: "var(--secondary-foreground)",
                    marginTop: "2px",
                  }}
                >
                  Total Applications
                </p>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-4 bg-secondary flex flex-col gap-2">
              <div className="flex justify-between">
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    textTransform: "uppercase",
                    color: "var(--secondary-foreground)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Employee
                </span>
                <span
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-sm)",
                    color: "var(--foreground)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  John Doe
                </span>
              </div>
              <div className="flex justify-between">
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    textTransform: "uppercase",
                    color: "var(--secondary-foreground)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Department
                </span>
                <span
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-sm)",
                    color: "var(--foreground)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Engineering
                </span>
              </div>
            </Card>
          </div>

          {/* Featured Card */}
          <Card
            className="px-6 py-5 flex-row items-center justify-between border-0"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, rgba(235,26,82,0.80) 100%)",
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
                Featured Card with Gradient
              </h4>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-sm)",
                  color: "rgba(255,255,255,0.8)",
                  marginTop: "4px",
                }}
              >
                This card uses a gradient background for
                emphasis and call-to-action sections.
              </p>
            </div>
            <Button
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
              Action
            </Button>
          </Card>
        </Section>

        {/* Form Elements */}
        <Section
          title="Form Elements"
          description="Input fields, textareas, and labels used in forms"
        >
          <Card className="p-6 bg-white flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
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
                  Text Input
                </Label>
                <Input
                  placeholder="Enter text..."
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-base)",
                  }}
                />
              </div>
              <div>
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
                  Date Input
                </Label>
                <Input
                  type="date"
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-base)",
                  }}
                />
              </div>
            </div>

            <div>
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
                Textarea
              </Label>
              <Textarea
                rows={4}
                placeholder="Enter longer text..."
                style={{
                  fontFamily: "'Baskervville', serif",
                  lineHeight: 1.6,
                }}
              />
            </div>

            <div>
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
                Disabled Input
              </Label>
              <Input
                disabled
                value="Disabled field"
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-base)",
                }}
              />
            </div>
          </Card>
        </Section>

        {/* Progress Bars */}
        <Section
          title="Progress Indicators"
          description="Progress bars with custom colors"
        >
          <Card className="p-6 bg-white flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                    textTransform: "uppercase",
                    color: "var(--secondary-foreground)",
                  }}
                >
                  Annual Leave - 30%
                </span>
              </div>
              <Progress
                value={30}
                className="h-1.5 bg-border"
                style={{
                  // @ts-ignore
                  "--progress-indicator-color": "var(--accent)",
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                    textTransform: "uppercase",
                    color: "var(--secondary-foreground)",
                  }}
                >
                  Sick Leave - 60%
                </span>
              </div>
              <Progress
                value={60}
                className="h-1.5 bg-border"
                style={{
                  // @ts-ignore
                  "--progress-indicator-color":
                    "var(--chart-3)",
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span
                  style={{
                    fontFamily: "'Source Code Pro', monospace",
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--font-weight-medium)",
                    textTransform: "uppercase",
                    color: "var(--secondary-foreground)",
                  }}
                >
                  Emergency Leave - 85%
                </span>
              </div>
              <Progress
                value={85}
                className="h-1.5 bg-border"
                style={{
                  // @ts-ignore
                  "--progress-indicator-color":
                    "var(--chart-4)",
                }}
              />
            </div>
          </Card>
        </Section>

        {/* Interactive Elements */}
        <Section
          title="Interactive Elements"
          description="Selectable tiles and interactive components"
        >
          <Card className="p-6 bg-white">
            <div className="grid grid-cols-2 gap-2.5">
              {/* Selected State */}
              <button
                type="button"
                className="flex items-center justify-between px-4 py-3 rounded-md border transition-all text-left"
                style={{
                  borderColor: "var(--accent)",
                  background: "rgba(20, 101, 245, 0.06)",
                  outline: "2px solid var(--accent)",
                  outlineOffset: "-1px",
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--accent)",
                    }}
                  >
                    Annual Leave
                  </span>
                  <span
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-xs)",
                      color: "var(--secondary-foreground)",
                    }}
                  >
                    14 days remaining
                  </span>
                </div>
                <CheckCircle size={16} color="var(--accent)" />
              </button>

              {/* Unselected State */}
              <button
                type="button"
                className="flex items-center justify-between px-4 py-3 rounded-md border transition-all text-left"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--input-background)",
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--foreground)",
                    }}
                  >
                    Sick Leave
                  </span>
                  <span
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-xs)",
                      color: "var(--secondary-foreground)",
                    }}
                  >
                    8 days remaining
                  </span>
                </div>
              </button>
            </div>
          </Card>
        </Section>

        {/* Stepper */}
        <Section
          title="Stepper Component"
          description="Multi-step navigation indicator"
        >
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-0">
              {[
                { n: 1, label: "Completed Step" },
                { n: 2, label: "Active Step" },
                { n: 3, label: "Upcoming Step" },
              ].map(({ n, label }, i, arr) => {
                const currentStep = 2;
                const isActive = currentStep >= n;
                const isComplete = currentStep > n;
                return (
                  <div
                    key={n}
                    className="flex items-center flex-1"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <div
                        className="flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                        style={{
                          background: isActive
                            ? "var(--primary)"
                            : "var(--border)",
                          transition: "background 0.2s",
                        }}
                      >
                        {isComplete ? (
                          <CheckCircle
                            size={14}
                            color="white"
                          />
                        ) : (
                          <span
                            style={{
                              fontFamily:
                                "'Montserrat', sans-serif",
                              fontSize: "var(--text-xs)",
                              fontWeight:
                                "var(--font-weight-bold)",
                              color: isActive
                                ? "white"
                                : "var(--secondary-foreground)",
                            }}
                          >
                            {n}
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily:
                            "'Source Code Pro', monospace",
                          fontSize: "var(--text-xs)",
                          fontWeight:
                            "var(--font-weight-medium)",
                          textTransform: "uppercase",
                          color: isActive
                            ? "var(--foreground)"
                            : "var(--secondary-foreground)",
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
                        style={{
                          background:
                            currentStep > n
                              ? "var(--primary)"
                              : "var(--border)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </Section>

        {/* Alert Messages */}
        <Section
          title="Alert & Info Messages"
          description="Various alert and notification styles"
        >
          <Card className="p-6 bg-white flex flex-col gap-4">
            {/* Info Alert */}
            <Card
              className="flex items-start gap-3 px-4 py-3 border"
              style={{
                background: "rgba(20, 101, 245, 0.06)",
                borderColor: "rgba(20, 101, 245, 0.2)",
              }}
            >
              <AlertCircle
                size={16}
                color="var(--accent)"
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-sm)",
                  color: "var(--accent)",
                  lineHeight: 1.6,
                }}
              >
                This is an informational message with important
                details for the user.
              </p>
            </Card>

            {/* Success Message */}
            <Card className="flex items-center gap-3 px-4 py-3 bg-secondary">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-md shrink-0"
                style={{
                  background: "var(--accent)",
                  color: "white",
                }}
              >
                <CheckCircle size={20} color="white" />
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
                  Success message
                </p>
                <p
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-xs)",
                    color: "var(--secondary-foreground)",
                    marginTop: "2px",
                  }}
                >
                  Your action was completed successfully.
                </p>
              </div>
            </Card>

            {/* Warning */}
            <Card className="flex items-center gap-3 px-4 py-3 bg-secondary">
              <div
                className="flex items-center justify-center w-9 h-9 rounded-md shrink-0"
                style={{
                  background: "rgba(245, 158, 11, 0.12)",
                }}
              >
                <AlertCircle size={20} color="var(--chart-4)" />
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
                  Warning message
                </p>
                <p
                  className="flex items-center gap-1"
                  style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: "var(--text-xs)",
                    color: "var(--secondary-foreground)",
                    marginTop: "2px",
                  }}
                >
                  Please review this information carefully.
                </p>
              </div>
            </Card>
          </Card>
        </Section>

        {/* Tables */}
        <Section
          title="Tables"
          description="Data tables with headers and various cell types"
        >
          <Card className="bg-white overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  {[
                    "ID",
                    "Type",
                    "Duration",
                    "Days",
                    "Status",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="h-auto px-5 py-3 bg-secondary"
                      style={{
                        fontFamily:
                          "'Source Code Pro', monospace",
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
                <TableRow>
                  <TableCell
                    className="px-5 py-3.5"
                    style={{
                      fontFamily:
                        "'Source Code Pro', monospace",
                      fontSize: "var(--text-sm)",
                      color: "var(--accent)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    #001
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <LeaveTypeBadge type="Annual Leave" />
                  </TableCell>
                  <TableCell
                    className="px-5 py-3.5"
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-sm)",
                      color: "var(--card-foreground)",
                    }}
                  >
                    2026-03-15 → 2026-03-20
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
                    5d
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <StatusBadge status="Approved" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className="px-5 py-3.5"
                    style={{
                      fontFamily:
                        "'Source Code Pro', monospace",
                      fontSize: "var(--text-sm)",
                      color: "var(--accent)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    #002
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <LeaveTypeBadge type="Sick Leave" />
                  </TableCell>
                  <TableCell
                    className="px-5 py-3.5"
                    style={{
                      fontFamily: "'Baskervville', serif",
                      fontSize: "var(--text-sm)",
                      color: "var(--card-foreground)",
                    }}
                  >
                    2026-02-10 → 2026-02-12
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
                    3d
                  </TableCell>
                  <TableCell className="px-5 py-3.5">
                    <StatusBadge status="Pending" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Section>

        {/* Upload Area */}
        <Section
          title="Upload Area"
          description="File upload interface with feedback"
        >
          <Card className="p-6 bg-white flex flex-col gap-4">
            <button
              type="button"
              className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-md border border-dashed hover:bg-secondary/50 transition-colors"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: "var(--secondary)",
                }}
              >
                <Upload
                  size={20}
                  color="var(--secondary-foreground)"
                />
              </div>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-sm)",
                  color: "var(--secondary-foreground)",
                }}
              >
                Click to upload supporting documents
              </p>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-xs)",
                  color: "var(--muted-foreground)",
                }}
              >
                PDF, JPG, PNG up to 10MB
              </p>
            </button>

            <button
              type="button"
              className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-md border border-dashed transition-colors"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{
                  background: "rgba(34, 197, 94, 0.12)",
                }}
              >
                <CheckCircle size={20} color="var(--chart-3)" />
              </div>
              <p
                style={{
                  fontFamily: "'Baskervville', serif",
                  fontSize: "var(--text-sm)",
                  color: "var(--chart-3)",
                }}
              >
                Document attached
              </p>
            </button>
          </Card>
        </Section>

        {/* Icon Examples */}
        <Section
          title="Icons"
          description="Lucide React icons used throughout the application"
        >
          <Card className="p-6 bg-white">
            <div className="flex flex-wrap gap-6">
              {[
                { icon: TrendingUp, label: "TrendingUp" },
                { icon: Clock, label: "Clock" },
                { icon: CheckCircle, label: "CheckCircle" },
                { icon: XCircle, label: "XCircle" },
                { icon: AlertCircle, label: "AlertCircle" },
                { icon: Upload, label: "Upload" },
                { icon: FilePlus, label: "FilePlus" },
                { icon: ArrowRight, label: "ArrowRight" },
                { icon: Search, label: "Search" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-md"
                    style={{ background: "var(--secondary)" }}
                  >
                    <Icon size={20} color="var(--foreground)" />
                  </div>
                  <span
                    style={{
                      fontFamily:
                        "'Source Code Pro', monospace",
                      fontSize: "var(--text-xs)",
                      color: "var(--secondary-foreground)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Color Palette */}
        <Section
          title="Color Palette"
          description="CSS variable-based color system"
        >
          <Card className="p-6 bg-white">
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "Primary", var: "var(--primary)" },
                { name: "Accent", var: "var(--accent)" },
                {
                  name: "Chart 3 (Success)",
                  var: "var(--chart-3)",
                },
                {
                  name: "Chart 4 (Warning)",
                  var: "var(--chart-4)",
                },
                { name: "Secondary", var: "var(--secondary)" },
                { name: "Muted", var: "var(--muted)" },
                { name: "Border", var: "var(--border)" },
                {
                  name: "Background",
                  var: "var(--background)",
                },
              ].map(({ name, var: colorVar }) => (
                <div key={name} className="flex flex-col gap-2">
                  <div
                    className="h-16 rounded-md border"
                    style={{
                      background: colorVar,
                      borderColor: "var(--border)",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "var(--text-sm)",
                        fontWeight: "var(--font-weight-medium)",
                        color: "var(--foreground)",
                      }}
                    >
                      {name}
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "'Source Code Pro', monospace",
                        fontSize: "var(--text-xs)",
                        color: "var(--secondary-foreground)",
                      }}
                    >
                      {colorVar}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}