import Layout from '@/components/Layout'
import '../styles/globals.css'
import {AithshProvider} from '@/components/AithshState'

function MyApp({ Component, pageProps }) {
  return (
        <Layout>
          <AithshProvider>
            <Component {...pageProps} />
          </AithshProvider>
        </Layout>)
}

export default MyApp
