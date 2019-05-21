export function isValidSignUpForm (fields) {

    let msgFirstName = '';
    let msgLastName = '';
    let msgEmail = '';
    let msgPassword = '';
    let msgConfirmPassword = '';
    let msgRole = '';
    let msgFirstNameCard = '';
    let msgLastNameCard = '';
    let msgNumberCard = '';
    let msgMonth = '';
    let msgYear = '';
    let isValid = true;

    if(!/^[a-zA-Z]{3,20}$/.test(fields.firstName)){
        msgFirstName = '3-20 characters';
        isValid = false;
    }

    if(!/^[a-zA-Z]{3,20}$/.test(fields.lastName)){
        msgLastName = '3-20 characters';
        isValid = false;
    }

    if(!/^([a-zA-Z0-9_\-\.]{1,20})@([a-zA-Z0-9_\-\.]{1,20})\.([a-zA-Z]{2,5})$/.test(fields.email)){
        msgEmail = 'Email is not valid';
        isValid = false;
    }

    if(!/^[a-zA-Z0-9]{6,20}$/.test(fields.password)){
        msgPassword = 'Too small password';
        isValid = false;
    }

    if(fields.password !== fields.confirmPassword){
        msgConfirmPassword = 'Passwords do not match';
        isValid = false;
    }

    if(fields.role === 'EMPTY'){
        msgRole = 'Choose account type';
        isValid = false;
    }

    if(!/^[a-zA-Z]{3,20}$/.test(fields.firstNameCard)) {
        msgFirstNameCard = 'Incorrect value entered';
        isValid = false;
    }

    if(!/^[a-zA-Z]{3,20}$/.test(fields.lastNameCard)) {
        msgLastNameCard = 'Incorrect value entered';
        isValid = false;
    }

    if(fields.numberCard.length < 16){
        msgNumberCard = 'Incorrect value entered';
        isValid = false;
    }

    if(fields.month.length === 0){
        msgMonth = 'Incorrect value entered';
        isValid = false;
    }

    if(fields.year.length === 0){
        msgYear = 'Incorrect value entered';
        isValid = false;
    }

    let errors = {
        msgFirstName, msgLastName, msgEmail, msgPassword, msgConfirmPassword, msgRole,
        msgNumberCard, msgMonth, msgYear, msgFirstNameCard, msgLastNameCard, isValid
    };

    return errors;
}