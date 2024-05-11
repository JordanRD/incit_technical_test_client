import axios from "axios";
import { ENDPOINT } from "./constants";

const AppAxios = axios.create({
    baseURL: ENDPOINT,
    withCredentials: true,
});

export default AppAxios;
