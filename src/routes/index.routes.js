const {Router} = require('express');
const router =  Router();
const admin = require('firebase-admin');

//Credendciales para conectar e inicializar mi app con firebase
admin.initializeApp({
   credential: admin.credential.applicationDefault(),
   databaseURL : 'https://fir-with-nodejs.firebaseio.com/'   
});

// Conectar con mi database
const db = admin.database();

router.get('/',(req,res)=>{
   db.ref('contacts').once('value',(snapshot) =>{
      const data = snapshot.val();
      res.render('index',{contacts : data})
   })
});

router.post('/new-contact',(req,res)=>{
   console.log(req.body);
   const newContact = {
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email :req.body.email,
      phone : req.body.phone      
   }
   //Nombre de la colección
   db.ref('contacts').push(newContact)
   
   res.redirect('/');
})

router.get('/delete-contact/:id',(req,res)=>{
   db.ref('contacts/' + req.params.id).remove();
   res.redirect('/');
})
module.exports = router;