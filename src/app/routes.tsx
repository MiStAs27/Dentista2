import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PatientsPage } from "./pages/PatientsPage";
import { PatientDetailsPage } from "./pages/PatientDetailsPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PatientPortalPage } from "./pages/PatientPortalPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: LoginPage },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "patients", Component: PatientsPage },
      { path: "patients/:id", Component: PatientDetailsPage },
      { path: "appointments", Component: AppointmentsPage },
      { path: "calendar", Component: CalendarPage },
      { path: "reports", Component: ReportsPage },
      { path: "settings", Component: SettingsPage },
      { path: "patient-portal", Component: PatientPortalPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
