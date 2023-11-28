import {
  loginAction,
  logoutAction,
  postAction,
  postLoader,
  postsLoader,
  userLoader,
  registerAction,
} from "./dataActions"
import App from "./components/routes/App"
import Homepage from "./components/routes/Homepage"
import Post from "./components/routes/Post"
import PostForm from "./components/modules/PostForm"
import { redirect } from "react-router-typesafe"
import ErrorRoute from "./components/routes/ErrorRoute"

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
        loader: postsLoader,
      },
      {
        path: "/login",
        action: loginAction,
        loader: async () => {
          return redirect("/")
        },
      },
      {
        path: "/register",
        action: registerAction,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
      {
        path: "/posts",
        loader: postsLoader,
        element: null,
        children: [
          {
            path: "/posts/:postId",
            loader: postLoader,
            action: postAction,
            element: <Post />,
          },
          {
            path: "/posts/new",
            action: postAction,
            element: <PostForm />,
          },
        ],
      },
    ],
  },
]
