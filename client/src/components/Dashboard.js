import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { logOutUser } from "../redux/actions/authActions"
import { newUrl, getAllUrls } from "../redux/actions/urlActions"

import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Grid,
  TextField,
  Typography,
  Container,
} from "@material-ui/core"

import UrlTable from "./home/urlTable"

const useStyles = makeStyles(() => ({
  head: {
    color: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem",
  },
  but: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem",
  },
  btn: {
    padding: "10px",
    background: "linear-gradient(45deg, #5a78a7 30%, #40c4ff 90%)",
  },
}))

function Dashboard({ auth, urls, logOutUser, newUrl, getAllUrls }) {
  const classes = useStyles()

  const [url, setUrl] = useState("")
  const [privAllUrls, setAllUrls] = useState([])

  // destructure data from prop
  const { isAuthenticated, user } = auth
  const { allUrls } = urls

  useEffect(() => {
    getAllUrls(user.id)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setAllUrls(allUrls)
  }, [allUrls])

  const handleLogOut = (e) => {
    e.preventDefault()
    logOutUser()
  }

  const handleChange = (e) => {
    e.preventDefault()

    setUrl(e.target.value)
  }

  const handleShrinken = (e) => {
    e.preventDefault()

    newUrl({ userId: user.id, fullUrl: url })
  }

  return isAuthenticated ? (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <h1>URL Shortner</h1>
        </Grid>
        <Grid item>
          <Button size="small" className={classes.btn} onClick={handleLogOut}>
            Log Out
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.head}>
              Enter Url Below
            </Typography>
            <TextField
              required
              margin="dense"
              name="fullUrl"
              value={url}
              onChange={handleChange}
              label="Your Full Url Here"
              type="text"
              variant="outlined"
              fullWidth
            />
            {/* {props.errors.emailLogin ? (
              <Typography variant="caption" color="secondary">
                {props.errors.emailLogin}
              </Typography>
            ) : (
              ""
            )} */}
            <div className={classes.but}>
              <Button
                size="small"
                className={classes.btn}
                onClick={handleShrinken}
              >
                Shrink Now
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      <UrlTable urlObjs={privAllUrls} />
    </>
  ) : (
    <Redirect to="/login" />
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  newUrl: PropTypes.func.isRequired,
  getAllUrls: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  urls: state.urls,
})

export default connect(mapStateToProps, { logOutUser, newUrl, getAllUrls })(
  Dashboard
)
