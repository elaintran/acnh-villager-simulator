import React from "react";
import "./style.css";

function CardTitle(props) {
    return (
        <h3 className="card-title">{props.children}</h3>
    );
}

export default CardTitle;