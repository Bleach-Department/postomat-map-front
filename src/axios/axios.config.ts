import axios from "axios";

const $api = axios.create({
  baseURL: "", // !! Server URL
});

/*
...axios.interceports если понадобяться
*/

export default $api;
