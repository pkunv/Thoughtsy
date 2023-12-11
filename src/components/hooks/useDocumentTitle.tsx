import { useEffect } from "react"
import useMatchRoute from "./useMatchRoute"

export function useDocumentTitle() {
  let route = useMatchRoute()
  useEffect(() => {
    document.title = `${route.name ? route.name + " \\ " : ""} Thoughtsy`
  }, [route])

  return document.title
}
