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
        value: "",
        dreamies: []
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
            this.state.allVillagers.map(villagers =>
                (value === villagers.name) ?
                this.setState({ currentResidents: this.state.currentResidents.concat(villagers)}, () => this.removeVillagers(value) ) : false)
        }
    }

    findDreamies = value => {
        this.state.allVillagers.map(villagers => 
            (value === villagers.name) ?
            this.setState({ dreamies: this.state.dreamies.concat(villagers) }) : false);
    }

    //remove villager listing from all villagers to prevent adding the same villager
    removeVillagers = value => {
        // console.log(this.state.currentResidents);
        const villagerArr = [...this.state.villagerNames];
        let index = this.state.villagerNames.map(villagers => villagers.label).indexOf(value);
        villagerArr.splice(index, 1);
        this.setState({ villagerNames: villagerArr });
    }

    addVillagers = name => {
        const villagerArr = [...this.state.villagerNames];
        const villagerNames = villagerArr.map(villager => villager.label);
        villagerNames.push(name);
        const updatedNames = villagerNames.sort();
        const villagerObj = [];
        for (let i = 0; i < updatedNames.length; i++) {
            villagerObj.push({id: i, label: updatedNames[i]});
        }
        this.setState({ villagerNames: villagerObj });
    }

    removeResident = (index, name) => {
        const residentArr = [...this.state.currentResidents];
        residentArr.splice(index, 1);
        this.setState({ currentResidents: residentArr });
        this.addVillagers(name);
    }

    handleInput = event => {
        let value = event.target.value;
        this.setState({ value: value });
    }

    render() {
        return (
            <div className="container">
                <div className="search-container">
                    <Autocomplete
                        items={this.state.villagerNames}
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{ backgroundColor: highlighted ? '#c4eede' : 'transparent', padding: "5px 10px", borderBottomStyle: "dashed"}}
                        >
                            {item.label}
                        </div>
                        }
                        menuStyle={{background: "#e2faf1", color: "#55a290", marginTop: "5px", maxHeight: "50vh", overflow: "auto"}}
                        value={this.state.value}
                        onChange={this.handleInput}
                        onSelect={value => this.setState({ value }, () => this.findResidents(this.state.value))}
                        inputProps={{ placeholder: "Enter current residents...", style: { background: "#e2faf1", border: 0, color: "#55a290", padding: "0 10px", fontWeight: "bold", height: "40px", borderRadius: "10px"} }}
                    />
                    {this.state.currentResidents.map((residents, index) => (
                        <VillagerTab
                            id={index}
                            index={index}
                            villager={residents.name}
                            icon={residents.icon}
                            remove={this.removeResident}
                        />
                    ))}
                </div>  
                <div className="search-container">
                    <Autocomplete
                        items={this.state.villagerNames}
                        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.label}
                        renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{ backgroundColor: highlighted ? '#c4eede' : 'transparent', padding: "5px 10px", borderBottomStyle: "dashed"}}
                        >
                            {item.label}
                        </div>
                        }
                        menuStyle={{background: "#e2faf1", color: "#55a290", marginTop: "5px", maxHeight: "50vh", overflow: "auto"}}
                        value={this.state.value}
                        onChange={this.handleInput}
                        onSelect={value => this.setState({ value }, () => this.findDreamies(this.state.value))}
                        inputProps={{ placeholder: "Enter dreamies...", style: { background: "#e2faf1", border: 0, color: "#55a290", padding: "0 10px", fontWeight: "bold", height: "40px", borderRadius: "10px"} }}
                    />
                    {this.state.dreamies.map((residents, index) => (
                        <VillagerTab
                            id={index}
                            index={index}
                            villager={residents.name}
                            icon={residents.icon}
                            remove={this.removeResident}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default CurrentResidents;