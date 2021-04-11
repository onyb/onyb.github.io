import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Location } from "@reach/router"

const Item = (as, text, slug) =>
  React.createElement(
    as,
    {
      style: { display: "inline", paddingRight: "20px" },
    },
    slug ? <Link to={slug}>{text}</Link> : <span>{text}</span>
  )

const Header = () => (
  <section>
    {Item("h1", "Anirudha Bose")}

    <Location>
      {({ location }) => {
        return location.pathname == "/"
          ? Item("div", "About", "/about/")
          : Item("div", "Home", "/")
      }}
    </Location>
  </section>
)

Header.propTypes = {
  avatar: PropTypes.string,
}

Header.defaultProps = {
  avatar: ``,
}

export default Header
