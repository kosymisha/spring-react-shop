export function isValidNewPasswordForm (fields){
    let msgNewPassword = '';
    let msgCurrentPassword = '';
    let msgConfirmPassword = '';
    let isValid = true;

    if(!/^[a-zA-Z0-9]{6,20}$/.test(fields.newPassword)){
        msgNewPassword = 'Too small password';
        isValid = false;
    }

    if(fields.password !== fields.confirmPassword){
        msgConfirmPassword = 'Passwords do not match';
        isValid = false;
    }

    if(fields.currentPassword.length === 0){
        msgCurrentPassword = 'Enter current password';
        isValid = false;
    }

    let errors = {
        msgNewPassword, msgConfirmPassword, msgCurrentPassword, isValid
    };

    return errors;
}