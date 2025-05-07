const jwt = require('jsonwebtoken');



const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return decodedToken;
    } catch (error) {
        return null;
    }
};
const decodeToken = (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { name, email, password } = decoded;
    return { name, email, password };
};


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};



module.exports={verifyToken,authenticateToken}


