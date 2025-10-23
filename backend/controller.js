// #NOTE validasi login

import User from "../models/user.js"

const postSignin = async (req, res) => {
    const { username, password } = req.body;
    if (!username) return res.send(responseJson(true, "username wajib diisi"));
    if (!password) return res.send(responseJson(true, "password wajib diisi"));
    const user = await User.findOne({ where: { username } });
    if (user) {
      const verifyPassword = verify(password, user.password);
      const token = createToken(user["id"], user["id_role"]);
      if (verifyPassword)
        return res.send(
          responseJson(false, "Login successfully", {
            user: {
              id: user["id"],
              username: user["username"],
              name: user["name"],
              id_role: user["id_role"],
              id_class: user["id_class"],
            },
            token,
          })
        );
      return res.send(responseJson(true, "Try again, Password is wrong!"));
    }
    return res.send(
      responseJson(true, "Try again, Username or Password is wrong!")
    );
  };