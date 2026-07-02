import { ChatIcon, PaperIcon } from "./icons";

export const FEATURE_CARDS = [
  {
    path: "/past-papers",
    iconBg: "rgba(99,102,241,0.15)",
    iconColor: "#818cf8",
    Icon: PaperIcon,
    heading: "Past Papers Hub",
    text: "Every A Level Maths paper from 2020 to 2025, all 3 variants and every series, organized so you can find exactly what you need in seconds.",
    bullets: [
      "Classified Pure Math, Mechanics & Stats",
      "Official Marking Schemes included",
      "All variants and series in one place",
    ],
    cta: "Access Past Papers",
  },
  {
    path: "/ai-assistant",
    iconBg: "rgba(168,85,247,0.15)",
    iconColor: "#c084fc",
    Icon: ChatIcon,
    heading: "AI Math Assistant",
    text: "Stuck on a question? Type it in and get a full step-by-step solution worked out clearly. Want more detail? Just ask and it'll explain the why behind each step.",
    bullets: [
      "Step-by-step working for any question",
      "Ask for a deeper explanation any time",
      "Available anytime, no waiting",
    ],
    cta: "Open Assistant",
  },
];
