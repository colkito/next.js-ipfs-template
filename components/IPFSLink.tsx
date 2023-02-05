import Link, { LinkProps } from 'next/link'
import { useMemo } from 'react'

function resolve(from: string, to: string) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'))
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl
    return pathname + search + hash
  }
  return resolvedUrl.toString()
}

export type IPFSLinkProps = LinkProps & {
  children?: React.ReactNode
  className?: string
}

// based on https://github.com/Velenir/nextjs-ipfs-example#deploying-nextjs-site-to-ipfs
const IPFSLink = ({ href, as, ...rest }: IPFSLinkProps) => {
  const newAs = useMemo(() => {
    let baseURI_as = (as || href) as string

    // make absolute url relative when displayed in url bar
    if (baseURI_as.startsWith('/')) {
      //  for static html compilation
      baseURI_as = '.' + href
      // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>

      // document is unavailable when compiling on the server
      if (typeof document !== 'undefined') {
        baseURI_as = resolve(document.baseURI, baseURI_as)
        // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
      }
    }

    return baseURI_as
  }, [as, href])

  return <Link {...rest} href={href} as={newAs} />
}

export default IPFSLink
