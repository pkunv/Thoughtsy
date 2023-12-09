import { useEffect } from "react"
import useMatchRoute from "./useMatchRoute"

export function useDocumentTitle() {
  let route = useMatchRoute()
  useEffect(() => {
    document.title = `${route.name} \\ Thoughtsy` ?? "Thoughtsy"
  }, [location.pathname])
  return document.title
}
