import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://api.airtable.com/v0/appWE62HgQg8yZggo'
})

instance.defaults.headers.common['Authorization'] ='Bearer keyntfXx888yZ4url'

export default instance