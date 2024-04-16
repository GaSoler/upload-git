'use client'
import { deleteMemory } from "@/utils/memoriesUtils";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  memoryId: string;
}

export function DeleteButton({ memoryId }: DeleteButtonProps){
  const handleDelete = async () => {
    try {
      const result = await deleteMemory(memoryId);
      alert(result);
      window.location.href = '/'
    } catch (error) {
      alert("Failed to delete memory"); // Exibir mensagem de erro
    }
  }
  return (
    <button onClick={handleDelete} className="flex items-center justify-center">
      <Trash2 className="w-4 h-4 hover:text-red-500" />
    </button>
  )
}