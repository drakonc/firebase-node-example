const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');    


var serviceAccount = require("../../../node-firebase-example-8f59c-firebase-adminsdk-8lheq-d6e01a4eff.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-example-8f59c.firebaseio.com/'
});

const db = admin.database();

router.get('/',(req, res) => {
    db.ref('contactos').once('value', (snaphot)=>{
       const data = snaphot.val();
       res.status(200).render('index',{contactos: data})
    });
});

router.post('/new-contact',(req,res)=>{
    console.log(req.body);
    const newcontacto = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    };
    db.ref('contactos').push(newcontacto);
    res.redirect('/');
});

router.get('/delete-contac/:id',(req,res) => {
    const id = req.params.id;
    db.ref('contactos/'+id).remove();
    res.redirect('/');
});

module.exports = router;