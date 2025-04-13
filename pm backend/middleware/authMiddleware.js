// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // You're good, go ahead
    }
    return res.status(401).json({ message: "You need to be logged in, love." });
  };
  
  export default authMiddleware;
  