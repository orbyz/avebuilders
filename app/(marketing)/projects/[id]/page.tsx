import ProjectPublicDetail from "@/components/marketing/projects/ProjectPublicDetail";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProjectPublicDetail id={id} />;
}
