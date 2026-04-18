import { useState } from "react";
import { FaCalendarDays, FaUserCheck, FaUserPlus } from "react-icons/fa6";
import Avatar from "components/ui/Avatar";
import Button from "components/ui/Button";

export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  coverImage: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
  joinedDate: string;
}


interface ProfileHeaderProps {
  profile: ProfileData;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const [following, setFollowing] = useState(profile.isFollowing);

  return (
    <div>
      <div className="relative h-36 overflow-hidden">
        {profile.coverImage ? (
          <img src={profile.coverImage} alt="Cover" className="h-full w-full object-cover" />
        ) : (
          <div className="from-brand-900 via-brand-700 to-brand-800 h-full w-full bg-linear-to-br" />
        )}
        <div className="from-surface-base/50 absolute inset-0 bg-linear-to-t to-transparent" />
      </div>

      <div className="relative px-4 pb-4">
        <div className="flex items-start justify-between">
          <div className="ring-surface-base relative -mt-12 rounded-full ring-4">
            <Avatar src={profile.avatar} alt={profile.name} size="large" className="h-20 w-20" />
          </div>

          <div className="mt-3">
            <Button
              variant={following ? "outlined" : "primary"}
              size="small"
              icon={following ? <FaUserCheck size={12} /> : <FaUserPlus size={12} />}
              iconPosition="start"
              onClick={() => setFollowing(!following)}
            >
              {following ? "Following" : "Follow"}
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <h1 className="font-display text-primary text-xl leading-tight font-bold">
            {profile.name}
          </h1>
          <p className="text-tertiary mt-0.5 text-sm">@{profile.username}</p>
        </div>

        {profile.bio && (
          <p className="text-secondary mt-3 text-sm leading-relaxed">{profile.bio}</p>
        )}

        <div className="mt-3 flex items-center gap-1.5">
          <FaCalendarDays size={13} className="text-tertiary" />
          <span className="text-tertiary text-sm">Joined {profile.joinedDate}</span>
        </div>

        <div className="mt-3 flex gap-5">
          <button className="group text-sm">
            <span className="text-primary font-bold">
              {profile.followingCount.toLocaleString()}
            </span>{" "}
            <span className="text-tertiary transition-colors duration-150 group-hover:underline">
              Following
            </span>
          </button>
          <button className="group text-sm">
            <span className="text-primary font-bold">
              {profile.followersCount.toLocaleString()}
            </span>{" "}
            <span className="text-tertiary transition-colors duration-150 group-hover:underline">
              Followers
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
