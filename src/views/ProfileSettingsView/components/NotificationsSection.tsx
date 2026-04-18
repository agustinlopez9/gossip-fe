import { useState } from "react";
import { FaBell } from "react-icons/fa6";
import Toggle from "components/ui/Toggle";
import SettingsSection from "./SettingsSection";
import type { ToggleSetting } from "./interfaces";

const NOTIFICATION_SETTINGS: ToggleSetting[] = [
  {
    id: "emailNotifs",
    label: "Email notifications",
    description: "Receive updates and activity summaries by email",
  },
  {
    id: "pushNotifs",
    label: "Push notifications",
    description: "Get notified instantly in your browser",
  },
  {
    id: "mentionNotifs",
    label: "Mentions",
    description: "Notify me when someone mentions @me",
  },
  {
    id: "followerNotifs",
    label: "New followers",
    description: "Notify me when someone follows me",
  },
];

const NotificationsSection = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    emailNotifs: true,
    pushNotifs: false,
    mentionNotifs: true,
    followerNotifs: true,
  });

  return (
    <SettingsSection title="Notifications" icon={<FaBell size={15} />}>
      <div className="space-y-5">
        {NOTIFICATION_SETTINGS.map((setting) => (
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

export default NotificationsSection;
