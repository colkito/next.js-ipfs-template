import { useMemo } from 'react'
import Link, { LinkProps } from 'next/link'

export type IPFSLinkProps = LinkProps & {
  children?: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

// based on https://github.com/Velenir/nextjs-ipfs-example#deploying-nextjs-site-to-ipfs
const IPFSLink = ({ href, as, ...rest }: IPFSLinkProps) => {
  const newAs = useMemo(() => {
    let baseAsHref = (as ?? href) as string

    // make absolute url relative when displayed in url bar
    if (baseAsHref.startsWith('/')) {
      //  for static html compilation
      baseAsHref = '.' + href
      // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>

      // document is unavailable when compiling on the server
      // if (typeof document !== 'undefined') {
      //   const { pathname } = document.location

      //   console.log('pathname', pathname)
      //   console.log('baseURI', document.baseURI)

      //   // const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
      //   // const ipfsMatch = ipfsRegex.exec(pathname)

      //   // if (ipfsMatch) {
      //   //   const slashRegex = new RegExp('/$')
      //   //   const ipfsPathname = ipfsMatch[0].replace(slashRegex, '')
      //   //   return `${ipfsPathname}${baseAsHref}`
      //   //   // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="/ipfs/Qm<hash>/about">About</a>
      //   // }
      // }

    }

    return baseAsHref
  }, [as, href])

  return <Link {...rest} href={href} as={newAs} />
}

export default IPFSLink
