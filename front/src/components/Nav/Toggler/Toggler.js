import React from "react"
import classes from "./Toggler.module.scss"
export const Toggler = ({ isOpened, onToggle }) => {
  const cls = ["fa", classes.Toggler]
  if (isOpened) {
    cls.push("fa-times")
    cls.push(classes.open)
  } else {
    cls.push("fa-bars")
  }
  return <i className={cls.join(" ")} onClick={onToggle}></i>
}
