const express = require('express')
const app = express()
const port = 3000

// View Engine
app.set('view engine', 'ejs')

// Middleware
app.use(express.urlencoded( { extended: false} ))

// Router
const router = require('./routes/index')

app.use(router)

app.listen(port, () => {
  console.log(`Hacktiv Shirt Store LIVE at http://127.0.0.1:${port}`)
})