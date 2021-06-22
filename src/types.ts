export enum UserType {
  BOT = "Bot",
  USER = "User",
}

export interface User {
  login: string;
  id: number;
  type: UserType;
  // Unused types
  // node_id: string;
  // avatar_url: string;
  // gravatar_ur: string;
  // site_admin: boolean;
}
