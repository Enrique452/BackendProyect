// importamos el modelo de datos
import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
//funcion para registrar usuarios

export const register = async (req, res)=> {
   const {username, email, userrol, password}= req.body;
    //console.log(username, email, password);
    
   try {

    // validamod que el email no este registrado en la base de datos 
    const userFound = await User.findOne({email});
    if(userFound)
      return res.status(400)
    .json({message: ["El email ya esta en uso "]})
    
    const passwordHash = await bcryptjs.hash(password, 10);
     const newUser = new User({
         username,
         email,
         userrol,
         password: passwordHash
     });
 
     const userSaved = await newUser.save()
     //console.log(userSaved);
     const token = await createAccessToken({id: userSaved._id})
     res.cookie('token', token, {
        sameSite: 'none',
        secure: true
     });
     res.json({
        id: userSaved._id,
        username: userSaved.username,
        userrol: userSaved.userrol,
        email: userSaved.email
     });
   } catch (error) {
    console.log(error);
   }
}
// funcion para iniciar sesion 
export const login = async (req, res) => {
  const {email,password} = req.body;
  try {
    const userFound = await User.findOne({email});
    if(!userFound){
      return res.status(400)
        .json({massage: ['Usuario no encontrado']});
    }
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch){
      return res.status(400).json({message: ['Password no coincide']})
    }
    const token = await createAccessToken({id: userFound._id})
    res.cookie('token', token, {
      sameSite: 'none',
      secure: true
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      userrol: userFound.userrol,
      email: userFound.email
    });
    
  } catch (error) {
    console.log(error);
  }
}

export const logout = (req, res) =>{
  res.clearCookie("token");
  return res.sendStatus(200);
}


export const profile = async(req, res)=>{
  const userFound = await User.findById(req.user.id);

  if(!userFound)
    return res.status(400).json({message: ["User not found"]});
  return res.json({
    id: userFound.id,
    username: userFound.username,
    userrol: userFound.userrol,
    email: userFound.email
  })
  
}

export const verifyToken = async (req, res)=>{
const {token} = req.cookies;
      if(!token)
      return res.status(401).json({message: ["No autorizado"]});
    
jwt.verify(token, TOKEN_SECRET, async(err, user)=>{
  if(err)
    return res.status(401).json({message: ["No autorizado"]});
  const userFound = await User.findById(user.id);
  if (!userFound)
    return res.status(401).json({message: ["No autorizado"]});


    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
  })
})
}

