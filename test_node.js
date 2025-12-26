
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function test() {
    try {
        // 1. Login
        const loginRes = await axios.post('http://localhost:5000/api/login', {
            username: 'demo',
            password: 'demo@1234'
        });
        const token = loginRes.data.token;
        console.log('Login successful');

        // 2. Create Project
        const form = new FormData();
        form.append('title', 'Node Test Project');
        form.append('description', 'Testing liveLink with node script');
        form.append('technologies', 'Node, Axios');
        form.append('link', 'http://github.com/node/test');
        form.append('liveLink', 'http://node-test.com/live');

        // Dummy file buffer
        form.append('image', Buffer.from('dummy image'), 'test.png');

        const config = {
            headers: {
                ...form.getHeaders(),
                'Authorization': `Bearer ${token}`
            }
        };

        const createRes = await axios.post('http://localhost:5000/api/projects', form, config);
        console.log('Project Created Result:', createRes.data);

        if (createRes.data.liveLink === 'http://node-test.com/live') {
            console.log('SUCCESS: liveLink matches.');
        } else {
            console.log('FAILURE: liveLink does NOT match.');
        }

    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
}

test();
