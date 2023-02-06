import Link, { LinkProps } from 'next/link'
import { useMemo } from 'react'

export type IPFSLinkProps = LinkProps & {
  children?: React.ReactNode
  className?: string
}

// based on https://github.com/Velenir/nextjs-ipfs-example#deploying-nextjs-site-to-ipfs
const IPFSLink = ({ href, as, ...rest }: IPFSLinkProps) => {
  const newAs = useMemo(() => {
    let baseURIAs = (as || href) as string

    if (baseURIAs.startsWith('/')) {
      const { pathname } = window.location
      const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
      const ipfsMatch = ipfsRegex.exec(pathname)

      if (ipfsMatch) {
        baseURIAs = `${ipfsMatch[0]}/${baseURIAs}`
        // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="/ipfs/Qm<hash>/about">About</a>
      }
    }

    return baseURIAs
  }, [as, href])

  return <Link {...rest} href={href} as={newAs} />
}

export default IPFSLink
