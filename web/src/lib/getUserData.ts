import Cookie from 'js-cookie'
import { jwtDecode } from "jwt-decode";

export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface UserFunction {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): User | null {
  const authenticate = Cookie.get('auth_token')

  if (!authenticate) {
    throw new Error('Unauthenticated')
  }

  const loggedUser = Cookie.get('user_data');
  if (loggedUser !== undefined) {
    const user_cookie: UserFunction = jwtDecode(loggedUser);
    const user: User = {
      id: user_cookie.sub,
      name: user_cookie.name,
      avatarUrl: user_cookie.avatarUrl
    };

    return user;
  }

  return null
}