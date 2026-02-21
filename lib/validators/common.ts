import { z } from "zod";
import mongoose from "mongoose";

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "ID inválido.",
  });

export const dateSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: "Fecha inválida." });
