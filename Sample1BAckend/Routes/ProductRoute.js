const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const router = express.Router()

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `image-${timestamp}${ext}`)
  }
})

const upload = multer({ storage })

// In-memory store for products (switch to a database in production)
let products = []

// POST /api/products
// Create a new product with optional image upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    const { pname, pcategory, pdescription, price } = req.body
    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null

    const newProduct = {
      id: products.length + 1,
      pname,
      pcategory,
      pdescription,
      price,
      imageUrl
    }

    products.push(newProduct)
    return res.status(201).json({ message: 'Product created', product: newProduct })
  } catch (err) {
    console.error('Error creating product:', err)
    return res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/products
// List all products
router.get('/', (req, res) => {
  res.json(products)
})

// GET /api/products/:id
// Get a single product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const product = products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ error: 'Product not found' })
  }

  res.json(product)
})

module.exports = router
