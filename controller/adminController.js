const models = require('../Config/model/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controller = {};

controller.getAdmin = async (req, res) => {
  try {
    const admins = await models.admin.findAll(
      {
        attributes: ['id', 'name', 'username']
      }
    );
    res.json(admins)
  } catch (err) {
    console.log(err);
  }
}

controller.register = async (req, res) => {
  const { name, username, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({
      message: "Password tidak sama"
    });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await models.admin.create({
      name: name,
      username: username,
      password: hashPassword,
    });
    res.json({
      message: "Register Success"
    });
  } catch (err) {
    console.log(err);
  }
}

controller.login = async (req, res) => {
  try {
    const admin = await models.admin.findAll({
      where: {
        username: req.body.username
      }
    });

    const match = await bcrypt.compare(req.body.password, admin[0].password);
    if (!match)
      return res.status(400).json({ message: "Wrong Password" });

    const adminId = admin[0].id;
    const name = admin[0].name;
    const username = admin[0].username;
    const accessToken = jwt.sign({ adminId, name, username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    const refreshToken = jwt.sign({ adminId, name, username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    await models.admin.update({ refreshToken: refreshToken }, {
      where: {
        id: adminId
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true
    })
    res.json({ accessToken })
    console.log(refreshToken)

  } catch (err) {
    res.status(404).json({ message: "Username tidak ditemukan" })
  }
}

controller.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const admin = await models.admin.findOne({
      where: {
        refreshToken: refreshToken
      }
    });

    if (!admin) {
      return res.sendStatus(204);
    }

    const adminId = admin.id;

    await models.admin.update({ refreshToken: null }, {
      where: {
        id: adminId
      }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = controller;
