"use server";

import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SIGNUP_NAME_COOKIE = "signup_name";

export async function setSignupName(name: string) {
  const cookieStore = await cookies();
  cookieStore.set(SIGNUP_NAME_COOKIE, name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 hour
  });
}

export async function getAndClearSignupName(): Promise<string | null> {
  const cookieStore = await cookies();
  const name = cookieStore.get(SIGNUP_NAME_COOKIE)?.value || null;
  if (name) {
    cookieStore.delete(SIGNUP_NAME_COOKIE);
  }
  return name;
}

export async function updateUserWithSignupName(email: string, name: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && !user.name && name) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name },
      });
    }
  } catch (error) {
    console.error("Error updating user name:", error);
  }
}

