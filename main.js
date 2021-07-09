//AXIOS GLOBALS
//This is done to avoid writing the stuff for the Custom Headers.
//We use jwt.io (JSON Web Token)
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  /*  This is the long way to do a GET with params using axios. Under is the fast way.
  axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    params: {
      _limit: 5
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  */

  //You can do a GET without specifying it as it's a GET request by default.
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  /*  This is the long way to do a POST with params using axios. Under is the fast way.
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'New todo',
      completed: false
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  */
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New todo',
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  /*  This is the long way to do a PUT & PATCH with params using axios. Under is the fast way.
  They both need you to specify the id of the element. (.../1) and only one can be executed at a time.
  <------------------------------- PUT ------------------------------->
  It replaces the whole element.
  axios({
    method: 'put',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    data: {
      title: 'New todo',
      completed: false
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  */
    axios
    .put('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'Updated todo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  
  /*
  <------------------------------- PATCH --------------------------------->
  It replaces only the specified fields.
  axios({
    method: 'put',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'New todo',
      completed: false
    }
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  */
    axios
    .patch('https://jsonplaceholder.typicode.com/todos/2', {
      title: 'Patched todo',
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
   /*  This is the long way to do a DELETE with params using axios. Under is the fast way.
  axios({
    method: 'delete',
    url: 'https://jsonplaceholder.typicode.com/todos/1'
  })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
  */
    axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  //Get multiple resources. Axios all receives an array of requests. The response is also returned as array.
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    //Spread allows you to create a function to access the results of the requests. Is shorter than
    // access the results as "res => showOutput(res[0/1])" and better to identify each result.
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
  //Sometimes you must send data in the header (JSON WebTokens), 
  //that's why we create custom headers for those requests. A const for "header" must be sent.
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'someToken'
    }
  }

  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'Custom header',
      completed: false
    }, config)
    .then(res => showOutput(res))
    .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  //You can transform your request/response in certain ways. It's suggested to use concat
  // to add to the 'Response' instead of overwriting it. 
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }

  axios(options).then(res => showOutput(res)).catch(err => console.error(err))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
//Are used to intercept a request or response before they are handled by then or catch.
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
}, error => {
  return Promise.reject(error);
})

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);