import { Planet } from "../types/planet";

export const planets: Planet[] = [
  {
    id: 1,
    name: "Moon",
    icon: "🌙",
    duration: 15,
    description: "Short focus session for quick learning.",
    apiId: "lune",
  },
  {
    id: 2,
    name: "Mars",
    icon: "🔴",
    duration: 25,
    description: "Standard focus session for studying.",
    apiId: "mars",
  },
  {
    id: 3,
    name: "Jupiter",
    icon: "🪐",
    duration: 45,
    description: "Long focus session for deep learning.",
    apiId: "jupiter",
  },
];
