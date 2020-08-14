import {regExp} from '../constants/regExp';
export const checkEmail = email => {
    return (regExp.Email.test(email))
}
