import {
  Building2,
  Calendar,
  CheckSquare,
  FolderOpen,
  House,
  LucideIcon,
  Users,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;

  /**
   * Megjelenjen-e a mobil Bottom Navigation-ben.
   */
  mobile?: boolean;
};

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
    mobile: true,
  },
  {
    label: "Ügyek",
    href: "/cases",
    icon: FolderOpen,
  },
  {
    label: "Ügyfelek",
    href: "/clients",
    icon: Users,
    mobile: true,
  },
  {
    label: "Ingatlanok",
    href: "/properties",
    icon: Building2,
    mobile: true,
  },
  {
    label: "Feladatok",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Naptár",
    href: "/calendar",
    icon: Calendar,
    mobile: true,
  },
];