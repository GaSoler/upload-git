import { api } from "@/lib/api"
import Cookie from 'js-cookie'

export interface User {
  id: string
  name: string
  avatarUrl: string
  login: string
}

export async function getUsers(){
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getUser({ id }: User){
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createUser({ name, login }: User){
  try {
    const response = await api.post('/users', {
      name,
      login,
      avatarUrl: ''
    })
    if (response.status == 200) {
      const { token } = response.data
      Cookie.set('auth_token', token, { expires: 7, path: '/' })
      window.location.href = `/`
    }
  } catch (error) {
    throw error
  }
}

export async function alterUser({name, login, avatarUrl, id}: User){
  try {
    const response = await api.put(`/users/${id}`, {
      name,
      login,
      avatarUrl,
    })
  } catch (error) {
    throw error
  }
}

export async function deleteUser({id}: User){
  try {
    const response = await api.delete(`/users/${id}`)
  } catch (error) {
    throw error
  }
}