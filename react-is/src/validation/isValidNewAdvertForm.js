import {isValidPrice} from "./Validation";

export function isValidNewAdvertForm (fields) {
    let msgTitle = '';
    let msgPrice = '';
    let msgCategory = '';
    let msgShop = '';
    let isValid = true;

    if(fields.title.replace(/\s/g, '').length < 3){
        msgTitle = 'Too small title';
        isValid = false;
    }

    if(!isValidPrice(fields.price) || fields.price.length === 0){
        msgPrice = 'Incorrect value entered';
        isValid = false;
    }

    if(fields.category === '-1') {
        msgCategory = 'Choose category';
        isValid = false;
    }

    if(fields.shop === '0') {
        msgShop = 'Choose shop';
        isValid = false;
    }

    let errors = {
        msgTitle, msgPrice, msgCategory, msgShop, isValid
    };

    return errors;
}