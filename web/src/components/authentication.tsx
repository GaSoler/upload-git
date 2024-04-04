'use client'
import { api } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Cookie from 'js-cookie'

export function Authentication() {
  const [code, setCode] = useState("")

  async function handleAuthenticate() {
    try {
      const response = await api.post('/authenticate', {
        code,
      })
      console.log(response)
      if (response.status == 200) {
        const { token } = response.data
        Cookie.set('auth_token', token, { expires: 7, path: '/' })
        window.location.href = `/`
      }
    } catch (error) {
      console.error('Erro ao fazer a autenticação', error)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  
  return (
    <div className="mx-auto max-w-[420px] space-y-5 text-center lg:mx-0 lg:text-left">
      <div className="space-y-1">
        <h1 className="text-5xl font-bold leading-tight">Para acessar digite nosso segredo!</h1>
        <p className="text-lg leading-relaxed">dica: é uma data importante</p>
      </div>
      {/* <div className="flex bg-slate-800 rounded-lg p-4 gap-2">
        <input
          type="text"
          className="border border-gray-50 bg-gray-900 rounded-lg w-full"
          value={code}
          onChange={handleInputChange}
        />
        <button
          className="cursor-pointer flex items-center px-4 py-2 gap-2 bg-violet-600 rounded-lg hover:brightness-110"
          onClick={handleAuthenticate}
        >
          Enviar
          <ArrowRight size={16} />
        </button>
      </div> */}
      <div className="flex items-center box-border border border-transparent rounded-lg focus-within:border-violet-500">
        <input 
          type="text" 
          placeholder="Digite aqui!"
          value={code}
          onChange={handleInputChange}
          className="bg-transparent border border-violet-500 rounded-lg rounded-r-none w-full h-12 px-4 text-sm text-slate-100 placeholder:text-sm placeholder:text-slate-500"
        />
        <button 
          onClick={handleAuthenticate}
          className="flex items-center bg-violet-500 border-none rounded-lg rounded-l-none h-12 gap-2 px-4 text-sm text-slate-100 cursor-pointer hover:brightness-110"
        >
          Enviar
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}