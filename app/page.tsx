import Favicon from "@/components/favicon";
import AboutMe from "@/components/AboutMe";
import Focus from "@/components/Focus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./page.css";
import Details from "@/components/Details";
import Clock from "@/components/Clock";
import BoxTitle from "@/components/BoxTitle";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <>
      <div className="content">
        <div className="grid-main">
          <div className="grid-col-1">
            <div className="grid-col-col">
              <div className="tile">
                <BoxTitle title="details" />
                <Details></Details>
              </div>

              <div className="tile studio-icon">
                {/*<Favicon />*/}
              </div>
            </div>

            <div className="tile">
              <BoxTitle title="about me" />
              <AboutMe />
            </div>
          </div>

          <div className="grid-col-2">
            <div className="tile">
              <BoxTitle title="skills" />
              <ParticleCanvas />
            </div>

            <div className="grid-col-col">
              <div className="grid-row">
                <div className="tile">
                  <BoxTitle title="experience" />
                </div>

                <div className="grid-rcol">
                  <div className="tile">
                    <a className="contact" href="mailto:dibenedittod@gmail.com">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <div className="contact-title">email</div>
                    </a>
                  </div>

                  <div className="tile">
                    <a
                      href="https://github.com/dylandibeneditto"
                      target="_blank"
                      className="github"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                      <div>github</div>
                    </a>
                  </div>

                  <div className="tile">
                    <a href="" target="_blank" className="twitter">
                      <FontAwesomeIcon icon={faXTwitter} />
                      <div>twitter</div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="tile">
                <BoxTitle title="focus" />
                <div className="focus-items">
                  <Focus title="web design" color="lime" />
                  <Focus title="web development" color="lime" />
                  <Focus title="graphic design" color="lime" />
                  <Focus title="UX design / research" color="lime" />
                  <Focus title="algorithms and data structures" color="lime" />
                  <Focus title="ios app design" color="gold" />
                  <Focus title="ios app development" color="gold" />
                  <Focus title="motion and animation design" color="gold" />
                  <Focus title="SEO optimization" color="gold" />
                  <Focus title="backend systems development" color="orange" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid-col-3">
            <div className="tile">
              <Clock />
            </div>

            <div className="tile">
              <BoxTitle title="case-studies" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
