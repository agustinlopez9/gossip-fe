import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const SettingsSection = ({ title, icon, children }: SettingsSectionProps) => (
  <div className="rounded-xl border border-border-subtle overflow-hidden bg-surface-secondary">
    <div className="px-5 py-3 flex items-center gap-3 border-b border-border-subtle">
      <span className="text-brand-500">{icon}</span>
      <h3 className="font-display font-semibold text-base text-primary">{title}</h3>
    </div>
    <div className="px-5 py-5">{children}</div>
  </div>
);

export default SettingsSection;
