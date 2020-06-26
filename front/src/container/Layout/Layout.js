import React ,{ useState } from "react"
import classes from "./Layout.module.scss"
import { Navbar } from "../../components/Nav/Navbar/Navbar"
import { Toggler } from "../../components/Nav/Toggler/Toggler"

export default function Layout({ children }) {
  const [isOpened, setOpened] = useState(false)
  const onToggle = () => {
    setOpened(!isOpened)
  }
  const onClose = () => {
    setOpened(false)
  }
  return (
    <>
      <Navbar onClose={onClose} isOpened={isOpened} />
      <Toggler isOpened={isOpened} onToggle={onToggle} />
      <div className={classes.Layout}>
        <main>{children}</main>
      </div>
    </>
  )
}
