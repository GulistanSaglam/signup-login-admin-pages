const User = require('../models/user.model');
const UtilityAuth = require('../utility/authentication');
const validation = require('../utility/validation');




function getSignUp(req, res) {
    res.render('auth/signup');
}






async function signup(req, res, next) {

if(!validation.userDetailsAreValid(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.address,
    req.body.city ) || !validation.emailIsequalConfirmEmail(req.body.email, req.body['confirm-email']))
    {
    res.redirect('/signup');
    return;
   }

   const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.address,
    req.body.city 
    );
    

    try{
       const existedAlready = await user.existsAlready();

        if(existedAlready){
            res.redirect('/signup');
            return;
        }
    } catch(error){
        next(error);
        return;
    }


    try{
    await user.signup();
    }catch(error){
      next(error);
      return;
    }

    res.redirect('/login');   
}








function getLogin(req, res){
    res.render('auth/login');
}










async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try{
      existingUser = await user.getUserSameEmail();
    } catch(error){
        next(error);
        return;
    }

    if(!existingUser){
        res.redirect('/login');
        return;
    }
   
    const passwordIsCorrect = await user.IsCorrectPassword(existingUser.password);

    if(!passwordIsCorrect){
        res.redirect('/login');
        return;       
    }

    UtilityAuth.createUserSession(req, existingUser, function (){
       res.redirect('/');
    });
}








function logout(req, res){
    UtilityAuth.destroyUserAuthSession(req);
    res.redirect('/login');
}







module.exports = {
    getSignUp: getSignUp,
    signup: signup,
    getLogin: getLogin,
    login: login,
    logout: logout
};