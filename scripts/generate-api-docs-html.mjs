/**
 * Статический Swagger UI (HTML + встроенная спека) в `.api-docs-html/`.
 * Папка в .gitignore — открывайте auth.html / invest.html в браузере локально.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, '.api-docs-html')
const SWAGGER_UI = '5.31.0'

function buildHtml(title, spec) {
  const specJson = JSON.stringify(spec)
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@${SWAGGER_UI}/swagger-ui.css" crossorigin />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@${SWAGGER_UI}/swagger-ui-bundle.js" crossorigin></script>
  <script>
    window.onload = function () {
      var spec = ${specJson};
      window.ui = SwaggerUIBundle({
        dom_id: "#swagger-ui",
        spec: spec,
        deepLinking: true,
        docExpansion: "list",
        filter: true,
        tryItOutEnabled: true,
      });
    };
  </script>
</body>
</html>
`
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

mkdirSync(outDir, { recursive: true })

const auth = JSON.parse(
  readFileSync(join(root, 'openapi', 'auth.json'), 'utf8')
)
const invest = JSON.parse(
  readFileSync(join(root, 'openapi', 'invest.json'), 'utf8')
)

writeFileSync(
  join(outDir, 'auth.html'),
  buildHtml('OpenAPI — Auth', auth),
  'utf8'
)
writeFileSync(
  join(outDir, 'invest.html'),
  buildHtml('OpenAPI — Investment', invest),
  'utf8'
)

console.log(`generate-api-docs-html: wrote ${join(outDir, 'auth.html')}`)
console.log(`generate-api-docs-html: wrote ${join(outDir, 'invest.html')}`)
