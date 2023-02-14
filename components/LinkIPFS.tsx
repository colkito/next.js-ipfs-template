import { memo } from 'react'
import Link, { LinkProps } from 'next/link'

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
  if (baseAsHref.startsWith('.') || baseAsHref.startsWith('/')) {
    console.log('internal link', baseAsHref)
    return <Link {...rest} href={baseAsHref} as={baseAsHref} />
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
