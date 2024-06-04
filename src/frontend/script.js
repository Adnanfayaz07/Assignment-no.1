document.getElementById('loginBtn').addEventListener('click', () => {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'user', password: 'password' })
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('sendRequestBtn').addEventListener('click', () => {
    const token = localStorage.getItem('token');
    fetch('/enqueue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ request: 'Some request data' })
    })
    .then(response => response.json())
    .then(data => {
        alert('Request sent!');
    })
    .catch(error => console.error('Error:', error));
});