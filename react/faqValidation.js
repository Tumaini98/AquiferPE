import * as Yup from 'yup';

const basicSchema = Yup.object().shape({
    question: Yup.string().min(2).max(50).required('Question required'),
    answer: Yup.string().required('Answer required'),
});

export default basicSchema;
