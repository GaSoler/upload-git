'use client'

import { Camera } from "lucide-react";
import { MediaPicker } from "./media-picker";
import { FormEvent, useState } from "react";
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Cookie from 'js-cookie'

export function NewMemoryForm() {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<DateValueType>({ startDate: new Date(), endDate: new Date() });

  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('user_data')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        createdAt: value?.startDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  const handleValueChange = (newValue: DateValueType): void => {
    setValue(newValue);
  };
  
  return (
    <form
      onSubmit={handleCreateMemory}
      className="flex flex-1 flex-col gap-2"
      id="form"
    >
      <div className="flex items-center gap-8">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-2 p-2.5 text-sm bg-slate-800 text-white/80 border border-slate-600 rounded-lg tracking-wide font-light"
          style={{whiteSpace: 'nowrap'}}
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <Datepicker
          primaryColor="violet"
          value={value}
          onChange={handleValueChange}
          placeholder="Escolha a data"
          asSingle={true}
          useRange={false}
        />
      </div>

      <MediaPicker />

      <textarea
        name="content" 
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-slate-100 placeholder:text-slate-400 focus:ring-0"
        placeholder="Adicione fotos, vídeos e relatos sobre essa nossa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        disabled={loading}
        // className={`inline-block self-end rounded-full bg-blue-300 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-blue-400 ${loading && 'cursor-not-allowed'}`}
        className={`relative py-3 px-6 rounded-lg border-none cursor-pointer text-slate-100 bg-violet-500 custom-animation-button ${loading && 'cursor-not-allowed'}`}
      >
        Salvar
      </button>
    </form>
  )
}