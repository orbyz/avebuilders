import { z } from "zod";
import { objectIdSchema, dateSchema } from "./common";

export const createAdvanceSchema = z.object({
  employeeId: objectIdSchema,
  amount: z.number().positive(),
  date: dateSchema.optional(),
  note: z.string().optional(),
});

export const updateAdvanceSchema = z.object({
  amount: z.number().positive().optional(),
  date: dateSchema.optional(),
  note: z.string().optional(),
});
