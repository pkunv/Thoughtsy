import { RouteObject } from "react-router"
import {
  loginAction,
  logoutAction,
  postAction,
  postLikeAction,
  registerAction
} from "./actionFunctions"
import PostForm from "./components/modules/PostForm"
import App from "./components/routes/App"
import ErrorRoute from "./components/routes/ErrorRoute"
import Homepage from "./components/routes/Homepage"
import Post from "./components/routes/Post"
import { postLoader, postsLoader, userLoader } from "./loaderFunctions"

export const routes = [
  {
    element: <App />,
    id: "root",
    loader: userLoader,
    errorElement: <ErrorRoute />,
    children: [
      {
        element: <Homepage />,
        id: "homepage",
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
