import validator from 'validator';

const isComment = (comment) => {
    if (comment) {
        if (!validator.isLength(comment, { min: undefined, max: 1024 })) {
            return 'Comment must be shorter than 1024 symbols'
        }
    } else {
        return 'Comment is not entered';
    }
}

const commentValidator = ({ comment }) => {
    let result = {};

    if (isComment(comment)) {
        result.comment = isComment(comment);
    }

    return result;
}

export default commentValidator;