import { z } from "zod";
import { objectIdSchema, dateSchema } from "./common";

export const generatePayrollSchema = z.object({
  employeeId: objectIdSchema,
  start: dateSchema,
  end: dateSchema,
});
