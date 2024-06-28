const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Div element where results will be displayed
const results = document.getElementById('results');

// Function to clear the previous results
function clearResults(){
    results.innerHTML = '';
}

// Function to get all posts
function getAllPosts(){
    clearResults(); // clear previous results

    // Fetch all the posts from the API
    fetch(apiUrl)
        .then((response) => response.json()) // parse JSON response
        .then((data) => displayResults(data))
        .catch(error => console.error('Error:', error));
}

// Function to get post with ID 10
function getPosts10(){
    clearResults();
    fetch(`${apiUrl}/10`)
        .then((response) => response.json())
        .then((data) => displayResults([data])) // data in array to reuse displayResults
        .catch(error => console.error('Error:', error));
}

// Function to create a new post
function createNewPost() {
    clearResults();
    const newPost = {
        title: 'Hello',
        body: 'Kitty',
        userId: 1
    };
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    })
    .then(response => response.json())
    .then(data => {
        console.log('New post ID:', data.id);
        displayResults([data]);
    })
    .catch(error => console.error('Error:', error));
}

// Function to update post with ID 12
function replacePost12() {
    clearResults();
    const updatedPost = {
        id: 12,
        title: 'Updated Title',
        body: 'Updated Body',
        userId: 1
    };

    fetch(`${apiUrl}/12`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    })
    .then(response => response.json())
    .then(data => displayResults([data]))
    .catch(error => console.error('Error:', error));
}

// Function to update the title of post with ID 12
function updateTitlePost12() {
    clearResults();
    const updatedTitle = {
        title: 'New Title for Post 12'
    };

    fetch(`${apiUrl}/12`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTitle)
    })
    .then(response => response.json())
    .then(data => displayResults([data]))
    .catch(error => console.error('Error:', error));
}

// Function to delete post with ID 12
function deletePost12() {
    clearResults();
    fetch(`${apiUrl}/12`, {
        method: 'DELETE'
    })
    .then(() => {
        const message = { message: 'Post 12 deleted successfully' };
        displayResults([message]);
    })
    .catch(error => console.error('Error:', error));
}

// Render results using HTML elements
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('result-item');
        itemDiv.innerHTML = `
            <p><strong>ID:</strong> ${item.id || ''}</p>
            <p><strong>Title:</strong> ${item.title || ''}</p>
            <p><strong>Body:</strong> ${item.body || item.message || ''}</p>
        `;
        resultsDiv.appendChild(itemDiv);
    });
}
