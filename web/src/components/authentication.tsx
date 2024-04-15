'use client'
import { api } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { ChangeEvent, useState } from "react";
import Cookie from 'js-cookie'
import { Loader } from "./loader";

export function Authentication() {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAuthenticate() {
    try {
      setLoading(true);
      const response = await api.post('/authenticate', {
        code,
      })
      if (response.status == 200) {
        const { token } = response.data
        Cookie.set('auth_token', token, { expires: 7, path: '/' })
        window.location.href = `/`
      }
    } catch (error) {
      setError("Erro ao autenticar. Verifique o código e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  
  return (
    <div className="mx-auto max-w-[420px] space-y-5 text-center lg:mx-0 lg:text-left">
      <div className="space-y-1">
        <h1 className="text-5xl font-bold leading-tight">Para acessar digite nosso segredo!</h1>
        <p className="text-lg leading-relaxed text-slate-400">dica: é uma data importante</p>
      </div>
      {loading && <div><Loader /></div>}
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
      {error && <span className="text-red-400 text-sm">{error}</span>}
    </div>
  )
}
