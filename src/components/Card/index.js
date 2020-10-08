import React from "react";
import "./style.css";

function Card(props) {
    return (
        <div className="card-container">
            <div className="number-container">
                <div className="card-number">{props.number}</div>
            </div>
            {props.children}
        </div>
    );
}

export default Card;