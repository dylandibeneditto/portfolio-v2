import "./Focus.css"

export default function Focus(props: {title: string, color: string}) {
    return (
        <div className="focus-content">
            <div className="focus-orb" style={{
                background: props.color,
                boxShadow: "0px 0px 5px 1px " + props.color
            }}></div>
            <div>{props.title}</div>
        </div>
    )
}