import "dotenv/config";

import connectDB from "../lib/db/mongoose";
import User from "../lib/modules/users/model";
import { EmployeeProfile } from "../lib/modules/payroll/employeeProfile.model";

async function run() {
  await connectDB();

  const employees = await User.find({ role: "empleado" });

  for (const user of employees) {
    const existingProfile = await EmployeeProfile.findOne({
      userId: user._id,
    });

    if (!existingProfile) {
      await EmployeeProfile.create({
        userId: user._id,
        dailyRate: 0,
      });

      console.log(`✔ Profile creado para ${user.email}`);
    }
  }

  console.log("Sincronización completa.");
  process.exit(0);
}

run();
