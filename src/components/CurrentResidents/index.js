import React, { Component } from "react";
import SearchBar from "../SearchBar";
// import VillagerTab from "../VillagerTab";
// import API from "../../utils/API.js";
import "./style.css";

class CurrentResidents extends Component {
    state = {
        query: "",
        allVillagers: this.props.villagers,
        currentResidents: []
    }

    componentDidUpdate(prevProps) {
        if (this.props.villagers !== prevProps.villagers) {
            this.setState({ allVillagers: this.props.villagers});
        }
    }

    findResidents = query => {
        for (let i = 0; i < this.state.allVillagers.length; i++) {
            if (query === this.state.allVillagers[i].name) {
                console.log(this.state.allVillagers[i]);
            }
        }
    }

    handleInput = event => {
        let value = event.target.value;
        this.setState({ query: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.findResidents(this.state.query);
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