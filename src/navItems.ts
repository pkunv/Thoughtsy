export const navItemsGuest = [
  {
    type: "route",
    path: "/",
    name: "Homepage",
    key: "home"
  },
  {
    type: "modal",
    name: "Log in",
    key: "login",
    path: "/login"
  },
  {
    type: "modal",
    name: "Register",
    key: "register",
    path: "/register"
  },
  {
    path: "/about",
    name: "About",
    key: "about",
    type: "route"
  }
]
export const navItemsUser = [
  {
    type: "route",
    path: "/",
    name: "Homepage",
    key: "home"
  },
  {
    type: "modal",
    name: "Profile",
    key: "profile",
    path: "/profile"
  },
  {
    type: "route",
    path: "/feed",
    name: "Feed",
    key: "feed"
  },
  {
    type: "fetcher",
    path: "/logout",
    name: "Log out",
    key: "logout"
  }
]
