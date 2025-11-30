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
  if (!user || user.password !== password) return null;
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


// ----------------------
// FIXED persistSession()
// ----------------------
export const persistSession = async (session: AuthSession) => {
  sessions.set(session.token, session);

  const cookieStore = await cookies(); // FIX: await needed

  cookieStore.set({
    name: SESSION_COOKIE,
    value: session.token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_HOURS * 60 * 60,
  });
};


// ----------------------
// FIX getSession()
// ----------------------
export const getSession = async (): Promise<AuthSession | null> => {
  const cookieStore = await cookies(); // FIX
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const session = sessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    cookieStore.delete(SESSION_COOKIE);
    sessions.delete(token);
    return null;
  }

  return session;
};


// ----------------------
// FIX destroySession()
// ----------------------
export const destroySession = async () => {
  const cookieStore = await cookies(); // FIX
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    sessions.delete(token);
  }

  cookieStore.delete(SESSION_COOKIE);
};


export const createSession = async (user: User) => {
  const session = buildSessionPayload(user);
  await persistSession(session); // FIX: await required
  return session;
};
