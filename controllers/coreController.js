

exports.landing_get = (req, res) => {
  res.render('landing', {
    title: 'Home'
  });
};

exports.dashboard_get = (req, res) => {
  res.render('index', {
    title: 'Dashboard'
  });
};
