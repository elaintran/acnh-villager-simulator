import React from "react";
import RemoveButton from "../RemoveButton";
import "./style.css";

function VillagerTab(props) {
    return (
        <div className="villager-tab">
            <img src={props.icon} alt={props.villager} width="30px" className="villager-icon" / >
            {props.villager}
            <RemoveButton/>
        </div>
    );
}

export default VillagerTab;