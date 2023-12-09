import { NavLink, To } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { ReactNode } from "react"

export const StyledLinkComp = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  .activeLink {
    text-decoration: underline;
  }
`

export function StyledLink({ to, children }: { to: To; children: ReactNode }) {
  return (
    <StyledLinkComp
      to={to}
      unstable_viewTransition
    >
      {children}
    </StyledLinkComp>
  )
}

export const styledAnchor = {
  color: "inherit",
  textDecoration: "none"
}

export const ZindexLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  .activeLink {
    text-decoration: underline;
  }
`
