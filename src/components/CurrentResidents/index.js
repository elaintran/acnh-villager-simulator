import React, { Component } from "react";
import API from "../../utils/API.js";
import "./style.css";

class CurrentResidents extends Component {
    state = {
        query: "",
        results: []
    }

    findResidents = () => {
        API.findVillagers().then(response => {
            console.log(response.data);
        })
    }

    render() {
        return (
        <div>{this.findResidents()}</div>
        );
    }
}

export default CurrentResidents;