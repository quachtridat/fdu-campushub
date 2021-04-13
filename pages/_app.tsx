import type { AppProps } from 'next/app'
// import 'tailwindcss/tailwind.css'
import 'react-calendar/dist/Calendar.css'
import '@/styles/globals.css'

function FduCampusNextJsApp({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return <Component {...pageProps} />
}

export default FduCampusNextJsApp
