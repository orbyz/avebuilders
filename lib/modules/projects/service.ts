import Project from "./model";

export async function addTimelineEvent(
  projectId: string,
  eventData: {
    type: string;
    message: string;
    meta?: any;
  },
  session: any,
) {
  return Project.updateOne(
    { _id: projectId },
    {
      $push: {
        timeline: {
          type: eventData.type,
          message: eventData.message,
          meta: eventData.meta || null,
          createdBy: {
            userId: session.user.id,
            name: session.user.name,
            role: session.user.role,
          },
          createdAt: new Date(),
        },
      },
    },
  );
}
