

export function isValidPrice (price) {
    if (/^[0-9]\d{0,8}(\.\d{1,2})?$/.test(price) ||
        price.length === 0 ||
        (price[price.length - 1] === "." && price.split(".").length - 1 === 1 && price.length > 1)
    ) {
        if (price[0] === "0" && price.length === 2) {
            if (price[1] === "0") return false
        }
        return true
    } else return false
}

export function getIntPartPrice (price) {
    let parts = price.split(".");
    return parts[0];
}

export function getFractPartPrice (price) {
    let parts = price.split(".");
    if (parts[1] !== undefined)
        if (parts[1].length === 1)
            return parts[1] + "0";
        else
            return parts[1];
    else
        return "0";
}

export function isValidNumberValue (value) {
    return /^[0-9]*$/.test(value);

}

export function isValidTextValue (value) {
    return /^[a-zA-Z]*$/.test(value);

}

