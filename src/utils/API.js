import axios from "axios";

export default {
    findVillagers: () => {
        return axios.get(`https://nookipedia.com/api/endpoint/apollo`);
    }
}