import React, { Component } from "react";
import SearchBar from "../SearchBar";
// import VillagerTab from "../VillagerTab";
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
            <div>
                <SearchBar>Enter current residents...</SearchBar>
            </div>
        // <div>{this.findResidents()}</div>
        );
    }
}

export default CurrentResidents;