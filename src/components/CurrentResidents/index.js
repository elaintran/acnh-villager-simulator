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
            const villagers = [];
            for (let i = 0; i < Object.entries(response.data).length; i++) {
                let villagerInfo = {
                    "name": response.data[i]["name"]["name-USen"],
                    "species": response.data[i]["species"],
                    "personality": response.data[i]["personality"],
                    "icon": response.data[i]["icon_uri"]
                };
                villagers.push(villagerInfo);
            }
            this.setState({ results: villagers });
            console.log(this.state.results);
        });
    }

    handleInput = event => {
        // let value = event.target.value;
        // this.setState({ query: value });
        // console.log("hi");
    }

    handleSubmit = event => {
        event.preventDefault();
        this.findResidents();
    }

    render() {
        return (
            <div>
                <SearchBar change={this.handleInput} submit={this.handleSubmit}>Enter current residents...</SearchBar>
            </div>
        );
    }
}

export default CurrentResidents;