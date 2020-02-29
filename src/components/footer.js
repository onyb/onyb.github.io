import React from "react"
import PropTypes from "prop-types"

const Footer = ({ siteTitle }) => (
  <div className="footer">
    <span className="block">
      &copy; {new Date().getFullYear()} {siteTitle}
    </span>
    <span className="block">
      <small>
        Powered by {` `} <a href="https://www.gatsbyjs.org">Gatsby</a>.
      </small>
    </span>
  </div>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
