


// http://localhost:3000/posts

const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/posts') {
        http.get('http://jsonplaceholder.typicode.com/posts', (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                const posts = JSON.parse(data);

              //  let post_list = posts.map((post, index) => {
                let post_list = posts.map((post) => {
                    return `<tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                    <td>${post.userId}</td>
                    <td>delete</td>
                    <td>update</td>
                    </tr>`;
                });

                let table = `<style> 
                table {font-family: Arial, sans-serif; border-collapse: collapse; width: 100%;}
                th, td {border: 1px solid #dddddd; text-align: left; padding: 8px;}
                th {background-color: #ffffff;}
                tr:nth-child(even) {background-color: rgb(196, 196, 196);}
                tr:nth-child(odd) {background-color: #ffffff;}
                </style>

                <table><tr>
                <th>id</th>
                <th>title</th>
                <th>body</th>
                <th>user id</th>
                <th>delete</th>
                <th>update</th>
                </tr>${post_list.join("")}</table>`;

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(table);
            });
        }).on('error', (err) => {
            console.error(`Error: ${err.message}`);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
