import React from "react"
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

const Socials = () => (
  <span className="block">
    <a href="mailto:&#097;&#110;&#105;&#114;&#117;&#100;&#104;&#097;&#046;&#098;&#111;&#115;&#101;&#064;&#097;&#108;&#117;&#109;&#110;&#105;&#046;&#099;&#101;&#114;&#110;">
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
    &nbsp;&nbsp;
    <a href="https://github.com/onyb">
      <FontAwesomeIcon icon={faGithub} />
    </a>
    &nbsp;&nbsp;
    <a href="http://in.linkedin.com/in/onyb">
      <FontAwesomeIcon icon={faLinkedin} />
    </a>
    &nbsp;&nbsp;
    <a href="https://twitter.com/onybose">
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  </span>
)

const Footer = ({ siteTitle }) => (
  <div className="footer">
    <Socials />
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
