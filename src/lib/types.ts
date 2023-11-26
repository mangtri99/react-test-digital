export interface APIResponsePagination<T> {
  data: T
  links: Links
  meta: Meta
}
export interface Links {
  first: string
  last: string
  prev: null
  next: null
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: MetaLink[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface MetaLink {
  url: null | string
  label: string
  active: boolean
}

export interface User {
  id: number
  name: string
  email: string
  created_at: string
}
