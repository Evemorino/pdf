import { AxiosResponse } from "axios";
import Axios from "../../utils/axios/axios";

const uploadUrl = "http://jpds.evdo.vip/index/ajax/upload";
const serverUrl = "http://121.37.148.60:9000";
const localUrl = "http://192.168.0.55:9001";
const url = serverUrl;

export async function imageUrl(data: string): Promise<AxiosResponse> {
  return (
    await Axios.request({
      url: uploadUrl,
      method: "POST",
      headers: {
        token: localStorage.getItem("token") as string,
      },
      data: {
        category: "exam_img",
        image: data,
      },
    })
  ).data;
}

export async function eduPaperCut(data: string): Promise<AxiosResponse> {
  return await Axios.request({
    url: url + "/eduPaperCut",
    method: "GET",
    params: {
      image: data,
    },
  });
}

export async function eduPaperStructed(data: string): Promise<AxiosResponse> {
  return await Axios.request({
    url: url + "/eduPaperStructed",
    method: "GET",
    params: {
      image: data,
    },
  });
}

export async function advanced(data: string): Promise<AxiosResponse> {
  return await Axios.request({
    url: url + "/advanced",
    method: "GET",
    params: {
      image: data,
    },
  });
}
