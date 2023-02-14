import { memo } from 'react'
import Link, { LinkProps } from 'next/link'

function resolve(from: string, to: string) {
  const resolvedUrl = new URL(to, new URL(from, 'resolve:/'))
  if (resolvedUrl.protocol === 'resolve:') {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl
    return pathname + search + hash
  }
  return resolvedUrl.toString()
}

export interface LinkIPSFProps extends LinkProps {
  href: string
  as?: string
  children?: React.ReactNode
  className?: string
  target?: string
  rel?: string
}

const LinkIPFS = ({ href, as, ...rest }: LinkIPSFProps) => {
  let baseAsHref = (as ?? href) as string
  console.log('LinkIPFS baseAsHref', baseAsHref)

  // If our link is relative, we can assume it's an internal link and use `next/link`
  if (baseAsHref.startsWith('/') && typeof document !== 'undefined') {
    const { pathname } = document.location
    const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
    const ipfsMatch = ipfsRegex.exec(pathname)
    if (ipfsMatch) {
      const slashRegex = new RegExp('/$')
      const ipfsPathname = ipfsMatch[0].replace(slashRegex, '')
      const newAs = `${ipfsPathname}${baseAsHref}`

      console.log('internal link newAs', baseAsHref, href, newAs)
      return <Link {...rest} href={href} as={newAs} />
    }

    console.log('internal link', baseAsHref)
    return <Link {...rest} href={href} as={baseAsHref} />
  }

  // Treat urls that aren't http protocols as "normal" links. This is useful for things like mailto: or tel:
  if (!baseAsHref.startsWith('http')) {
    return <a href={baseAsHref} {...rest} />
  }

  // Otherwise, this is an external link that we can add on good security defaults for
  return (
    <a
      data-link-external
      href={baseAsHref}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...rest}
    />
  )
}

export default memo(LinkIPFS)
