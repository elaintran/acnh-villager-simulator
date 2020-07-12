import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
// import SearchBar from "../SearchBar";
import VillagerTab from "../VillagerTab";
// import API from "../../utils/API.js";
import "./style.css";

class CurrentResidents extends Component {
    state = {
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

    findResidents = value => {
        if (this.state.currentResidents.length < 10) {
            for (let i = 0; i < this.state.allVillagers.length; i++) {
                if (value === this.state.allVillagers[i].name) {
                    this.setState({currentResidents: this.state.currentResidents.concat(this.state.allVillagers[i])});
                }
            }    
        } else {
            console.log("You have too many residents.");
        }
        //need to prevent the same villagers from being added
        //need to remove the villagers added from the autocomplete
        //need to fix bug when searching for villagers too quickly
    }

    handleInput = event => {
        let value = event.target.value;
        this.setState({ value: value });
    }

    render() {
        return (
            <div>
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
                    onChange={this.handleInput}
                    onSelect={value => this.setState({ value }, () => this.findResidents(this.state.value))}
                    inputProps={{ placeholder: "Enter current residents..." }}
                />
                {this.state.currentResidents.map(residents => (
                    <VillagerTab villager={residents.name} icon={residents.icon} />
                ))}
            </div>  
        );
    }
}

export default CurrentResidents;