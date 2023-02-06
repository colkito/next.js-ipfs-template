import Script from 'next/script'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="ipfs-base-href"
        dangerouslySetInnerHTML={{
          __html: `(function () {
    const { pathname } = window.location
    const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
    const ipfsMatch = ipfsRegex.exec(pathname)
    const base = document.createElement('base')
    base.href = ipfsMatch ? ipfsMatch[0] : '/'
    document.head.append(base)
          })()`,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
