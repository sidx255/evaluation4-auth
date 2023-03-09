const db = require('../models');
const JWT = require('jsonwebtoken');
const authUtils = require('../utils/authUtils'); 

const addUser = async (data) => {
  const { email, password } = data;
  const hashedPassword = await authUtils.hashPass(password);
  return await db.user.create({ email:email, password:hashedPassword });
};

const verifyUser = async (data) => {
  const { email, password } = data;
  const user = await db.user.findOne({ where: { email } });


  if (user) {
    const passwordMatch = await authUtils.checkAuth(password, user.password);
    if (passwordMatch) {
      const token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1D' });
      //if(authUtils.verifyJWT(token)) 
      await global.redisClient.set(email, token);
      return { token: token, success: true };
    }
  }
  return false;
};

const verifyJWT = async (token) => {
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  if(!decoded) return false;
  const user = await db.user.findOne({ where: { email: decoded.email } });
  // if (user) {
  //   return true;
  // }
  // return false;
  const savedToken = await global.redisClient.get(user.email);
  if (savedToken !== token) {
    return false;
  }
  return true;
};
  

module.exports = {
  addUser,
  verifyUser,
  verifyJWT
};