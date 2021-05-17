import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://18d20caa.us-south.apigw.appdomain.cloud/catsh-entries-post'
})

export default instance