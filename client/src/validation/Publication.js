import validator from 'validator';

const isTitle = (title) => {
    if (title) {
        if (!validator.isLength(title, { min: 5, max: undefined})) {
            return 'Title must be longer than 5 symbols';
        }
        if (!validator.isLength(title, { min: undefined, max: 255 })) {
            return 'Title must be shorter than 255 symbols';
        }
    } else {
        return 'Title is not entered';
    }
}

const isDescription = (description) => {
    if (description) {
        if (!validator.isLength(description, {min: 10, max: undefined})) {
            return 'Description must be longer than 10 symbols'
        } 
        if (!validator.isLength(description, { min: undefined, max: 1024 })) {
            return 'Description must be shorter than 1024 symbols'
        }
    } else {
        return 'Description is not entered';
    }
}

const publicationValidator = ({ title, description }) => {
    let result = {};

    if (isTitle(title)) {
        result.title = isTitle(title);
    }

    if (isDescription(description)) {
        result.description = isDescription(description);
    }

    return result;
}

export default publicationValidator;