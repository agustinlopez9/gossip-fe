import type { ProfileData } from "./ProfileHeader";

export const MOCK_PROFILES: Record<string, ProfileData> = {
  johnwick: {
    name: "John Wick",
    username: "johnwick",
    bio: "I'm thinking I'm back. Dog lover. Consultant.",
    avatar: "/avatar.png",
    coverImage: "",
    followersCount: 1847,
    followingCount: 312,
    postsCount: 94,
    isFollowing: false,
    joinedDate: "March 2022",
  },
};

export const MOCK_DEFAULT_PROFILE: ProfileData = {
  name: "Unknown User",
  username: "unknown",
  bio: "",
  avatar: "",
  coverImage: "",
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  isFollowing: false,
  joinedDate: "2025",
};
