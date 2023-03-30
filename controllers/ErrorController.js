exports.get404 = (req, res) => {
    res.status(200).render('404', {
        pageName: '404'
    });
};