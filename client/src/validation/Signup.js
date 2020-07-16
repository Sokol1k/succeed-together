import validator from 'validator';

const isName = (name) => {
    if (name) {
        if (!validator.isLength(name, { min: 3, max: undefined })) {
            return "Name must be longer than 3 symbols"
        }
        if (!validator.isLength(name, { min: undefined, max: 255 })) {
            return "Name must be shorter than 255 symbols"
        }
    } else {
        return 'Name is not entered'
    }
}

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

const signupValidator = ({ name, email, password, confirm_password }) => {
    let result = {};

    if (isName(name)) {
        result.name = isName(name);
    }

    if (isEmail(email)) {
        result.email = isEmail(email);
    }

    if (isPassword(password)) {
        result.password = isPassword(password);
    }

    if (password !== confirm_password) {
        result.confirm_password = 'Password does not match';
    }

    return result;
}

export default signupValidator;