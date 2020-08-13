const cors = require("cors")
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")

const app = express()

const users = require("./routes/users"),
  urls = require("./routes/urls")

const dbURI = require("./config/keys").mongoURI

app.use(cors())
app.disable("etag")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/urls", urls)
app.use("/users", users)

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log(err))

// ============ PASSPORT SETUP ==============

app.use(passport.initialize())

// require passport config file

require("./config/passport")(passport)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000
app.listen(port, () => console.log("server started"))
