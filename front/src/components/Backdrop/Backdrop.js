import React from "react"
import classes from "./Backdrop.module.scss"
export const Backdrop = ({ close }) => <div onClick={close} className={classes.Backdrop} />

