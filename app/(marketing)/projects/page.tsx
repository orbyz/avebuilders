import connectDB from "@/lib/db/mongoose";
import Project from "@/lib/modules/projects/model";
import ProjectsHero from "@/components/marketing/projects/ProjectsHero";
import ProjectsIntro from "@/components/marketing/projects/ProjectsIntro";
import ProjectsGrid from "@/components/marketing/projects/ProjectsGrid";
import ProjectsCTA from "@/components/marketing/projects/ProjectsCTA";

export default async function ProjectsPage() {
  await connectDB();

  const projects = await Project.find({
    featured: true,
  })
    .sort({ createdAt: -1 })
    .lean();

  const data = projects.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return (
    <>
      <ProjectsHero />
      <ProjectsIntro />
      <ProjectsGrid projects={data} />
      <ProjectsCTA />
    </>
  );
}
