import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req._id = decoded.userId; 
        console.log(req._id)
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', success: false, error: true });
    }
}

export default authenticate;
