import "./BoxTitle.css";

export default function BoxTitle(props: {title: string}) {
    return (
        <div>
            <div className="page-title"> \/\/ <span className="a">{props.title}</span></div>
        </div>
    )
}