import {useEffect, useState} from 'react'
import useFetch from './useFetch'
import { useSearchParams } from 'react-router-dom'
import { APIResponsePagination, User } from '@/lib/types'


function useUserListState() {
  const { $fetch } = useFetch()
  const [users, setUsers] = useState<APIResponsePagination<User[]>>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
    page: searchParams.get('page') || undefined,
    search: searchParams.get('search') || undefined,
    sort: searchParams.get('sort') || undefined,
    order: searchParams.get('order') || undefined,
    per_page: searchParams.get('per_page') || undefined,
  }) // page, search, sort, order

  const fetchUsers = async () => {
    setLoading(true)
      try {
        const res = await $fetch<APIResponsePagination<User[]>>('/user', {
          method: 'GET',
          params: searchParams,
        })
        setUsers(res.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response.data.message)
      } finally {
        setLoading(false)
      }
  }

  // refetch users when query changes
  useEffect(() => {
    fetchUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // sync query with searchParams
  useEffect(() => {
    const filteredQuery = Object.keys(query)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    .filter((key) => query[key] !== undefined)
    .reduce((obj, key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      obj[key] = query[key]
      return obj
    }, {})

    // debounce for 500ms, only do when query.search changes
    if(query.search !== searchParams.get('search')) {
      const timer = setTimeout(() => {
        setSearchParams(filteredQuery)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setSearchParams(filteredQuery)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  function handleSortOrder(key: string){
    const order = query.order === 'asc' ? 'desc' : 'asc'
    setQuery({
      ...query,
      sort: key,
      order,
    })
  }


  return {
    query,
    setQuery,
    users,
    loading,
    error,
    handleSortOrder,
  }
}

export default useUserListState