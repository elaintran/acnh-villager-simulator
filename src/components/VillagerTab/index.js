import React from "react";
import RemoveButton from "../RemoveButton";
import "./style.css";

function VillagerTab(props) {
    return (
        <div className="villager-tab">
            <img
                src={props.icon}
                alt={props.villager}
                width="30px"
                className="villager-icon" / >
            {props.villager}
            <RemoveButton
                remove={props.remove}
                index={props.index}
                villager={props.villager}
                species={props.species}
                personality={props.personality}
                icon={props.icon}
                search={props.search} />
        </div>
    );
}

export default VillagerTab;