import { baseUrl } from "./baseURL"
import { commonAPI } from "./commonAPI"

export const registerAPI = async (reqBody) => {
    return await commonAPI('POST', `${baseUrl}/register`, reqBody)
}

export const loginAPI = async (reqBody) => {
    return await commonAPI('POST', `${baseUrl}/login`, reqBody)
}

export const uploadRecipeAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${baseUrl}/upload-recipe`, reqBody, reqHeader)
}

export const getAllRecipeAPI = async (searchkey) => {
    return await commonAPI('GET', `${baseUrl}/get-all-recipe?search=${searchkey}`)
}

export const getUserRecipesAPI = async (reqHeader) => {
    return await commonAPI('GET', `${baseUrl}/user-recipe`, "", reqHeader)
}

export const deleteUserRecipesAPI = async (id, reqHeader) => {
    return await commonAPI('DELETE', `${baseUrl}/delete-recipe/${id}`, {}, reqHeader)
}

export const getRecipeAPI = async (id) => {
    return await commonAPI('GET', `${baseUrl}/get-recipe/${id}`)
}

export const updateProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI('PUT', `${baseUrl}/update-profile`, reqBody, reqHeader)
}

export const editRecipeAPI = async (id, reqBody, reqHeader) => {
    return await commonAPI('PUT', `${baseUrl}/edit-recipe/${id}`, reqBody, reqHeader)
}

export const getAUserAPI = async (id) => {
    return await commonAPI('GET', `${baseUrl}/user-profile/${id}`)
}

export const getAUserRecipeAPI = async (id) => {
    return await commonAPI('GET', `${baseUrl}/user-recipes/${id}`)
}