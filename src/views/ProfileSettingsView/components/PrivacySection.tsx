import { useState } from "react";
import { FaLock } from "react-icons/fa6";
import Toggle from "components/ui/Toggle";
import SettingsSection from "./SettingsSection";
import type { ToggleSetting } from "./interfaces";

const PRIVACY_SETTINGS: ToggleSetting[] = [
  {
    id: "privateAccount",
    label: "Private account",
    description: "Only approved followers can see your posts",
  },
  {
    id: "hideFromSearch",
    label: "Hide from search",
    description: "Prevent your profile from appearing in search results",
  },
];

const PrivacySection = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    privateAccount: false,
    hideFromSearch: false,
  });

  return (
    <SettingsSection title="Privacy" icon={<FaLock size={14} />}>
      <div className="space-y-5">
        {PRIVACY_SETTINGS.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary">{setting.label}</p>
              <p className="text-xs mt-0.5 text-tertiary">{setting.description}</p>
            </div>
            <Toggle
              options={[
                { label: "Off", value: "false" },
                { label: "On", value: "true" },
              ]}
              defaultValue={settings[setting.id] ? "true" : "false"}
              onChange={(val) =>
                setSettings((prev) => ({ ...prev, [setting.id]: val === "true" }))
              }
            />
          </div>
        ))}
      </div>
    </SettingsSection>
  );
};

export default PrivacySection;
