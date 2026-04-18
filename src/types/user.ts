export interface User {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  coverImage?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
