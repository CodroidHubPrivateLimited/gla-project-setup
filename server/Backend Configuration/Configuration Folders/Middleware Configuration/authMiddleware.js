const jwt = require('jsonwebtoken');

// Protected routes ke liye — Authorization header me "Bearer <token>" check karta hai
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token nahi mila, login karo' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Access token expired ya invalid hai' });
  }
};

module.exports = { protect };