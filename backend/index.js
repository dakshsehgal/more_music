const express = require('express')
const cors = require('cors')
const app = express()
const requestRouter = require('./controllers/routes.js')
const config = require('./utils/config')
const middleware = require('./utils/middleware.js')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.use('/api', requestRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})