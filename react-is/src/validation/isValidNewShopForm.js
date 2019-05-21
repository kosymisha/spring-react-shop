export function isValidNewShopForm (fields) {
    let msgNameShop = '';
    let msgUrl = '';
    let isValid = true;

    if(fields.nameShop.replace(/\s/g, '').length < 3){
        msgNameShop = 'Too small name';
        isValid = false;
    }

    if(!/^[^\s]+$/.test(fields.url) && fields.url.length < 5){
        msgUrl = 'Incorrect value entered';
        isValid = false;
    }

    let errors = {
        msgNameShop, msgUrl, isValid
    };

    return errors;
}