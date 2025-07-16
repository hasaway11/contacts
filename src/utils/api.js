import axios from "axios";

const axiosInstance = axios.create({baseURL: "https://sample.bmaster.kro.kr/" });

export const readAll = (pageno, pagesize)=>axiosInstance.get(`/contacts?pageno=${pageno}&pagesize=${pagesize}`).then(data=>data);

export const read = (no)=>axiosInstance.get(`/contacts/${no}`);

export const create = (obj)=>axiosInstance.post('/contacts', new URLSearchParams(obj));

export const update = (obj, no)=>axiosInstance.put(`/contacts/${no}`, new URLSearchParams(obj));

export const remove = (no)=>axiosInstance.delete(`/contacts/${no}`)

export const createPhoto = (formData, no)=>axiosInstance.post(`/contacts/${no}/photo`, formData);
