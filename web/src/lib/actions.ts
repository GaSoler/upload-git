import { api } from "./api"
// import { cookies } from "next/headers";
import Cookie from 'js-cookie'
import { jwtDecode } from "jwt-decode";

export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface UserBackend {
  sub: string
  name: string
  avatarUrl: string
}

export async function authenticate(code: string) {
  try {
    const response = await api.post('/authenticate', {
      code,
    })
    if (response.status == 200) {
      const { token } = response.data
      // cookies().set({ name: 'auth_token', value: token, httpOnly: false, path: '/', })
      Cookie.set('auth_token', token, { expires: 7, path: '/' })
      window.location.href = `/`
    }
  } catch (error) {
    throw error
  }
}

export async function getUsers(){
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function login(avatarUrl: string, id: string, name: string){
  try {
    const response = await api.post('/login', {
      id,
      name,
      avatar_url: avatarUrl,
    })
    if (response.status == 200) {
      const { token } = response.data
      // cookies().set({ name: 'user_data', value: token, httpOnly: false, path: '/', })
      Cookie.set('user_data', token, { expires: 7, path: '/' })
      window.location.href = `/`
    }
  } catch (error) {
    console.error('Erro ao fazer login', error)
  }
}

export function getUser(): User | null {
  // const token = cookies().get('user_data')?.value
  const token = Cookie.get('user_data')

  if (token) {
    try {
      const user_cookie: UserBackend = jwtDecode(token);
      const user: User = {
        id: user_cookie.sub,
        name: user_cookie.name,
        avatarUrl: user_cookie.avatarUrl,
      };
      return user;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null
    }
  } else {
    return null
  }
}