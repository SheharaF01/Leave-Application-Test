import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import Dashboard from "./pages/Dashboard";
import ApplyLeave from "./pages/ApplyLeave";
import MyApplications from "./pages/MyApplications";
import ManagerApprovals from "./pages/ManagerApprovals";
import TeamCalendar from "./pages/TeamCalendar";
import Components from "./pages/Components";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "apply", Component: ApplyLeave },
      { path: "my-applications", Component: MyApplications },
      { path: "approvals", Component: ManagerApprovals },
      { path: "calendar", Component: TeamCalendar },
      { path: "components", Component: Components },
    ],
  },
]);