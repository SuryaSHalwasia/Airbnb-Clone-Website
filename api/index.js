const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const { default: mongoose } = require('mongoose')
const {userModel} = require('./models/User')
const Booking = require('./models/Booking')
const User = require('./models/User')
const Place = require('./models/Place')
require('dotenv').config()
const cookieParser  = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const dest = path.join(__dirname, 'uploads')

app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static(dest))
const bcryptSalt = bcrypt.genSaltSync(10)

const download = require('image-downloader');
const multer = require('multer');
const { AsyncLocalStorage } = require('async_hooks');




mongoose.connect(process.env.MONGO_URI)
app.get('/test', (req,res)=>{
    return res.json('Test OK')
})

function getUserDataFromToken(token){
  return new Promise((resolve, reject)=>{
    if(token){
      jwt.verify(token,process.env.JWT_TOKEN,{},async (err,user)=>{
          if(err) throw err
          resolve(user)
      })
  } else{
      return null
  }
  })
  
}

app.post('/register', async(req,res)=>{
    const {name, email, password} = req.body
    try{
    const user = await User.create({name,email,password:bcrypt.hashSync(password, bcryptSalt)})
    return res.json(user)
    }
    catch(error)
    {
        return res.status(422).json(error)
    }
})

app.post('/login', async(req,res)=>{
    try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user){
        const passwordCorrect = bcrypt.compareSync(password,user.password)
        if(passwordCorrect)
        {
            jwt.sign({email:user.email, id:user._id},process.env.JWT_TOKEN,{},(err,token)=>{
                if(err) throw err
                
                console.log(user)
                return res.cookie('token',token, { secure: true,sameSite: 'none' , path: '/'}).json(user)
            })
        }
        else
        {
            return res.status(422).json("Wrong Password")
        }
    }
    else{
        return res.json('Not found')
    }
}
catch(error){
    return res.status(500).json("Bad gateway error")
}
})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_TOKEN,{},async (err,user)=>{
            if(err) throw err
            const {name,email,_id} = await User.findById(user.id)
            res.json({name,email,_id})
        })
    } else{
        res.json(null)
    }
})

app.post('/logout', (req,res)=>{
    return res.clearCookie('token',' ',{ expires: new Date(0) }).json(true)
})

app.post('/upload-by-link', async(req,res)=>{
  try{
    const {link} = req.body
  //const imageName = 'photo' + Date.now() + '.jpg'
  
  
  //options = {
  //  url: link,
   // dest: dest + '\\' + imageName     // will be saved to /path/to/dest/photo.jpg
  //};
  
  //download.image(options)
   // .then(({ filename }) => {
    
    //  console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
    //})
    //.catch((err) => console.error(err));

  return res.json(link)
  }

  catch(error){
    console.log(error)
    return res.json({error})
  }
})
const photosMiddlewares = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination directory for uploaded files
      },
      filename: (req, file, cb) => {
        const uniqueFilename = Date.now() + '-' + file.originalname;
        cb(null, uniqueFilename); // Generate a unique filename with a timestamp
      },
    }),
  });
  
  app.post('/upload', photosMiddlewares.array('photos', 100), (req, res) => {
    const filenames = req.files.map(file => file.filename); // Get the filenames
    console.log(req.files)
    res.json(filenames); // Return the filenames (without the timestamp)
  });
  
  
 app.post('/places', (req,res)=>{
  const {token} = req.cookies
  const {title, address, addedPhotos, description, features,extraInfo, checkIn, checkOut, maxGuests,price } = req.body
    if(token){
        jwt.verify(token,process.env.JWT_TOKEN,{},async (err,user)=>{
            if(err) throw err
            const placeDoc = await Place.create({owner:user.id,title, address, 
              addedPhotos, description, features,extraInfo, checkIn, checkOut, maxGuests, price })
             return res.json(placeDoc)
        })
    } else{
        res.json(null)
    }
  
 }) 


 app.get('/places',(req,res)=>{
  const {token} = req.cookies
  if(token){
    jwt.verify(token,process.env.JWT_TOKEN,{},async (err,user)=>{
      const {id} = user
      return res.json( await Place.find({owner:id}))
    })
       

 }
})


app.get('/places/:id',async(req,res)=>{
  const {id} = req.params
  return res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
  try {
    const { id } = req.body;
    const { token } = req.cookies;
    const {
      title,
      address,
      addedPhotos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_TOKEN, {}, async (err, user) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Find the place by ID
      const place = await Place.findById(id);

      if (!place) {
        return res.status(404).json({ error: 'Place not found' });
      }

      // Check if the user is the owner of the place
      if (user.id !== place.owner.toString()) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const modifiedFileNames = addedPhotos
      // Update place details
      place.title = title;
      place.address = address;
      place.addedPhotos = modifiedFileNames;
      place.description = description;
      place.features = features;
      place.extraInfo = extraInfo;
      place.checkIn = checkIn;
      place.checkOut = checkOut;
      place.maxGuests = maxGuests;
      place.price = price
      // Save the updated place
      await place.save();

      res.json({ message: 'Place updated successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/allplaces', async(req,res)=>{
  res.json(await Place.find())
})

app.post('/booking', async(req,res) => {
  try{
    const {token} = req.cookies
    const user = await getUserDataFromToken(token)
  const {place, checkIn, checkOut, numberOfGuests, name, mobile, price} = req.body
    Booking.create({
      checkIn, checkOut, numberOfGuests, name, mobile, place, price, user:user.id
    }).then((book) =>{
      return res.json(book)
    }).catch((err) =>{
      throw err
    })
  }
  catch(error){
    throw error
  }
})

app.get('/bookings', async(req,res)=>{
  const {token} = req.cookies
  const user = await getUserDataFromToken(token)
  res.json(await Booking.find({user:user.id}).populate('place'))
})


app.listen(4000,()=>{
    console.log("Server is listening on port 4000")
})