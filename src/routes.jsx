import {
	loginAction,
	logoutAction,
	postLoader,
	postsLoader,
	userLoader,
	registerAction,
} from "./dataActions"
import App from "./components/routes/App"
import Homepage from "./components/routes/Homepage"
import Post from "./components/routes/Post"

export const routes = [
	{
		path: "/",
		element: <App />,
		id: "root",
		loader: userLoader,
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
				path: "/posts/:postId",
				loader: postLoader,
				element: <Post />,
			},
		],
	},
]
