import crypto from 'crypto'
import { HtmlProps } from 'next/dist/shared/lib/html-context'
import { Html, Head, Main, NextScript } from 'next/document'

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return `'sha256-${hash.digest('base64')}'`
}

export default function Document(ctx: HtmlProps) {
  const cspContent = `default-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'unsafe-inline' 'unsafe-eval' 'self' ${cspHashOf(
    NextScript.getInlineScriptSource(ctx)
  )}`

  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
