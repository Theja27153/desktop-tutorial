import crypto from "crypto";
import { cookies } from "next/headers";
import { users } from "@/data/users";
import { AuthSession, User } from "@/types";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
const SESSION_DURATION_HOURS = 8;

const sessions = new Map<string, AuthSession>();

const SESSION_COOKIE = SESSION_COOKIE_NAME;

export const findUserByEmail = (email: string) =>
  users.find((user) => user.email === email);

export const verifyCredentials = (email: string, password: string) => {
  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return null;
  }

  return user;
};

const buildSessionPayload = (user: User): AuthSession => ({
  token: crypto.randomUUID(),
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
  },
  expiresAt: Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000,
});

export const persistSession = (session: AuthSession) => {
  sessions.set(session.token, session);
  cookies().set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
  });
};

export const getSession = (): AuthSession | null => {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = sessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    if (token) {
      cookies().delete(SESSION_COOKIE);
      sessions.delete(token);
    }
    return null;
  }

  return session;
};

export const destroySession = () => {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    sessions.delete(token);
  }
  cookies().delete(SESSION_COOKIE);
};

export const createSession = (user: User) => {
  const session = buildSessionPayload(user);
  persistSession(session);
  return session;
};
