const axios = require('axios');

export const apiRequest = {
// GET REQUEST
getTodos: () => {

//   axios({
//       method: 'get',
//       url: 'https://jsonplaceholder.typicode.com/todos'
//   })
//   .then(res => console.log(res));
//   .catch(err => console.error(err));
console.log('GET Request');
},
// POST REQUEST
addTodo: () => {
  console.log('POST Request');
},
// PUT/PATCH REQUEST
updateTodo: () => {
  console.log('PUT/PATCH Request');
},
// DELETE REQUEST
removeTodo: () => {
  console.log('DELETE Request');
},
// SIMULTANEOUS DATA
getData: () => {
  console.log('Simultaneous Request');
},
// CUSTOM HEADERS
customHeaders: () => {
  console.log('Custom Headers');
},
// TRANSFORMING REQUESTS & RESPONSES
transformResponse: () => {
  console.log('Transform Response');
},
// ERROR HANDLING
errorHandling: () => {
  console.log('Error Handling');
},
// CANCEL TOKEN
cancelToken: () => {
  console.log('Cancel Token');
}
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser



// Event listeners
document.getElementById('get').addEventListener('click', apiRequest.getTodos);
document.getElementById('post').addEventListener('click',  apiRequest.addTodo);
document.getElementById('update').addEventListener('click',  apiRequest.updateTodo);
document.getElementById('delete').addEventListener('click',  apiRequest.removeTodo);
document.getElementById('sim').addEventListener('click',  apiRequest.getData);
document.getElementById('headers').addEventListener('click',  apiRequest.customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', apiRequest.transformResponse);
document.getElementById('error').addEventListener('click',  apiRequest.errorHandling);
document.getElementById('cancel').addEventListener('click',  apiRequest.cancelToken);
