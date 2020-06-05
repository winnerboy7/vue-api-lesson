import AdminHome from "@/views/admin/Home.vue";

export default [
  {
    path: "/admin",
    name: "Admin",
    component: AdminHome,
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("@/views/admin/Dashboard"),
  },
  {
    path: "/admin/project",
    name: "AdminProject",
    component: () => import("@/views/admin/Project"),
  },
  {
    path: "/admin/team",
    name: "AdminTeam",
    component: () => import("@/views/admin/Team"),
  },
];
