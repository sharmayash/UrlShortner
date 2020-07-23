import React from "react"

export default function NotFound() {
  return (
    <header className="App-header">
      <h1>404</h1>
      <br />
      <br />
      <span style={{ display: "flex", justifyContent: "center" }}>
        Page not found for <code>{window.location.pathname}</code>
      </span>
    </header>
  )
}
