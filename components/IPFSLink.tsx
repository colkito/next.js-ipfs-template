import Link, { LinkProps } from 'next/link'
import { useMemo } from 'react'

export type IPFSLinkProps = LinkProps & {
  children?: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

// based on https://github.com/Velenir/nextjs-ipfs-example#deploying-nextjs-site-to-ipfs
const IPFSLink = ({ href, as, ...rest }: IPFSLinkProps) => {
  const newAs = useMemo(() => {
    const asHref = (as || href) as string

    if (asHref.startsWith('/') && typeof document !== 'undefined') {
      const { pathname } = document.location
      const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
      const ipfsMatch = ipfsRegex.exec(pathname)

      if (ipfsMatch) {
        const slashRegex = new RegExp('/$')
        const ipfsPathname = ipfsMatch[0].replace(slashRegex, '')
        return `${ipfsPathname}${asHref}`
        // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="/ipfs/Qm<hash>/about">About</a>
      }
    }

    return asHref
  }, [as, href])

  return <Link {...rest} href={newAs} />
}

export default IPFSLink
