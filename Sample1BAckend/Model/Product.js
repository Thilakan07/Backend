const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Mount product routes
const productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
