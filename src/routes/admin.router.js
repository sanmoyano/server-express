const { Router } = require('express')

const router = Router()

router.get('/product/add', async (req, res) => {
  res.render('admin/addProduct', {
    title:"Add new product"
  })
})

module.exports = router