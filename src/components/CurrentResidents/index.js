import React, { Component } from "react";
import SearchBar from "../SearchBar";
// import VillagerTab from "../VillagerTab";
// import API from "../../utils/API.js";
import "./style.css";

class CurrentResidents extends Component {
    state = {
        query: "",
        villagers: this.props.villagers,
        currentResidents: []
    }

    componentDidUpdate(prevProps) {
        if (this.props.villagers !== prevProps.villagers) {
            this.setState({ villagers: this.props.villagers});
            console.log(this.props.villagers);
        }
    }

    // findResidents = () => {
    // }

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