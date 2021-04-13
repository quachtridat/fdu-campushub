import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isSignedIn } from '@/lib/signIn'

const IndexPage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isSignedIn()) {
        router.push('/login')
      } else {
        router.push('/main')
      }
    } else {
      router.push('/main')
    }
  }, [])
  return <></>
}

export default IndexPage
