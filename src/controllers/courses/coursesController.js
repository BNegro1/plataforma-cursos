const fs = require('fs');
const path = require('path');
const Course = require('../../models/Course');

const getCourses = (req, res) => {
    Course.getAllCourses((err, courses) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Error al cargar los cursos');
        }
        const filePath = path.join(__dirname, '../views', 'curso-marketing.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const html = fs.readFileSync(filePath, 'utf8');
        res.end(html.replace('{{courses}}', JSON.stringify(courses)));
    });
};

const getCourseById = (req, res, id) => {
    Course.getCourseById(id, (err, course) => {
        if (err || !course) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Curso no encontrado');
        }
        const filePath = path.join(__dirname, '../views', 'curso-excel.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(filePath, 'utf8').replace('{{course}}', JSON.stringify(course)));
    });
};

module.exports = { getCourses, getCourseById };
