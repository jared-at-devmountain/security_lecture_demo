const bcrypt = require('bcrypt');

module.exports = {
  signup: (req, res) => {
    const {email, password} = req.body
    saltRounds = 10
    bcrypt.hash(password, saltRounds, (err, passwordHash)  => {
      if(!err) {
        let newDatabaseEntry = {}
        newDatabaseEntry.email = email
        newDatabaseEntry.password = passwordHash
        newDatabaseEntry.destiny = destinies[Math.floor(Math.random() * destinies.length)]
        console.log('\nNew database entry:')
        console.log(newDatabaseEntry)
        database.push(newDatabaseEntry)
        res.status(200).send({success: true});
      } else {
        console.log('Error during bycrypt.hash(): ' + err);
        res.status(400).send({success: false});
      }
    })

  },
  login: (req, res) => {
    const {email, password} = req.body
    let userData

    for (let i=0; i<database.length; i++) {
      if (email === database[i].email) {
        userData = database[i]
      }
    }

    if (!userData) {
      res.status(200).send({success: false});
    } else {
      bcrypt.compare(password, userData.password, function(err, result) {
        if(!err) {
          const destinyIntro = 'Your final destiny is to '
          res.status(200).send({success: true, destiny: userData.destiny, intro: destinyIntro});
        } else {
          console.log('Error during bycrypt.compare(): ' + err);
          res.status(400).send({success: false});
        }
      })
    }

    
  }
}



const database = [
  {
    email:'john@gmail.com',
    passwordHash:'fj384js*)le!k3484jlsl5)5le5i3mf',
    destiny:'becoming the new Santa'
  },
  {
    email:'sallybonnet@yahoo.com',
    passwordHash:'8iej^l2%lsdfj3209dkfjw',
    destiny:'becoming best friends with Martha Stewart'
  },
]



const destinies = [
  'become a karen/kareno by age 37 and to be despised by all retail store employees',
  'become a well-respected bartender',
  'cure cancer',
  'assassinate Putin with your bare fists and escape',
  'assassinate Putin with your bare fists and not escape',
  'attempt to assassinate Putin with your bare fists and find out he is flippn\' good at martial arts (you don\'t escape)',
  'become a bear whisperer',
  'become a hoarder and have your living room stacked to the ceiling with tupperware full of dead bugs you\'ll find in your driveway over the years',
  'become the lead in a high-budget film, filling in for Henry Cavill when he unexpectedly goes MIA',
  'summit Everest',
  'become the next Bruce Willis',
  'get a Donald Trump tattoo from shoulder to shoulder',
  'get an "I Love Biden" tattoo, with his face included, that takes up your whole back',
]