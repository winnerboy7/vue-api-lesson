import AreaHome from "@/views/area/Home";

export default [
  {
    path: "/area",
    name: "Area",
    component: AreaHome,
  },
  {
    path: "/area/dashboard",
    name: "AreaDashboard",
    component: () => import("@/views/area/Dashboard"),
  },
];
