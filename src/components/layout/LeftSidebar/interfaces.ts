import type { ReactNode } from "react";

export interface NavItem {
  icon: ReactNode;
  label: string;
  to: string;
}
