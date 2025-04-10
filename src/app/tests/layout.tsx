import { notFound } from "next/navigation";
import { devModeFlag } from "~/server/flags";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dev = await devModeFlag();

  if (!dev) notFound();

  return <div>{children}</div>;
}
