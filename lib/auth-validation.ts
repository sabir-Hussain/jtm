"use server";

import { prisma } from "./prisma";

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!user;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
}

