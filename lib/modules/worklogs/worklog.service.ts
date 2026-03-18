import { WorkLog } from "@/lib/modules/payroll/worklog.model";

export async function getWeekWorklogs(employeeId: string, weekStart: Date) {
  const start = new Date(weekStart);
  start.setHours(0, 0, 0, 0);

  console.log("SERVICE INPUT:", {
    employeeId,
    weekStart,
  });
  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  const logs = await WorkLog.find({
    employee: employeeId,
    weekStart: {
      $gte: start,
      $lt: end,
    },
  })
    .populate("employee", "name")
    .populate("project", "name")
    .sort({ date: 1 })
    .lean();

  console.log("LOGS FOUND:", logs.length);

  if (!logs.length) {
    throw new Error("Semana no encontrada");
  }

  const days = logs.map((log: any) => ({
    id: log._id,
    date: log.date,
    rate: log.dailyRateSnapshot,
    status: log.status,
  }));

  const total = logs.reduce(
    (sum: number, log: any) => sum + log.dailyRateSnapshot,
    0,
  );

  return {
    employee: logs[0].employee,
    project: logs[0].project,
    weekStart: start,
    days,
    total,
  };
}
