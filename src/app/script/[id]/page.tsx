import { scripts } from "@/data";
import ScriptClient from "./ScriptClient";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function ScriptPage({ params }: Props) {
  const { id } = await params;
  const script = scripts.find((s) => s.id === id);
  if (!script) {
    notFound();
  }
  return <ScriptClient script={script!} />;
}
