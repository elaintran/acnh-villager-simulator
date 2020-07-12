import React from "react";
import "./style.css";

function VillagerTab(props) {
    return (
        <div className="villager-tab">
            <img src={props.icon} alt={props.villager} width="30px" / >
            {props.villager}
        </div>
    );
}

export default VillagerTab;