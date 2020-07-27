import React, { Component } from "react";
import Autocomplete from "react-autocomplete";
import SubmitButton from "../SubmitButton";
import VillagerTab from "../VillagerTab";
import "./style.css";

class CurrentResidents extends Component {
    state = {
        allVillagers: this.props.villagers,
        filteredVillagers: [],
        residents: [],
        dreamies: [],
        residentValue: "",
        dreamieValue: ""
    }

    componentDidMount() {
        this.sortVillagers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.villagers !== prevProps.villagers) {
            this.setState({ allVillagers: this.props.villagers}, () => this.sortVillagers());
        }
    }

    //sort villagers in alphabetical order
    sortVillagers = () => {
        let villagers = [...this.state.allVillagers];
        if (this.state.allVillagers.length !== 0) {
            villagers.sort((a, b) => (a.name > b.name) ? 1 : -1);
            for (let i = 0; i < villagers.length; i++) {
                villagers[i].id = i;
            }
            this.setState({ filteredVillagers: villagers });
        }
    }

    handleResidentInput = event => {
        this.setState({ residentValue: event.target.value });
    }

    handleDreamieInput = event => {
        this.setState({ dreamieValue: event.target.value });
    }

    findResidents = value => {
        //only allow 9 residents to be added because an empty plot is needed to villager search
        if (this.state.residents.length < 10) {
            this.state.filteredVillagers.map(villagers =>
                (value === villagers.name) ?
                this.setState({
                    residents: this.state.residents.concat(villagers),
                    residentValue: "" },
                    () => this.removeVillagers(value) ) : false)
        }
    }

    findDreamies = value => {
        this.state.filteredVillagers.map(villagers => 
            (value === villagers.name) ? 
            this.setState({
                dreamies: this.state.dreamies.concat(villagers),
                dreamieValue: "" },
                () => this.removeVillagers(value)) : false);
    }

    //remove villager listing from all villagers to prevent adding the same villager
    removeVillagers = value => {
        const villagerArr = [...this.state.filteredVillagers];
        let index = this.state.filteredVillagers.map(villagers => villagers.name).indexOf(value);
        villagerArr.splice(index, 1);
        this.setState({ filteredVillagers: villagerArr });
    }

    addVillagers = (id, name, species, personality, icon) => {
        const villagerInfo = {
            name: name,
            species: species,
            personality: personality,
            icon: icon,
            id: id
        }
        const villagerArr = [...this.state.filteredVillagers];
        villagerArr.push(villagerInfo);
        villagerArr.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.setState({ filteredVillagers: villagerArr });
    }

    removeVillager = (id, name, species, personality, icon, search) => {
        if (search === "residents") {
            const residentArr = [...this.state.residents];
            const residentIndex = residentArr.map(resident => resident.name).indexOf(name);
            residentArr.splice(residentIndex, 1);
            this.setState({ residents: residentArr });
        } else if (search === "dreamie") {
            const dreamieArr = [...this.state.dreamies];
            const dreamieIndex = dreamieArr.map(dreamie => dreamie.name).indexOf(name);
            dreamieArr.splice(dreamieIndex, 1);
            this.setState({ dreamies: dreamieArr });
        }
        this.addVillagers(id, name, species, personality, icon);
    }

    searchDreamies = () => {
        const species = ["Alligator", "Anteater", "Bear", "Bird", "Bull", "Cat",
                        "Chicken", "Cow", "Cub", "Deer", "Dog", "Duck", "Eagle",
                        "Elephant", "Frog", "Goat", "Gorilla", "Hamster", "Hippo",
                        "Horse", "Kangaroo", "Koala", "Lion", "Monkey", "Mouse",
                        "Octopus", "Ostrich", "Penguin", "Pig", "Rabbit", "Rhino",
                        "Sheep", "Squirrel", "Tiger", "Wolf"];
        const islandVillagers = [...this.state.filteredVillagers];
        for (let i = 0; i < this.state.dreamies.length; i++) {
            islandVillagers.push(this.state.dreamies[i]);
        }
        let speciesIndex = Math.floor(Math.random() * species.length);
        let chosenSpecies = [];
        for (let i = 0; i < islandVillagers.length; i++) {
            if (islandVillagers[i].species === species[speciesIndex]) {
                chosenSpecies.push(islandVillagers[i]);
            }
        }
        let chosenIndex = Math.floor(Math.random() * chosenSpecies.length);
        for (let i = 0; i < this.state.dreamies.length; i++) {
            if (chosenSpecies[chosenIndex].name === this.state.dreamies[i].name) {
                console.log("You have found " + this.state.dreamies[i].name);
            } else {
                console.log(chosenSpecies[chosenIndex]);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="search-container">
                        <Autocomplete
                            items={this.state.filteredVillagers}
                            shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.name}
                            renderItem={(item, highlighted) =>
                            <div
                                key={item.id}
                                style={{ backgroundColor: highlighted ? '#c4eede' : 'transparent', padding: "5px 10px", borderBottomStyle: "dashed"}}
                            >
                                {item.name}
                            </div>
                            }
                            menuStyle={{background: "#e2faf1", color: "#55a290", marginTop: "5px", maxHeight: "50vh", overflow: "auto"}}
                            value={this.state.residentValue}
                            onChange={this.handleResidentInput}
                            onSelect={value => this.setState({ residentValue: value }, () => this.findResidents(this.state.residentValue))}
                            inputProps={{ placeholder: "Enter current residents...", style: { background: "#e2faf1", border: 0, color: "#55a290", padding: "0 10px", fontWeight: "bold", height: "40px", borderRadius: "10px"} }}
                        />
                        {this.state.residents.map((residents, index) => (
                            <VillagerTab
                                id={index}
                                index={residents.id}
                                villager={residents.name}
                                species={residents.species}
                                personality={residents.personality}
                                icon={residents.icon}
                                search="residents"
                                remove={this.removeVillager}
                            />
                        ))}
                    </div>  
                    <div className="search-container">
                        <Autocomplete
                            items={this.state.filteredVillagers}
                            shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            getItemValue={item => item.name}
                            renderItem={(item, highlighted) =>
                            <div
                                key={item.id}
                                style={{ backgroundColor: highlighted ? '#c4eede' : 'transparent', padding: "5px 10px", borderBottomStyle: "dashed"}}
                            >
                                {item.name}
                            </div>
                            }
                            menuStyle={{background: "#e2faf1", color: "#55a290", marginTop: "5px", maxHeight: "50vh", overflow: "auto"}}
                            value={this.state.dreamieValue}
                            onChange={this.handleDreamieInput}
                            onSelect={value => this.setState({ dreamieValue: value }, () => this.findDreamies(this.state.dreamieValue))}
                            inputProps={{ placeholder: "Enter dreamies...", style: { background: "#e2faf1", border: 0, color: "#55a290", padding: "0 10px", fontWeight: "bold", height: "40px", borderRadius: "10px"} }}
                        />
                        {this.state.dreamies.map((dreamie, index) => (
                            <VillagerTab
                                id={index}
                                index={dreamie.id}
                                villager={dreamie.name}
                                species={dreamie.species}
                                personality={dreamie.personality}
                                icon={dreamie.icon}
                                search="dreamie"
                                remove={this.removeVillager}
                            />
                        ))}
                    </div>
                </div>
                <SubmitButton click={this.searchDreamies} />
            </div>
        );
    }
}

export default CurrentResidents;