import { axios } from "../../../lib/axios";

const logout = () => {
    axios.get("/sanctum/csrf-cookie").then(() => {
        return axios.post("/api/logout", {});
    });
};

// const signout = () => {
//     return axios.post("/api/logout", {}).then(() => {
//         setUser(null);
//     });
// };

// auth?.signout().then(() => {
//     history.push("/login");
// });
