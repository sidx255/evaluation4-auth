const services = require('../services/authService');

const addUser = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await services.addUser({ email, password });
    res.status(201).json(user);
  }
  catch(error){
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try{
    const matchUser = await services.verifyUser(req.body);
    res.status(200).json(matchUser);
  }
  catch(error){
    res.status(500).json(error);
  }
};

const verifyToken = async (req, res) => {
  try{
    const verify = await services.verifyJWT(req.headers.authorization);
    if(verify){
      res.status(200).json({success:true});
    }
  }
  catch(error){
    res.status(401).json({error:error.message,success:false});
  }
};

module.exports = {
  addUser,
  login,
  verifyToken
};
