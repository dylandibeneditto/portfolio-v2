import Image from "next/image";
import "./page.css";

export default function Home() {
  return (
    <>
      <div className="content">

        <div className="header">head</div>
        
        <div className="grid-main">
        
          <div className="grid-col-1">
        
            <div className="grid-col-col">
        
              <div className="grid-row">
        
                <div className="tile"></div>
        
                <div className="tile"></div>
        
              </div>
        
              <div className="tile"></div>
        
            </div>
        
            <div className="tile"></div>
        
          </div>
        
          <div className="grid-col-2">
        
            <div className="tile"></div>
        
            <div className="grid-col-col">
        
              <div className="grid-row">
        
                <div className="tile"></div>
        
                <div className="grid-rcol">
        
                  <div className="tile"></div>
        
                  <div className="tile"></div>
        
                </div>
        
              </div>
        
              <div className="tile"></div>
        
            </div>
        
          </div>
        
          <div className="grid-col-3">
        
            <div className="tile"></div>
        
            <div className="tile"></div>
        
          </div>
        
        </div>
        
        <div className="footer">foot</div>
      
      </div>
    </>
  );
}
