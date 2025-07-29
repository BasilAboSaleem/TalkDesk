const Company = require('../../models/Company');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

 // Configuration cloudinary اعدادات الكلاودنري
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

// اعدادت ارسال إيميل التحقق 
 const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}); 

exports.registerCompany_get = (req, res) => {
  res.render('pages/auth/registerCompany', {
    title: 'Register Company'
  });
}

exports.registerCompany_post = async (req, res) => {
  try {
    const { company, user } = req.body;
    const errors = {};

    // تحقق من الحقول الأساسية
    if (await Company.findOne({ name: company.name })) {
      errors['company.name'] = 'Company name already exists';
    }
    if (await Company.findOne({ email: company.email })) {
      errors['company.email'] = 'Company email already exists';
    }
    if (await Company.findOne({ subdomain: company.subdomain })) {
      errors['company.subdomain'] = 'Subdomain is already taken';
    }
    if (await User.findOne({ email: user.email })) {
      errors['user.email'] = 'Admin email is already registered';
    }

    // تحقق من تطابق الباسوورد
    if (user.password !== user.confirmPassword) {
      errors['user.password'] = 'Passwords do not match';
    }

    // تحقق من قوة الباسوورد
    const password = user.password;
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||    
      !/[0-9]/.test(password)      
    ) {
      errors['user.password'] = 'Password must be at least 8 characters long, include at least one uppercase letter and one number';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // إذا كان هناك لوجو، ارفعه إلى Cloudinary
    let logoUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'TalkDesk/CompanyLogos',
        use_filename: true,
        unique_filename: false,
      });
      logoUrl = result.secure_url;
    
      // حذف الملف المؤقت
  fs.unlink(req.file.path, (err) => {
    if (err) console.error('Failed to delete temp file:', err);
  });
}


    // إنشاء الشركة
    const newCompany = new Company({
      name: company.name.trim(),
      email: company.email.trim(),
      subdomain: company.subdomain.trim(),
      logo: logoUrl || null,
      industry: company.industry || '',
      description: company.description || '',
      defaultLanguage: company.defaultLanguage || 'en',
      defaultTheme: company.defaultTheme || 'light',
      isActive: false,
      settings: {},
      // اللوجو يجب تعامله بشكل منفصل لو في رفع ملف
    });
    await newCompany.save();
    console.log('Company created:', newCompany);


    // انشاء الادمن 
    const newUser = new User({
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password, // سيتم تشفيره في pre save داخل المودل 
      role: 'admin',
      company: newCompany._id,
      department: user.department || null,
      language: newCompany.defaultLanguage,
      theme: newCompany.defaultTheme,
      status: 'offline',
      profileImage: null,
    });
    await newUser.save();
    console.log('Admin user created:', newUser);



     //  إنشاء توكن تحقق صالح لمدة يوم
    const verifyToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWTSECRET_KEY,
      { expiresIn: '1d' }
    );

    // إرسال إيميل التحقق
    const verifyLink = `${process.env.BASE_URL}/verify-email/${verifyToken}`;
    await transporter.sendMail({
      from: `"TalkDesk" <${process.env.EMAIL_USER}>`,
      to: newUser.email,
      subject: 'Verify your email',
      html: `
        <h2>Welcome to TalkDesk, ${newUser.name}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verifyLink}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `
    });
    console.log("Verification email sent to:", newUser.email);

    // سيتم التوجيه بشكل افضل لاحقا بعد التيست
    res.status(201)
  } catch (err) {
    console.error(err);
    res.status(500).render('pages/error/500', { title: 'Server Error' });
  }
};
