const ShortUrl = require("../model/shortURL"),
  User = require("../model/Users"),
  express = require("express"),
  router = express.Router(),
  passport = require("passport")

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allUrls = await User.findById(req.body.userId)
      .populate({
        path: "urls",
        model: ShortUrl,
        select: "full short clicks -_id",
      })
      .select("urls -_id")

    res.json({ allUrls: allUrls.urls })
  }
)

router.post(
  "/newUrl",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await ShortUrl.create({
      full: req.body.fullUrl,
    }).then((urlObj) => {
      User.findByIdAndUpdate(req.body.userId, {
        $push: {
          urls: urlObj._id,
        },
      }).then(() => res.json(urlObj))
    })
  }
)

router.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.json({ fullUrl: shortUrl.full })
})

module.exports = router
