import { axios } from "../../../lib/axios";

export const fetchUserBookListApi = (status: string) => {
    return axios.get(`/api/mypage/reading-list/${status}`);
};
