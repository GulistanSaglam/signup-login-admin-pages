function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
}

/* For CSRF attacks */

module.exports = addCsrfToken;