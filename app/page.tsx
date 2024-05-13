import Favicon from "@/components/favicon"
import AboutMe from "@/components/AboutMe";

import "./page.css";
import Details from "@/components/Details";
import BoxTitle from "@/components/BoxTitle";

export default function Home() {
  return (
    <>
      <div className="content">

        <div className="grid-main">

          <div className="grid-col-1">

            <div className="grid-col-col">

              <div className="grid-row">

                <div className="tile">
                  <BoxTitle title="details"/>
                  <Details></Details>
                </div>

                <div className="tile"></div>

              </div>

              <div className="tile studio-icon">
                <Favicon/>
              </div>

            </div>

            <div className="tile">
              <BoxTitle title="about me"/>
              <AboutMe/>
            </div>

          </div>

          <div className="grid-col-2">

            <div className="tile">
              <BoxTitle title="skills"/>
            </div>

            <div className="grid-col-col">

              <div className="grid-row">

                <div className="tile">
                  <BoxTitle title="experience"/>
                </div>

                <div className="grid-rcol">

                  <div className="tile"></div>

                  <div className="tile"></div>

                </div>

              </div>

              <div className="tile">
                <BoxTitle title="focus"/>
              </div>

            </div>

          </div>

          <div className="grid-col-3">

            <div className="tile"></div>

            <div className="tile">
              <BoxTitle title="case-studies"/>
            </div>

          </div>

        </div>

        <div className="footer">foot</div>

      </div>
    </>
  );
}
