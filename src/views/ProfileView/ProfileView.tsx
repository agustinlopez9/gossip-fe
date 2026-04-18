import { useState } from "react";
import { useParams } from "react-router";
import PostsList from "views/MainView/PostsList";
import ProfileHeader from "./components/ProfileHeader";
import { MOCK_PROFILES, MOCK_DEFAULT_PROFILE } from "./components/mockData";
import ProfileTabs, { type TabKey } from "./components/ProfileTabs";
import EmptyTabState from "./components/EmptyTabState";

const ProfileView = () => {
  const { username } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>("posts");

  const profile = (username && MOCK_PROFILES[username]) || MOCK_DEFAULT_PROFILE;

  return (
    <div>
      <ProfileHeader profile={profile} />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col mt-2">
        {activeTab === "posts" && <PostsList />}
        {activeTab === "replies" && <EmptyTabState message="No replies yet" />}
        {activeTab === "likes" && <EmptyTabState message="No liked posts yet" />}
      </div>
    </div>
  );
};

export default ProfileView;
