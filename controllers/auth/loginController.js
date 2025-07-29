const { Company, User, cloudinary, transporter, bcrypt, jwt, fs, nodemailer, validationResult } = require('./utils')

exports.login_get = (req, res) => {
    res.render('pages/auth/login', { title: 'Login' });
}

