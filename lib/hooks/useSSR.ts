import { useEffect, useState } from 'react'

export const useSSR = () => {
  const [ssr, setSsr] = useState<boolean>(true)

  useEffect(() => {
    setSsr(false)
  }, [])

  return ssr
}

export default useSSR
