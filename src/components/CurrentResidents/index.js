import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
// import SearchBar from "../SearchBar";
// import VillagerTab from "../VillagerTab";
// import API from "../../utils/API.js";
import "./style.css";

class CurrentResidents extends Component {
    state = {
        query: "",
        allVillagers: this.props.villagers,
        villagerNames: [{
            id: 0,
            label: ""
        }],
        currentResidents: [],
        value: ""
    }

    componentDidMount() {
        this.getVillagerNames();
    }

    componentDidUpdate(prevProps) {
        if (this.props.villagers !== prevProps.villagers) {
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
        villagerNames = villagerNames.sort();
        let villagerObj = [];
        for (let i = 0; i < villagerNames.length; i++) {
            villagerObj.push({id: i, label: villagerNames[i]});
        }
        this.setState({ villagerNames: villagerObj });
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
            <Autocomplete
                items={this.state.villagerNames}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={(item, highlighted) =>
                <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                    {item.label}
                </div>
                }
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={value => this.setState({ value })}
          />    
            // <Autocomplete
            //     getItemValue={(item) => item.label}
            //     items={this.state.villagerNames}
            //     renderItem={(item, isHighlighted) =>
            //         <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            //         {item.label}
            //         </div>
            //     }
                // value={this.state.query}
                // onChange={this.handleInput}
                // onSelect={query => this.setState({ query })}
            // />
            // <SearchBar
            //     options={this.state.villagerNames}
            // />
                /* <SearchBar change={this.handleInput} submit={this.handleSubmit}>Enter current residents...</SearchBar> */
        );
    }
}

export default CurrentResidents;