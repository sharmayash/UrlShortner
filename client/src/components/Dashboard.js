import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { Button } from "@material-ui/core"
import { logOutUser } from "../redux/actions/authActions"

function Dashboard(props) {
  let dashboardContent
  const { isAuthenticated } = props.auth

  const handleLogOut = (e) => {
    e.preventDefault()
    props.logOutUser()
  }

  if (isAuthenticated) {
    dashboardContent = (
      <header className="">
        <h1>URL Shortner</h1>
        <Button size="small" onClick={handleLogOut}>
          Log Out
        </Button>
      </header>
    )
  } else {
    dashboardContent = <Redirect to="/login" />
  }

  return dashboardContent
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logOutUser })(Dashboard)
