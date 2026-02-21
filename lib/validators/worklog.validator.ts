import { z } from "zod";
import { objectIdSchema, dateSchema } from "./common";

export const createWorkLogSchema = z.object({
  employeeId: objectIdSchema,
  projectId: objectIdSchema,
  date: dateSchema,
});

export const updateWorkLogSchema = z.object({
  employeeId: objectIdSchema.optional(),
  projectId: objectIdSchema.optional(),
  date: dateSchema.optional(),
});
