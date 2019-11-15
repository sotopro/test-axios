const axios = require('axios')
const showOutput = require('./showOutput')

// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const apiRequest = {
	// GET REQUEST
	getTodos: async () => {
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/todos',
				{ params: { _limit: 5 } }
			)
			showOutput(response)
		} catch (error) {
			console.error(error)
		}
	},
	// POST REQUEST
	addTodo: async () => {
		try {
			const resData = await axios.post(
				'https://jsonplaceholder.typicode.com/todos',
				{
					title: 'New Todo',
					completed: false
				}
			)
			showOutput(resData)
		} catch (error) {
			console.log(error)
		}
	},
	// PUT/PATCH REQUEST
	updateTodo: async () => {
		try {
			const res = await axios.patch(
				'https://jsonplaceholder.typicode.com/todos/1',
				{
					title: 'modified todo',
					completed: true
				}
			)
			showOutput(res)
		} catch (error) {
			console.log(error)
		}
	},
	// DELETE REQUEST
	removeTodo: async () => {
		try {
			const res = await axios.delete(
				'https://jsonplaceholder.typicode.com/todos/1'
			)
			showOutput(res)
		} catch (error) {
			console.log(error)
		}
	},
	// SIMULTANEOUS DATA
	getData: () => {
		axios
			.all([
				axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
				axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
			])
			.then(axios.spread((todos, posts) => showOutput(posts)))
			.catch(err => console.error(err))
	},
	// CUSTOM HEADERS
	customHeaders: async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'sometoken'
			}
		}
		try {
			const resData = await axios.post(
				'https://jsonplaceholder.typicode.com/todos',
				{
					title: 'Something todo',
					completed: false
				},
				config
			)
			showOutput(resData)
		} catch (error) {
			console.log(error)
		}
	},
	// TRANSFORMING REQUESTS & RESPONSES
	transformResponse: async () => {
		const options = {
			method: 'post',
			url: 'https://jsonplaceholder.typicode.com/todos',
			data: {
				title: 'Sup!'
			},
			transformResponse: axios.defaults.transformResponse.concat(data => {
				data.title = data.title.toUpperCase()
				return data
			})
		}
		const res = await axios(options)
		showOutput(res)
	},
	// ERROR HANDLING
	errorHandling: async () => {
		try {
			const res = await axios.get('https://jsonplaceholder.typicode.com/todoss')
			showOutput(res)
		} catch (err) {
			if (err.response) {
				console.log(err.response.data)
				console.log(err.response.status)
				console.log(err.response.headers)
				if (err.response.status === 404) {
					alert('Error: Page Not Found')
				}
			} else if (err.request) {
				// Request was made but no response
				console.error(err.request)
			} else {
				console.error(err.message)
			}
		}
	}
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
	config => {
		console.log(
			`${config.method.toUpperCase()} request sent to ${
				config.url
			} at ${new Date().getTime()}`
		)
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})
// Show output in browser

// Event listeners
document.getElementById('get').addEventListener('click', apiRequest.getTodos)
document.getElementById('post').addEventListener('click', apiRequest.addTodo)
document
	.getElementById('update')
	.addEventListener('click', apiRequest.updateTodo)
document
	.getElementById('delete')
	.addEventListener('click', apiRequest.removeTodo)
document.getElementById('sim').addEventListener('click', apiRequest.getData)
document
	.getElementById('headers')
	.addEventListener('click', apiRequest.customHeaders)
document
	.getElementById('transform')
	.addEventListener('click', apiRequest.transformResponse)
document
	.getElementById('error')
	.addEventListener('click', apiRequest.errorHandling)
document
	.getElementById('cancel')
	.addEventListener('click', apiRequest.cancelToken)
