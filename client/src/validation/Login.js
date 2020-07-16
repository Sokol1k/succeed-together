import validator from 'validator';

const isEmail = (email) => {
    if (email) {
        if (!validator.isEmail(email)) {
            return "Email is incorrect"
        }
    } else {
        return 'Email is not entered'
    }
}

const isPassword = (password) => {
    if (password) {
        if (!validator.isLength(password, { min: 6, max: undefined })) {
            return "Password must be longer than 6 symbols"
        }
        if (!validator.isLength(password, { min: undefined, max: 255 })) {
            return "Password must be shorter than 255 symbols"
        }
    } else {
        return 'Password is not entered'
    }
}

const loginValidator = ({ email, password }) => {
    let result = {};

    if (isEmail(email)) {
        result.email = isEmail(email);
    }

    if (isPassword(password)) {
        result.password = isPassword(password);
    }

    return result;
}

export default loginValidator;