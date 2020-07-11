import axios from "axios";

export default {
    villagerInfo: () => {
        return axios.get(`https://acnhapi.com/v1a/villagers/`);
    }
}