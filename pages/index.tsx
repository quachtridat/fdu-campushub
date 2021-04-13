import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { isSignedIn } from '@/lib/signIn'
import MainPage from './main'
import LoginPage from './login'

const IndexPage: NextPage = () => {
  const router = useRouter()
  if (typeof window !== 'undefined') {
    if (!isSignedIn()) {
      router.push('/login')
      return <LoginPage />
    } else return <MainPage />
  }
  return <></>
}

export default IndexPage
