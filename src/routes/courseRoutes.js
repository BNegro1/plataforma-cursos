const fs = require('fs');
const path = require('path');

const courseRoutes = {
    handleCourseList: (req, res) => {
        const filePath = path.join(__dirname, '../views/courses', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error al cargar cursos');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
};

module.exports = courseRoutes;
