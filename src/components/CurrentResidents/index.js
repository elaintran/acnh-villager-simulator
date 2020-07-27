import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
// import SearchBar from "../SearchBar";
import SubmitButton from "../SubmitButton";
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
        residents: [],
        dreamies: [],
        residentValue: "",
        dreamieValue: ""
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
        if (this.state.residents.length < 10) {
            this.state.allVillagers.map(villagers =>
                (value === villagers.name) ?
                this.setState({ residents: this.state.residents.concat(villagers)}, () => this.removeVillagers(value) ) : false)
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
        const residentArr = [...this.state.residents];
        residentArr.splice(index, 1);
        this.setState({ residents: residentArr });
        this.addVillagers(name);
    }

    handleInput = event => {
        let value = event.target.value;
        this.setState({ residentValue: value });
    }

    handleDreamieInput = event => {
        let value = event.target.value;
        this.setState({ dreamieValue: value });
    }

    searchDreamies = () => {
        const species = ["Alligator", "Anteater", "Bear", "Bird", "Bull", "Cat",
                        "Chicken", "Cow", "Cub", "Deer", "Dog", "Duck", "Eagle",
                        "Elephant", "Frog", "Goat", "Gorilla", "Hamster", "Hippo",
                        "Horse", "Kangaroo", "Koala", "Lion", "Monkey", "Mouse",
                        "Octopus", "Ostrich", "Penguin", "Pig", "Rabbit", "Rhino",
                        "Sheep", "Squirrel", "Tiger", "Wolf"];
        const allVillagers = [...this.state.allVillagers];
        const villagerNames = [...this.state.villagerNames];
        const villagerInfo = [];
        for (let i = 0; i < allVillagers.length; i++) {
            for (let j = 0; j < villagerNames.length; j++) {
                if (allVillagers[i].name === villagerNames[j].label) {
                    villagerInfo.push(allVillagers[i]);
                }
            }
        }
        let speciesIndex = Math.floor(Math.random() * species.length);
        let chosenSpecies = [];
        for (let i = 0; i < villagerInfo.length; i++) {
            if (villagerInfo[i].species === species[speciesIndex]) {
                chosenSpecies.push(villagerInfo[i]);
            }
        }
        let chosenIndex = Math.floor(Math.random() * chosenSpecies.length);
        console.log(chosenSpecies[chosenIndex]);
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
                        value={this.state.residentValue}
                        onChange={this.handleInput}
                        onSelect={value => this.setState({ residentValue: value }, () => this.findResidents(this.state.residentValue))}
                        inputProps={{ placeholder: "Enter current residents...", style: { background: "#e2faf1", border: 0, color: "#55a290", padding: "0 10px", fontWeight: "bold", height: "40px", borderRadius: "10px"} }}
                    />
                    {this.state.residents.map((residents, index) => (
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
                        value={this.state.dreamieValue}
                        onChange={this.handleDreamieInput}
                        onSelect={value => this.setState({ dreamieValue: value }, () => this.findDreamies(this.state.dreamieValue))}
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
                <SubmitButton click={this.searchDreamies} />
            </div>
        );
    }
}

export default CurrentResidents;