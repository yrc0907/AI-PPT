"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export async function registerUser(values: z.infer<typeof registerSchema>) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword, // I need to add a password column to the users table
    });

    return { success: "User created successfully!" };

  } catch (error: any) {
    if (error.code === '23505') { // unique constraint violation
      return { error: "Email already in use." };
    }
    return { error: "An error occurred." };
  }
} 