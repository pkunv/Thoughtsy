import { PermissionTypes, RouteInfo } from "./types"

export const routesInfo = [
  {
    accesableFor: [PermissionTypes.Public, PermissionTypes.User],
    key: "home",
    name: "Homepage",
    navItem: true,
    path: "/",
    type: "route"
  },
  {
    accesableFor: [PermissionTypes.Public],
    key: "login",
    name: "Log in",
    navItem: true,
    path: "/login",
    type: "modal"
  },
  {
    accesableFor: [PermissionTypes.Public],
    key: "register",
    name: "Register",
    navItem: true,
    path: "/register",
    type: "modal"
  },
  {
    accesableFor: [PermissionTypes.Public, PermissionTypes.User],
    key: "about",
    name: "About",
    navItem: true,
    path: "/about",
    type: "route"
  },
  {
    accesableFor: [PermissionTypes.User],
    key: "profile",
    name: "Profile",
    navItem: true,
    path: "/profile",
    type: "route"
  },
  {
    accesableFor: [PermissionTypes.User],
    key: "feed",
    name: "Feed",
    navItem: true,
    path: "/feed",
    type: "route"
  },
  {
    accesableFor: [PermissionTypes.User],
    key: "logout",
    name: "Logout",
    navItem: true,
    path: "/logout",
    type: "fetcher"
  },
  {
    accesableFor: [PermissionTypes.Public, PermissionTypes.User],
    key: "posts",
    name: "Posts",
    navItem: false,
    path: "/posts",
    type: "route"
  },
  {
    accesableFor: [PermissionTypes.User],
    key: "new-post",
    name: "New post",
    navItem: false,
    path: "/posts/new",
    type: "route"
  },
  {
    accesableFor: [PermissionTypes.Public, PermissionTypes.User],
    key: "post",
    name: "Post",
    navItem: false,
    path: "/posts/:postId",
    type: "route"
  }
] as Array<RouteInfo>
