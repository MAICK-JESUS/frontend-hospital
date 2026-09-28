import initialUsers from "../data/users.json";
import { storageService } from "../services/storageService";
import type { LoginCredentials, User, UserRecord } from "../types/auth";

const SESSION_KEY = "app_session";
const users = initialUsers as UserRecord[];

export const authRepository = {
  login(credentials: LoginCredentials): User | null {
    const normalizedEmail = credentials.email.trim().toLowerCase();

    const foundUser = users.find(
      (user) =>
        user.role === "ADMIN" &&
        user.email.toLowerCase() === normalizedEmail &&
        user.password === credentials.password
    );

    if (!foundUser) return null;

    const sessionUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      carnet: foundUser.carnet,
      email: foundUser.email,
      role: foundUser.role,
    };

    storageService.set<User>(SESSION_KEY, sessionUser);
    return sessionUser;
  },

  logout(): void {
    storageService.remove(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    return storageService.get<User>(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "ADMIN";
  },
};
