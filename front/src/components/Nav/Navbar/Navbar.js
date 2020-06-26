import React from "react"
import classes from "./Navbar.module.scss"
import { Backdrop } from "../../Backdrop/Backdrop"
import { NavLink } from "react-router-dom"

export const Navbar = ({isOpened, onClose}) => {
  const isAuth = true
  const routes = ["Sign up",'Log in']
  const loggedInRoutes = ["Contacts",'Log out']
  const cls = [classes.Navbar]
  if(!isOpened) {
    cls.push(classes.close)
  }

  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>{createList(isAuth ? loggedInRoutes : routes)}</ul>
      </nav>
      {isOpened ? <Backdrop close={onClose} /> : null}
    </>
  )
}

function createList(routes) {
  return routes.map((route, index) => {
    const routeName = route.trim().toLowerCase().replace(/ /g, "")
    return (
      <NavLink
        style={{ textDecoration: "none" }}
        to={routeName}
        key={index}
      >
        {" "}
        <li>{route}</li>
      </NavLink>
    )
  })
}