import type { AppProps } from 'next/app';
import 'react-calendar/dist/Calendar.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return <Component {...pageProps} />
}

export default MyApp;