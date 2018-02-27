import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://localhost:5000/api'
})

// instance.defaults.headers.common['Authorization'] ='Bearer keyntfXx888yZ4url'
// instance.defaults.headers.common['Content-type'] ='application/json'

export default instance