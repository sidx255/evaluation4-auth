
const bcrypt = require('bcrypt');


const hashPass = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // console.log(password, salt);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const checkAuth = async (plaintext, hashedpass) => {
  const result = await bcrypt.compare(plaintext, hashedpass);
  // const hashed = await hashPass(plaintext);
  //console.log(result);

  return result;
};

module.exports = {
  hashPass,
  checkAuth
};