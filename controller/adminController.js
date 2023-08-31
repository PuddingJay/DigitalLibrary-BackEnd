const models = require('../Config/model/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {}

controller.getAdmin = async (req, res) => {
  try {
    // await models.akun.destroy({
    //   where: { idAkun: 9 }
    // })

    const admins = await models.akun.findAll({
      attributes: ['nama', 'username', 'role'],
      where: { role: ['admin', 'superadmin'] },
    })

    if (admins.length > 0) {
      res.status(200).json({ message: 'Data admin', data: admins })
    } else {
      res.status(404).json({ message: 'Tidak ada data' })
    }
  } catch (err) {
    console.log(err)
  }
}

controller.register = async (req, res) => {
  const { nama, username, password, confPassword, role } = req.body
  if (password !== confPassword)
    return res.status(400).json({
      message: 'Password tidak sama',
    })

  try {
    const existingAdmin = await models.akun.findOne({
      where: {
        username: username,
      },
    })

    if (existingAdmin) {
      return res.status(400).json({
        message: 'Username already exists',
      })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    await models.akun.create({
      nama: nama,
      username: username,
      role: role || 'admin',
      password: hashPassword,
    })
    res.json({
      message: 'Register Success',
    })
  } catch (err) {
    console.log(err)
  }
}

controller.login = async (req, res) => {
  try {
    const admin = await models.akun.findAll({
      where: {
        username: req.body.username,
      },
    })

    const match = await bcrypt.compare(req.body.password, admin[0].password)
    if (!match) return res.status(400).json({ message: 'Wrong Password' })

    const name = admin[0].nama
    const username = admin[0].username
    const role = admin[0].role
    const accessToken = jwt.sign({ name, username, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    })
    const refreshToken = jwt.sign({ name, username, role }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    })

    await models.akun.update(
      { refreshToken: refreshToken },
      {
        where: {
          idAkun: admin[0].idAkun,
        },
      },
    )

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   secure : true
    // })

    res.json({ accessToken, refreshToken })
    console.log(refreshToken)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Username tidak ditemukan' })
  }
}

controller.updateAdmin = async (req, res) => {
  try {
    const { name, username, prevPassword, newPassword, confirmNewPassword } = req.body
    const adminId = req.params.adminId
    console.log(adminId)

    if (!adminId) {
      return res.status(400).json({ message: 'Invalid admin ID' })
    }

    // Find the existing admin by ID
    const admin = await models.akun.findOne({
      where: {
        idAkun: adminId,
      },
    })

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' })
    }

    if (newPassword) {
      if (!prevPassword) {
        return res.status(400).json({ message: 'Password sebelumnya harus disediakan' })
      }

      const match = await bcrypt.compare(prevPassword, admin.password)
      if (!match) {
        return res.status(400).json({ message: 'Password sebelumnya salah' })
      }

      // Check if newPassword is at least 5 characters long
      if (newPassword.length < 5) {
        return res
          .status(400)
          .json({ message: 'Password baru harus terdiri dari minimal 5 karakter' })
      }
    }

    // Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Password baru dan konfirmasi password tidak cocok' })
    }

    // Update the admin data
    await models.akun.update(
      {
        nama: name || admin.nama,
        username: username || admin.username,
        password: newPassword
          ? await bcrypt.hash(newPassword, await bcrypt.genSalt())
          : admin.password,
      },
      {
        where: {
          idAkun: adminId,
        },
      },
    )

    res.json({ message: 'Berhasil ubah data admin' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

controller.logout = async (req, res) => {
  try {
    const refreshToken = req.params.refreshToken
    if (!refreshToken) {
      return res.sendStatus(204)
    }

    const admin = await models.akun.findOne({
      where: {
        refreshToken: refreshToken,
      },
    })

    if (!admin) {
      return res.sendStatus(204)
    }

    const adminId = admin.idAkun

    await models.akun.update(
      { refreshToken: null },
      {
        where: {
          idAkun: adminId,
        },
      },
    )

    // res.clearCookie('refreshToken');
    return res.json({ message: 'Logout' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = controller
