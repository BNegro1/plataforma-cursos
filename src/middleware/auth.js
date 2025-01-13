const usersController = require('../controllers/courses/usersController');

const auth = {
    // Verifica si hay usuario logueado
    isAuthenticated: (req, res, next) => {
        const currentUser = usersController.getCurrentUser();
        if (!currentUser) {
            res.writeHead(302, { Location: '/login?error=auth' });
            return res.end();
        }
        req.user = currentUser;
        next();
    },

    // Verifica si el usuario es admin
    isAdmin: (req, res, next) => {
        const currentUser = usersController.getCurrentUser();
        if (!currentUser || !usersController.isAdmin(currentUser)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            return res.end('Acceso denegado');
        }
        next();
    },

    // Verifica si NO hay usuario logueado (para login/register)
    isGuest: (req, res, next) => {
        const currentUser = usersController.getCurrentUser();
        if (currentUser) {
            res.writeHead(302, { Location: '/' });
            return res.end();
        }
        next();
    }
};

module.exports = auth;
