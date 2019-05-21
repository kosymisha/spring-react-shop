export function isValidChangeUserInfoForm (fields) {

    let msgFirstName = '';
    let msgLastName = '';
    let msgEmail = '';
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

    let errors = {
        msgFirstName, msgLastName, msgEmail, isValid
    };

    return errors;

}