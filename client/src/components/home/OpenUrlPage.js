import React, { useEffect, useState } from "react"
import axios from "axios"
import NotFound from "../NotFound"

function Loading() {
  return (
    <header className="auth-screen">
      <span style={{ display: "flex", justifyContent: "center" }}>
        Loading page for {window.location.href}
      </span>
    </header>
  )
}

function OpenUrlPage(props) {
  const [component, setComponent] = useState(<Loading />)

  useEffect(() => {
    axios
      .get("/urls/" + props.match.params.shortUrl)
      .then((res) => (window.location.href = res.data.fullUrl))
      .catch((err) => {
        if (err) {
          setComponent(<NotFound />)
        }
      })
    // eslint-disable-next-line
  }, [])

  return component
}

export default OpenUrlPage
