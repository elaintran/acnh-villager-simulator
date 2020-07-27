import React from "react";
import "./style.css";

function RemoveButton(props) {
    return (
        <div className="remove-circle" onClick={() => props.remove(props.index, props.villager, props.species, props.personality, props.icon, props.search)}>
            <i className="fa fa-times" aria-hidden="true"></i>
        </div>
    );
}

export default RemoveButton;