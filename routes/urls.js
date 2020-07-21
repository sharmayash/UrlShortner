const ShortUrl = require("../model/shortURL"),
  express = require("express"),
  router = express.Router(),
  passport = require("passport")

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.json({ shortUrls: shortUrls })
  }
)

router.post(
  "/shortUrls",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl }).then((urlObj) =>
      res.json(urlObj)
    )
  }
)

router.get(
  "/:shortUrl",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.json({ fullUrl: shortUrl.full })
  }
)

module.exports = router
