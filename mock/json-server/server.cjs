const jsonServer = require('json-server')

const db = require('./db.json')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const PORT = Number(process.env.MOCK_API_PORT || 3333)

server.use(middlewares)
server.use(jsonServer.bodyParser)

function clone(key) {
  return JSON.parse(JSON.stringify(db[key]))
}

server.post('/api/investment/deposit/add', (_req, res) => {
  res.json(clone('depositAdd'))
})

server.post('/api/investment/stock/add', (_req, res) => {
  res.json(clone('stockAdd'))
})

server.post('/api/investment/bond/add', (_req, res) => {
  res.json(clone('bondAdd'))
})

server.get('/api/investment/stock/list', (_req, res) => {
  res.json(clone('stockList'))
})

server.get('/api/investment/deposit/list', (_req, res) => {
  res.json(clone('depositList'))
})

server.get('/api/investment/bond/list', (_req, res) => {
  res.json(clone('bondList'))
})

server.listen(PORT, () => {
  console.log(
    `[json-server mock] investment API → http://localhost:${PORT} (см. mock/json-server/db.json)`
  )
})
