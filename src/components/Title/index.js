import React from "react";
import Clap from "../../images/clapping-reaction.png";
import "./style.css";

function Title() {
    return (
        <div className="title"><img src={Clap} alt="clap" className="clap" /> Villager Simulator</div>
    );
}

export default Title;