var jwt = require("jsonwebtoken");
const UserModel = require("../models/User")
const rateLimit = require("express-rate-limit");


//دالة لفحص تسجيل الدخول قبل السماج للمستخدم بالذهاب للراوت المطلوب
const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.JWTSECRET_KEY, (err) => {
            if(err){
                res.redirect("/signin")
            }else{
                next()
            }
            
        })

}else{
    res.redirect("/signin")
}

}
//دالة لفحص تسجيل المستخدم وارسال بياناته عير متغير الى الفرونت لاستخدامها
const checkIfUser =  (req, res, next) => {
 
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWTSECRET_KEY, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        req.user = null; 
        next();
      } else {
        const currentUser = await UserModel.findById(decoded.id);
        res.locals.user = currentUser;
        req.user = currentUser  
        next();
      }
    });
  } else {
    res.locals.user = null;
    req.user = null; 
    next();
  }
};

//دوال لفحص صلاحيات المستخدم
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.render("pages/error/403", {
            title: "Access Denied",
            message: "You do not have permission to access this page."
        });
    }
}

const isEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'employee') {
        next();
    } else {
        res.render("pages/error/403", {
            title: "Access Denied",
            message: "You do not have permission to access this page."
        });
    }
}

const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'superadmin') {
        next();
    } else {
        res.render("pages/error/403", {
            title: "Access Denied",
            message: "You do not have permission to access this page."
        });
    }
}

// استيراد مكتبة rate-limit الخاصة بتقييد محاولات تسجيل الدخول
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 دقائق
  max: 5, // يسمح بـ 5 محاولات فقط خلال 10 دقائق من نفس الـ IP
  message: {
    error: "Too many login attempts. Please try again after 10 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
    requireAuth,
    checkIfUser,
    isAdmin,
    isEmployee,
    isSuperAdmin,
    loginLimiter
 
}