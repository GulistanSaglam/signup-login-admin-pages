function errorHandler (error, req,res,next) {
 console.log(error);
 res.render('sharing/error');
}

module.exports = errorHandler;