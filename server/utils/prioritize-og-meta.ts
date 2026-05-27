const OG_META_RE =
  /<meta\s[^>]*(?:property=["']og:|name=["'](?:twitter:|description|application-name|robots))[^>]*>/gi
const CANONICAL_LINK_RE = /<link\s[^>]*rel=["']canonical["'][^>]*>/gi

function prioritizeOgMetaInHtml(html: string): string {
  const ogTags: string[] = []

  let cleaned = html.replace(OG_META_RE, (tag) => {
    ogTags.push(tag)
    return ''
  })

  cleaned = cleaned.replace(CANONICAL_LINK_RE, (tag) => {
    ogTags.push(tag)
    return ''
  })

  if (!ogTags.length) {
    return html
  }

  const headOpen = cleaned.indexOf('<head>')
  if (headOpen === -1) {
    return html
  }

  const insertAt = cleaned.indexOf('>', headOpen) + 1
  return `${cleaned.slice(0, insertAt)}${ogTags.join('')}${cleaned.slice(insertAt)}`
}

export function prioritizeOgMetaInHead(headChunks: string[]) {
  if (!headChunks.length) {
    return
  }

  const updated = prioritizeOgMetaInHtml(headChunks.join(''))
  headChunks.length = 0
  headChunks.push(updated)
}

export function patchHtmlResponseBody(body: string): string {
  if (!body.includes('<head>') || !body.includes('property="og:')) {
    return body
  }

  return prioritizeOgMetaInHtml(body)
}
