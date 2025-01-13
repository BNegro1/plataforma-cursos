const validation = {
    // Valida datos de registro
    validateRegister: (req, res, next) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            // Validaciones
            if (!name || name.length < 3) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Nombre inválido (mínimo 3 caracteres)');
            }

            if (!email || !email.includes('@')) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Email inválido');
            }

            if (!password || password.length < 6) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Contraseña inválida (mínimo 6 caracteres)');
            }

            // Si pasa validaciones, guarda datos en req
            req.validatedData = { name, email, password };
            next();
        });
    },

    // Valida datos de login
    validateLogin: (req, res, next) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const email = formData.get('email');
            const password = formData.get('password');

            if (!email || !password) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Email y contraseña son requeridos');
            }

            req.validatedData = { email, password };
            next();
        });
    },

    // Valida campos generales
    validateRequired: (fields) => {
        return (req, res, next) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const formData = new URLSearchParams(body);
                const missing = fields.filter(field => !formData.get(field));
                
                if (missing.length > 0) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    return res.end(`Campos requeridos: ${missing.join(', ')}`);
                }

                req.validatedData = Object.fromEntries(formData);
                next();
            });
        };
    }
};

module.exports = validation;
