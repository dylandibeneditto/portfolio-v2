import "./Details.css"

export default function Details() {
    return (
        <div className="layout">
            <div className="answer">
                <div className="q">name</div>
                <div className="a">Me</div>
            </div>
            <div className="answer">
                <div className="q">based in</div>
                <div className="a">USA</div>
            </div>
            <div className="answer">
                <div className="q">age</div>
                <div className="a">16y</div>
            </div>
        </div>
    )
}