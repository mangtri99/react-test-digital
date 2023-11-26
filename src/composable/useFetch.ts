import axios from 'axios'

function useFetch() {
  // create axios instance
  const $fetch = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL as string,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return {
    $fetch,
  }
}

export default useFetch