import { z } from "zod";

export const createEmployeeSchema = z.object({
  fullName: z.string().min(2),
  role: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  dailyRate: z.number().positive(),
  hireDate: z.string().optional(),
  notes: z.string().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();
