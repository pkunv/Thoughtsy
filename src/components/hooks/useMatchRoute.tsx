import { matchRoutes, useLocation } from "react-router-dom"
import { routes } from "../../routes"
import { routesInfo } from "../../routesInfo"

function useMatchRoute() {
  const location = useLocation()
  const matchedRoute = matchRoutes(routes, location)
    ?.filter((route) => route.route.id !== "root")
    .find((route) => route.pathname === location.pathname)
  console.log(matchedRoute)
  const routeInfo = routesInfo.find((route) => route.path === matchedRoute?.route.path)

  return { ...routeInfo }
}

export default useMatchRoute
