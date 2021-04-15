import type { AppProps } from 'next/app'
import ReactModal from 'react-modal'
import 'react-calendar/dist/Calendar.css'
import '@/styles/globals.css'

ReactModal.setAppElement('#__next')

function FduCampusNextJsApp({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return <Component {...pageProps} />
}

export default FduCampusNextJsApp
