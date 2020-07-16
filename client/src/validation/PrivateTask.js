import validator from 'validator';
import moment from 'moment';

const isText = (text) => {
    if (text) {
        if (!validator.isLength(text, { min: undefined, max: 255 })) {
            return 'Text must be shorter than 255 symbols'
        }
    } else {
        return 'Text is not entered';
    }
}

const privateTaskValidator = ({ text, date, deadline }) => {
    let result = {};

    if (isText(text)) {
        result.text = isText(text);
    }

    if (date && deadline) {
        if (!moment(date).isBefore(deadline))
        {
            result.date = "Start date must be before deadline";
            result.deadline = "deadline must be after the start date";
        }

    }

    return result;
}

export default privateTaskValidator;