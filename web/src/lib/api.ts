import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://upload-git.vercel.app'
})