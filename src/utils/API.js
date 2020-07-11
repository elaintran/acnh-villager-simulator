import axios from "axios";

export default {
    findVillagers: () => {
        return axios.get(`https://acnhapi.com/v1/villagers/`);
    }
}