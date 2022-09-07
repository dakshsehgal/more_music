import axios from 'axios'

const search = (query) => {
    return axios.get(`http://localhost:3004/api/search/${query}`)
}

const getFeatures = (id) => {
    return axios.get(`http://localhost:3004/api/features/${id}`)
}

const getRecommendation = (seed) => {
    return axios.post(`http://localhost:3004/api/recommendations`, seed)
    
}

export default {
    search, getFeatures, getRecommendation
}
