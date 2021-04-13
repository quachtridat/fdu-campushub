import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isSignedIn } from '@/lib/signIn'
import MainPage from './main'
import LoginPage from './login'

const IndexPage: NextPage = () => {
  const router = useRouter()
  const [toMainPage, setToMainPage] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isSignedIn()) {
        setToMainPage(false)
        router.push('/login')
      } else {
        setToMainPage(true)
        router.push('/main')
      }
    } else {
      setToMainPage(true);
      router.push('/main')
    }
  }, []);
  return toMainPage ? <MainPage /> : <LoginPage />;
}

export default IndexPage
