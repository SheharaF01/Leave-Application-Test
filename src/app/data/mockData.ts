export type LeaveStatus = "Pending" | "Approved" | "Rejected" | "Cancelled";
export type LeaveType =
  | "Annual Leave"
  | "Sick Leave"
  | "Emergency Leave"
  | "Maternity / Paternity"
  | "Unpaid Leave";

export interface LeaveApplication {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  avatar: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  approvedBy?: string;
  comments?: string;
}

export interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
  remaining: number;
  color: string;
}

export const currentUser = {
  name: "Alex Rivera",
  employeeId: "EMP-1042",
  department: "Product Design",
  role: "Senior Designer",
  avatar: "AR",
  managerName: "Sarah Chen",
};

export const leaveBalances: LeaveBalance[] = [
  { type: "Annual Leave", total: 21, used: 8, remaining: 13, color: "var(--accent)" },
  { type: "Sick Leave", total: 14, used: 3, remaining: 11, color: "var(--chart-3)" },
  { type: "Emergency Leave", total: 5, used: 1, remaining: 4, color: "var(--chart-4)" },
  { type: "Maternity / Paternity", total: 90, used: 0, remaining: 90, color: "var(--chart-5)" },
  { type: "Unpaid Leave", total: 30, used: 0, remaining: 30, color: "var(--muted)" },
];

export const leaveApplications: LeaveApplication[] = [
  {
    id: "LA-2024-001",
    employeeName: "Alex Rivera",
    employeeId: "EMP-1042",
    department: "Product Design",
    avatar: "AR",
    type: "Annual Leave",
    startDate: "2026-03-10",
    endDate: "2026-03-14",
    days: 5,
    reason: "Family vacation to the coast. Pre-planned trip.",
    status: "Approved",
    appliedDate: "2026-02-15",
    approvedBy: "Sarah Chen",
    comments: "Approved. Enjoy your vacation!",
  },
  {
    id: "LA-2024-002",
    employeeName: "Alex Rivera",
    employeeId: "EMP-1042",
    department: "Product Design",
    avatar: "AR",
    type: "Sick Leave",
    startDate: "2026-02-05",
    endDate: "2026-02-06",
    days: 2,
    reason: "Fever and flu symptoms. Doctor's certificate attached.",
    status: "Approved",
    appliedDate: "2026-02-05",
    approvedBy: "Sarah Chen",
  },
  {
    id: "LA-2024-003",
    employeeName: "Alex Rivera",
    employeeId: "EMP-1042",
    department: "Product Design",
    avatar: "AR",
    type: "Annual Leave",
    startDate: "2026-04-21",
    endDate: "2026-04-25",
    days: 5,
    reason: "Personal errands and home renovation.",
    status: "Pending",
    appliedDate: "2026-02-20",
  },
  {
    id: "LA-2024-004",
    employeeName: "Alex Rivera",
    employeeId: "EMP-1042",
    department: "Product Design",
    avatar: "AR",
    type: "Emergency Leave",
    startDate: "2026-01-18",
    endDate: "2026-01-18",
    days: 1,
    reason: "Family emergency - hospitalisation of parent.",
    status: "Approved",
    appliedDate: "2026-01-18",
    approvedBy: "Sarah Chen",
  },
  {
    id: "LA-2024-005",
    employeeName: "Alex Rivera",
    employeeId: "EMP-1042",
    department: "Product Design",
    avatar: "AR",
    type: "Annual Leave",
    startDate: "2026-05-04",
    endDate: "2026-05-08",
    days: 5,
    reason: "Extended long weekend travel.",
    status: "Rejected",
    appliedDate: "2026-02-18",
    approvedBy: "Sarah Chen",
    comments: "Team headcount is short during this period. Please reschedule.",
  },
];

export const pendingApprovals: LeaveApplication[] = [
  {
    id: "LA-2024-006",
    employeeName: "Jordan Kim",
    employeeId: "EMP-1051",
    department: "Product Design",
    avatar: "JK",
    type: "Annual Leave",
    startDate: "2026-03-17",
    endDate: "2026-03-21",
    days: 5,
    reason: "Holiday trip to Japan planned months ahead.",
    status: "Pending",
    appliedDate: "2026-02-22",
  },
  {
    id: "LA-2024-007",
    employeeName: "Morgan Lee",
    employeeId: "EMP-1038",
    department: "Product Design",
    avatar: "ML",
    type: "Sick Leave",
    startDate: "2026-02-25",
    endDate: "2026-02-26",
    days: 2,
    reason: "Medical procedure scheduled by doctor.",
    status: "Pending",
    appliedDate: "2026-02-23",
  },
  {
    id: "LA-2024-008",
    employeeName: "Sam Torres",
    employeeId: "EMP-1029",
    department: "Engineering",
    avatar: "ST",
    type: "Emergency Leave",
    startDate: "2026-02-24",
    endDate: "2026-02-24",
    days: 1,
    reason: "Urgent family matter requiring immediate attention.",
    status: "Pending",
    appliedDate: "2026-02-24",
  },
  {
    id: "LA-2024-009",
    employeeName: "Casey Nguyen",
    employeeId: "EMP-1063",
    department: "Marketing",
    avatar: "CN",
    type: "Annual Leave",
    startDate: "2026-03-30",
    endDate: "2026-04-04",
    days: 6,
    reason: "Annual family reunion celebration.",
    status: "Pending",
    appliedDate: "2026-02-21",
  },
  {
    id: "LA-2024-010",
    employeeName: "Riley Park",
    employeeId: "EMP-1077",
    department: "Finance",
    avatar: "RP",
    type: "Unpaid Leave",
    startDate: "2026-04-14",
    endDate: "2026-04-18",
    days: 5,
    reason: "Volunteering at a non-profit for community service.",
    status: "Pending",
    appliedDate: "2026-02-19",
  },
];

export const teamCalendarEvents = [
  { name: "Alex Rivera", avatar: "AR", type: "Annual Leave" as LeaveType, startDate: "2026-03-10", endDate: "2026-03-14", status: "Approved" as LeaveStatus },
  { name: "Jordan Kim", avatar: "JK", type: "Annual Leave" as LeaveType, startDate: "2026-03-17", endDate: "2026-03-21", status: "Pending" as LeaveStatus },
  { name: "Morgan Lee", avatar: "ML", type: "Sick Leave" as LeaveType, startDate: "2026-02-25", endDate: "2026-02-26", status: "Pending" as LeaveStatus },
  { name: "Sam Torres", avatar: "ST", type: "Emergency Leave" as LeaveType, startDate: "2026-02-24", endDate: "2026-02-24", status: "Pending" as LeaveStatus },
  { name: "Casey Nguyen", avatar: "CN", type: "Annual Leave" as LeaveType, startDate: "2026-03-30", endDate: "2026-04-04", status: "Pending" as LeaveStatus },
  { name: "Riley Park", avatar: "RP", type: "Unpaid Leave" as LeaveType, startDate: "2026-04-14", endDate: "2026-04-18", status: "Pending" as LeaveStatus },
];
