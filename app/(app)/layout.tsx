import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AveBuilders Profesionales",
  description: "Reformas de calidad",
};

export default function ProfesionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
