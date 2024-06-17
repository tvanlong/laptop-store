import axios from 'axios'
import { useEffect, useState } from 'react'

const BASE_URL = 'https://esgoo.net/api-tinhthanh'

const useFetchData = (A, B) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}/${A}/${B}.htm`)
        setData(response.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }

    fetchData()
  }, [A, B])

  return { data, loading, error }
}

export default useFetchData
