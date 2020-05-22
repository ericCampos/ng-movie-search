const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/movie-search'));
app.get('/*', function(req, res) {
	res.sendFile('index.html', { root: './dist/movie-search' });
});

app.listen(process.env.PORT || 8080);
