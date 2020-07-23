const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")

const app = express()

const users = require("./routes/users"),
  urls = require("./routes/urls")

const dbURI = require("./config/keys").mongoURI

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/urls", urls)
app.use("/users", users)

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log(err))

// ============ PASSPORT SETUP ==============

app.use(passport.initialize())

// require passport config file

require("./config/passport")(passport)

app.listen(process.env.PORT || 4000, () => console.log("server started"))
