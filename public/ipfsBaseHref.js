;(() => {
  const defaultBaseHref = '/'
  const { pathname } = window.location
  const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
  const ipfsMatch = ipfsRegex.exec(pathname)
  const base = document.createElement('base')
  base.href = ipfsMatch ? ipfsMatch[0] : defaultBaseHref
  document.head.append(base)
})()
