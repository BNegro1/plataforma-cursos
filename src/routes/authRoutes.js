const fs = require('fs');
const path = require('path');
const usersController = require('../controllers/courses/usersController');

const authRoutes = {
    handleLogin: (req, res) => {
        if (req.method === 'GET') {
            const filePath = path.join(__dirname, '../views', 'login.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error al cargar login.html');
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else if (req.method === 'POST') {
            usersController.login(req, res);
        }
    },

    handleRegister: (req, res) => {
        if (req.method === 'GET') {
            const filePath = path.join(__dirname, '../views', 'registro.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error al cargar registro.html');
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
        } else if (req.method === 'POST') {
            usersController.register(req, res);
        }
    },

    handleLogout: (req, res) => {
        usersController.logout(req, res);
    }
};

module.exports = authRoutes;
