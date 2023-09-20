function userDetailsAreValid(email, password, fullname, address,city){
    return (
        email && 
        email.includes('@') 
        && password 
        && password.trim().length >= 6 
        && fullname 
        && fullname.trim() !==''
        && address
        && address.trim() !==''
        && city
        && city.trim() !==''
    );
}


function emailIsequalConfirmEmail(email, confirmEmail){
    return email === confirmEmail;
}


module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsequalConfirmEmail: emailIsequalConfirmEmail
};