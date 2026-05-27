import { patchHtmlResponseBody } from '../utils/prioritize-og-meta'

export default defineEventHandler((event) => {
  const originalEnd = event.node.res.end.bind(event.node.res)

  event.node.res.end = function end(
    chunk?: unknown,
    encodingOrCallback?: BufferEncoding | (() => void),
    callback?: () => void
  ) {
    if (typeof chunk === 'string') {
      chunk = patchHtmlResponseBody(chunk)
    } else if (Buffer.isBuffer(chunk)) {
      const text = chunk.toString('utf8')
      if (text.includes('<head>')) {
        chunk = Buffer.from(patchHtmlResponseBody(text), 'utf8')
      }
    }

    return originalEnd(
      chunk as Parameters<typeof originalEnd>[0],
      encodingOrCallback as Parameters<typeof originalEnd>[1],
      callback
    )
  }
})
