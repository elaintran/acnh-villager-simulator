import React, { Component } from "react";
// import Autocomplete from "react-autocomplete";
import SearchBar from "../SearchBar";
// import VillagerTab from "../VillagerTab";
// import API from "../../utils/API.js";
import "./style.css";

class CurrentResidents extends Component {
    state = {
        query: "",
        allVillagers: this.props.villagers,
        villagerNames: [],
        currentResidents: []
    }

    componentDidMount() {
        this.getVillagerNames();
    }

    componentDidUpdate(prevProps) {
        if (this.props.villagers !== prevProps.villagers) {
            console.log(prevProps.villagers);
            this.setState({ allVillagers: this.props.villagers}, () => this.getVillagerNames());
        }
    }

    getVillagerNames = () => {
        let villagerNames = [];
        if (this.state.allVillagers.length !== 0) {
            for (let i = 0; i < this.state.allVillagers.length; i++) {
                villagerNames.push(this.state.allVillagers[i].name);
            }
        }
        this.setState({ villagerNames: villagerNames });
    }

    findResidents = query => {
        // let name = query.replace(/\s/g, '').toLowerCase().split(" ");
        // let newName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
        // if (newName === "O'hare") {
        //     newName = "O'Hare";
        // }
        // for (let i = 0; i < this.state.allVillagers.length; i++) {
        //     if (newName === this.state.allVillagers[i].name) {
        //         console.log(this.state.allVillagers[i]);
        //     }
        // }
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
            <SearchBar
                options={this.state.villagerNames}
            />
                /* <SearchBar change={this.handleInput} submit={this.handleSubmit}>Enter current residents...</SearchBar> */
        );
    }
}

export default CurrentResidents;