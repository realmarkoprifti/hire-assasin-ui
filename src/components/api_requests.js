import axios from 'axios'


const url = "https://web-production-e285.up.railway.app"


export async function get_assasins() {
    const response = await axios.get(url + "/api/get/assasins")
    return await response.data
}


export async function get_hits() {
    const response = await axios.get(url + "/api/get/hits")
    return await response.data
}


export async function get_assasination_status(track_number, captcha_value) {
    const response = await axios.post(url + "/api/track/assasination", {
        track_number: track_number,
        captcha_token: captcha_value
    })
    
    return response.data
}


export async function place_order(assasin, target, captcha_value) {
    const response = await axios.post(url + "/api/place/order", {
        assasin: assasin,
        target: target,
        captcha_value: captcha_value
    })

    return response.data
}


export async function recaptcha(value) {
    const response = await axios.post(url + "/api/verify/recaptcha", {
        captcha_value: value
    })

    return response.data
}