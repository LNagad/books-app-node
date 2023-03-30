exports.getHome = (req, res) => {
    res.status(200).render('home', {
        pageName: 'Home'
    });
};

