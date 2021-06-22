import { User, UserType } from "./types";

export function isDependabot(user: User): boolean {
  return user.login.startsWith("dependabot") && user.type === UserType.BOT;
}

export function titleNeedsChange(title: string): boolean {
  return (
    title.startsWith("[DevDependency]:") || title.startsWith("[Dependency]:")
  );
}

export function fixTitle(title: string): string {
  return title
    .replace("[DevDependency]:", "[DevDependency]")
    .replace("[Dependency]:", "[Dependency]");
}
