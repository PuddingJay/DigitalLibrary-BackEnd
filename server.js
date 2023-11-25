/* eslint-disable prettier/prettier */
const { createServer } = require('http')
const app = require('./app.js')

const port = process.env.port || 3005
const server = createServer(app)

server.listen(port, () => {
  console.log(`Server Start on port ${port}`)
})
