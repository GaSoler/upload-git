import { api } from "@/lib/api"
import Cookie from 'js-cookie'
const token = Cookie.get('user_data')

export interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export async function deleteMemory(id: string){
  try {
    const response = await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status === 200) {
      return "Memory deleted successfully";
    } else {
      throw new Error("Failed to delete memory");
    }
  } catch (error) {
    throw new Error("An error occurred while deleting memory");
  }
}