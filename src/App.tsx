import './themes/default.css'
import './App.css'


function App() {

    return (
        <>
            <div id="header">
                <div id="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6.7 -2.8 14.87 5">
                        <path x="-6.7" y="-2.8" width="14.87" height="3.3" d="M -6.7 1.6 L -4.3 -1 L -2.8 -1 L -2.1 -1.7 L -1 -1.7 L -4.1 1.6 Z M -3.9 1.6 L -1.5 -1 L -0.3 -1 L -2.8 1.6 Z M -1.4 -1.1 L -0.8 -1.7 L 0.4 -1.7 L -0.2 -1.1 Z M -2.6 1.6 L 0.6 -1.7 L 1.7 -1.7 L 1.1 -1 L 2.5 -1 L 1.8 -0.3 L 0.4 -0.3 L -0.7 0.9 L -0.5 0.9 L 0.5 -0.2 L 1.7 -0.2 L 0 1.6 Z M 3 1.6 L 5.5 -1 L 8.014 -0.983 L 5.6 1.6 Z M 0.2 1.6 L 3.3 -1.7 L 4.5 -1.7 L 3.8 -1 L 5.3 -1 L 4.6 -0.3 L 3.1 -0.3 L 2 0.9 L 2.2 0.9 L 3.2 -0.2 L 4.5 -0.2 L 2.8 1.6 Z M -3.6 -0.3 L -3.8 -0.3 L -5 1 L -4.8 1 Z M 6 -0.3 L 4.9 0.9 L 5.1 0.9 L 6.2 -0.3 Z"></path>
                    </svg>
                </div>
                <div id="caption">DESIGNER & FRONT-END DEVELOPER</div>
                <div id="spacer"></div>
                <div className="action-buttons">
                    <a href="http://" className="highlight-btn" target="_blank" rel="noopener noreferrer"><div>LINKS</div></a>
                    <a href="http://" className="highlight-btn" target="_blank" rel="noopener noreferrer"><div>PROJECTS</div></a>
                    <a href="http://" className="highlight-btn" target="_blank" rel="noopener noreferrer"><div>CONTACT ME</div></a>
                </div>
            </div>
        </>
    )
}

export default App
