import React from "react"
import { AuthForm } from "../../components/Form/Form"
export const Auth = ({match}) => {
  let modeAuth
  if (match.path === '/auth') {
    modeAuth = true
  } else {
    modeAuth = false
  }

  return (
    <div
      className={window.innerWidth > 1900 ? "container w-50" : "container w-75"}
    >
      <AuthForm register={modeAuth} />
    </div>
  )
}
