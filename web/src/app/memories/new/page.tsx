import { NewMemoryForm } from "@/components/new-memory-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-slate-100 hover:text-slate-300"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <NewMemoryForm />
    </div>
  )
}