import React from "react";
import "./style.css";

function VillagerTab(props) {
    return (
        <div className="villager-tab">
            {props.children}
        </div>
    );
}

export default VillagerTab;