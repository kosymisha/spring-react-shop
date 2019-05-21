export function isValidNewCardForm (fields) {
    let msgFirstNameCard = '';
    let msgLastNameCard = '';
    let msgNumberCard = '';
    let msgMonth = '';
    let msgYear = '';
    let isValid = true;

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
        msgNumberCard, msgMonth, msgYear, msgFirstNameCard, msgLastNameCard, isValid
    };

    return errors;
}