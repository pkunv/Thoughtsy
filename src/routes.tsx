import App from "./components/routes/App"
import Homepage from "./components/routes/Homepage"
import Post from "./components/routes/Post"
import PostForm from "./components/modules/PostForm"
import { redirect } from "react-router-typesafe"
import ErrorRoute from "./components/routes/ErrorRoute"
import LoginModal from "./components/modules/LoginModal"
import { RouteObject } from "react-router"
import {
  loginAction,
  registerAction,
  logoutAction,
  postAction,
  postLikeAction
} from "./actionFunctions"
import { userLoader, postsLoader, postLoader } from "./loaderFunctions"

export const routes = [
  {
    path: "/",
    element: <App />,
    id: "root",
    loader: userLoader,
    errorElement: <ErrorRoute />,
    children: [
      {
        element: <Homepage />,
        index: true,
        loader: postsLoader
      },
      {
        path: "/login",
        element: <Homepage />,
        loader: postsLoader,
        action: loginAction
      },
      {
        path: "/register",
        element: <Homepage />,
        loader: postsLoader,
        action: registerAction
      },
      {
        path: "/logout",
        action: logoutAction
      },
      {
        path: "/posts",
        loader: postsLoader,
        id: "posts",
        element: null,
        children: [
          {
            path: "/posts/:postId",
            loader: postLoader,
            action: postAction,
            element: <Post />,
            children: [
              {
                path: "/posts/:postId/delete",
                loader: postLoader,
                action: postAction,
                element: <Post />
              },
              {
                path: "/posts/:postId/like",
                action: postLikeAction,
                element: null
              }
            ]
          },
          {
            path: "/posts/new",
            action: postAction,
            element: <PostForm post={undefined} />
          }
        ]
      }
    ]
  }
] as Array<RouteObject>
