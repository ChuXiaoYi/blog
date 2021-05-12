import {request} from "umi";

export function getLoginGithub(params?: any) {
  return request('/api/user/login', {
    method: 'GET',
    params
  })
}

export function postLoginGithub(data: any) {
  return request('/api/user/login', {
    method: 'POST',
    data
  })
}

export function logout() {
  return request('/api/user/logout', {
    method: 'GET'
  })
}
