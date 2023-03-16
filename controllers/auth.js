const register = async (req, res) => {
  res.send("Register User!");
};

const login = async (req, res) => {
  res.send("LogIn User!");
};

module.exports = {
  register,
  login,
};
