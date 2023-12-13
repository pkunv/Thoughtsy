import { AccessabilityTypes, RouteInfo } from "./types"

export const routesInfo = [
  {
    accessableFor: [AccessabilityTypes.Public, AccessabilityTypes.User],
    key: "home",
    name: "Homepage",
    navItem: true,
    path: "/",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.Public],
    key: "login",
    name: "Log in",
    navItem: true,
    path: "/login",
    type: "modal"
  },
  {
    accessableFor: [AccessabilityTypes.Public],
    key: "register",
    name: "Register",
    navItem: true,
    path: "/register",
    type: "modal"
  },
  {
    accessableFor: [AccessabilityTypes.Public, AccessabilityTypes.User],
    key: "about",
    name: "About",
    navItem: true,
    path: "/about",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.User],
    key: "profile",
    name: "Your profile",
    navItem: true,
    path: "/profile",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.User],
    key: "feed",
    name: "Feed",
    navItem: true,
    path: "/feed",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.User],
    key: "logout",
    name: "Logout",
    navItem: true,
    path: "/logout",
    type: "fetcher"
  },
  {
    accessableFor: [AccessabilityTypes.Public, AccessabilityTypes.User],
    key: "posts",
    name: "Posts",
    navItem: false,
    path: "/posts",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.User],
    key: "new-post",
    name: "New post",
    navItem: false,
    path: "/posts/new",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.Public, AccessabilityTypes.User],
    key: "post",
    name: "Post",
    navItem: false,
    path: "/posts/:postId",
    type: "route"
  },
  {
    accessableFor: [AccessabilityTypes.Public, AccessabilityTypes.User],
    key: "user",
    name: "User",
    navItem: false,
    path: "/users/:userId",
    type: "route"
  }
] as Array<RouteInfo>
