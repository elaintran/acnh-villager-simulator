import React from "react";
import Title from "../Title";
import Trees from "../../images/trees.png"; 
import "./style.css";

function TitleContainer() {
    return (
        <div className="title-container border">
            <Title />
            <p>Use your Nook Miles Tickets to fly to deserted islands and find your dream villagers.</p>
            <img src={Trees} alt="trees" className="trees" />
        </div>
    );
}

export default TitleContainer;