const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(__dirname));

// 모든 라우트에 대해 index.html 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 