import React from "react"

const Projects = () => (
  <>
    <h5>Open Source</h5>
    <ul>
      <li>
        <a href="https://github.com/onyb/littlebit">littlebit</a>: Bitcoin
        library from scratch; in Python and Rust.
      </li>
      <li>
        <a href="https://github.com/esowc/ecPoint-Calibrate">
          ecPoint-Calibrate
        </a>
        : Interactive meteorological software for calibration of model outputs,
        post-processing, and conditional-verification. Development sponsored by{" "}
        <a href="https://ecmwf.int">ECMWF</a>.
      </li>

      <li>
        <a href="https://github.com/onyb/reobject">reobject</a>: An ORM layer to
        track and query objects at runtime, using a familiar query langauge
        inspired by Django.
      </li>

      <li>
        <a href="https://github.com/cerndb/hloader">HLoader</a>: Data-ingestion
        framework to manage jobs from CMS data-services into CERN Hadoop
        clusters. Development sponsored by <a href="https://home.cern">CERN</a>.
      </li>

      <li>
        <a href="https://nbviewer.jupyter.org/gist/onyb/ede8693213b4e783e22f">
          Grover's Search
        </a>
        : Classical simulation of Grover's Quantum Search algorithm. Development
        sponsored by <a href="http://www.hri.res.in">HRI</a>.
      </li>
    </ul>
  </>
)

export default Projects
