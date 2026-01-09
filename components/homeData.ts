
export const modalDemos = [
  {
    title: "Local Notifications",
    description: "Test instant and delayed notifications",
    route: "/notification",
    color: "#FF2D55",
  },
  {
    title: "Standard Modal",
    description: "Full screen modal presentation",
    route: "/modal",
    color: "#007AFF",
  },
  {
    title: "Form Sheet",
    description: "Bottom sheet with detents and grabber",
    route: "/formsheet",
    color: "#34C759",
  },
  {
    title: "Transparent Modal",
    description: "Overlay without obscuring background",
    route: "/transparent-modal",
    color: "#FF9500",
  }
];

export type ModalDemo = typeof modalDemos[0];
