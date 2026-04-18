import AccountSection from "./components/AccountSection";
import ProfileSection from "./components/ProfileSection";
import PrivacySection from "./components/PrivacySection";
import NotificationsSection from "./components/NotificationsSection";

const ProfileSettingsView = () => (
  <div>
    <div className="sticky top-0 z-10 px-4 py-3 backdrop-blur-md bg-surface-base/85 border-b border-border-subtle">
      <h2 className="font-display font-bold text-lg text-primary">Settings</h2>
    </div>

    <div className="px-4 py-6 space-y-5">
      <AccountSection />
      <ProfileSection />
      <PrivacySection />
      <NotificationsSection />
    </div>
  </div>
);

export default ProfileSettingsView;
