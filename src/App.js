import React, { Component } from 'react';
import CurrentResidents from "./components/CurrentResidents";
import API from "./utils/API";
import './App.css';

class App extends Component {
	state = {
		villagers: []
	}

	componentDidMount() {
		this.allVillagers();
	}

	allVillagers = () => {
		API.villagerInfo().then(response => {
			const villagers = [];
			for (let i = 0; i < response.data.length; i++) {
				let villagerObj = {
					"name": response.data[i]["name"]["name-USen"],
					"species": response.data[i]["species"],
					"personality": response.data[i]["personality"],
					"icon": response.data[i]["icon_uri"]
				};
				villagers.push(villagerObj);
			}
			this.setState({ villagers: villagers });
		});
	}

	render() { 
		return (
			<CurrentResidents villagers={this.state.villagers} />
		);
	}
}

export default App;
