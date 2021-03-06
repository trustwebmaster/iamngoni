const router = require('express').Router()
const cp = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const Posts = require('./../models/posts')

router.use(cp())
router.use(session({ cookie: { maxAge: 60000 }, resave: true, saveUninitialized: false, secret: 'hitwo-api' }))
router.use(flash())

// GET
router.get('/', async (req, res) => {
  var posts = await Posts.find()
  res.render('index', {
    title: 'Ngonidzashe Mangudya',
    posts: posts.reverse()
  })
})

router.get('/localregex', (req, res) => {
  res.render('localregex', {
    title: 'iamngoni | localregex (Dart Package)'
  })
})

router.get('/locator', (req, res) => {
  res.render('productlocator', {
    title: 'iamngoni | Product Locator (Flutter)'
  })
})

// POST
router.post('/post_new', (req, res) => {
  var { title, body } = req.body
  var newPost = new Posts()
  newPost.title = title
  newPost.body = body
  newPost.save().then(post => {
    if (!post) {
      return res.status(500).json({ message: 'post not saved' })
    }
    return res.status(200).json({ message: 'saved' })
  }).catch(e => {
    console.log(e)
  })
})

module.exports = router
