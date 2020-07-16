import validator from 'validator';

const isTitle = (title) => {
    if (title) {
        if (!validator.isLength(title, { min: undefined, max: 255 })) {
            return 'Title must be shorter than 255 symbols'
        }
    } else {
        return 'Title is not entered';
    }
}

const privateListValidator = ({ title }) => {
    let result = {};

    if (isTitle(title)) {
        result.title = isTitle(title);
    }

    return result;
}

export default privateListValidator;