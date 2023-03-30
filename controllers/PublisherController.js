
const Publisher = require('../models/Publisher');

exports.getPublisherPage = async (req, res) => {

    const publisher = await Publisher.findAll({ raw: true });
    
    res.status(200).render('publisher/publisher', {
        pageName: 'publisher',
        publisher,
        hasPublisher: publisher.length > 0
    });
};

exports.getCreate = (req, res) => {
    res.status(200).render('publisher/save', {
        pageName: 'Create publisher',
        editMode: false
    });
};

exports.postCreate = (req, res) => {
    const { body } = req;
    const { Name, Phone, Country } = body;

    if (!Name && !Phone && !Country) {
        return res.status(400).redirect('/publisher');
    } 
    
    Publisher.create({name: Name, phoneNumber: Phone, country: Country}).then( () => {
        return res.status(200).redirect('/publisher');
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/publisher');
    });
};


exports.getEdit = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/publisher');
    }

    Publisher.findOne({where: {id: Id}}).then(result => {
        res.status(200).render('publisher/save', {
            pageName: 'Edit publisher',
            editMode: true,
            publisher: result.dataValues
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/publisher');
    });
};


exports.postEdit = (req, res) => {
    const { body } = req;
    const { Name, Phone, Country, publisherId } = body;

    !publisherId ?  res.redirect('/publisher') : '';

    if (!Name && !Phone && !Country) {
        return res.status(400).redirect('/publisher');
    } 
    
    Publisher.update(
        {name: Name, phoneNumber: Phone, country: Country}, 
        {where: {id: publisherId}} 
    ).then( () => {

        return res.status(200).redirect('/publisher');

    }).catch(err => {

        console.log(err);
        return res.status(500).redirect('/publisher');
    });
};


exports.Delete = (req, res) => {
    
    const Id = req.params.Id;
    
    if (!Id) {
        return res.status(500).redirect('/publisher');
    }

    Publisher.findOne({where: {id: Id}}).then(result => {

        const publisherFound = result.dataValues;

        Publisher.destroy({where: {id: publisherFound.id}}).then( () =>{
            res.status(200).redirect('/publisher');
        });

    }).catch(err => {
        console.log(err);
        return res.status(500).redirect('/publisher');
    });
};