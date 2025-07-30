const { Company, User, cloudinary, transporter, bcrypt, jwt, fs, nodemailer, validationResult } = require('./utils')

exports.login_get = (req, res) => {
    res.render('pages/auth/login', { title: 'Login' });
}


exports.login_post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array().map(e => e.msg).join(', '));
    return res.redirect('/login');
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }

    
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET_KEY, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax', 
      secure: process.env.NODE_ENV === 'production', 
    });

    return res.redirect('/dashboard');

  } catch (error) {
    console.error('Login error:', error);
    req.flash('error', 'Server error. Please try again later.');
    return res.redirect('/login');
  }
};

exports.logout_get = (req, res) => {
  res.clearCookie('connect.sid');
  res.clearCookie('jwt');
  req.flash('success', 'You have been logged out successfully.');
  return res.redirect('/login');
};