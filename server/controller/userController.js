const registerUser = async (req, res) => {
  console.log("register");
  res.send("register user");
};

const getAllUsers = async (req, res) => {
  console.log("get all users");
  res.send("get all users");
};

module.exports = {
  registerUser,
  getAllUsers,
};
