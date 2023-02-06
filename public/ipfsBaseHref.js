;(() => {
  const { pathname } = window.location
  const ipfsRegex = new RegExp('^/ipfs/(Qm[a-zA-Z0-9]{44})')
  const ipfsMatch = ipfsRegex.exec(pathname)
  const base = document.createElement('base')
  base.href = ipfsMatch ? ipfsMatch[0] : '/'
  document.head.append(base)
  console.log('This module has been auto-called!', base.href)
})()
