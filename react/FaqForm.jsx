import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import debug from 'sabio-debug';
import './faq.css';
import faqService from '../../services/faqService';
import lookUpService from '../../services/lookUpService';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import RequiredYup from '../../schema/faqValidation';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiQuestionAnswerFill } from 'react-icons/ri';

const _logger = debug.extend('faqForm');

function FaqForm(props) {
    const location = useLocation();
    _logger('Checking::: ', location);
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();

    _logger(props.currentUser.id, 'currentUser Id');

    const faqId = params.get('id');

    const [faqFormData, setFaqFormData] = useState({
        question: '',
        answer: '',
        sortOrder: 5,
        categoryId: 1,
    });
    const [categories, setCategories] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        lookUpService
            .LookUp(['FAQsCategories'])
            .then(onGetFaqSuccess)
            .catch((error) => _logger('failed to get lookup', error.response));
        _logger('Firing useEffect 1');

        if (location?.state?.payload && location?.state?.payload !== faqFormData) {
            setFaqFormData((prevState) => {
                const updateState = {
                    ...prevState,
                };

                updateState.question = location.state.payload.question;
                updateState.answer = location.state.payload.answer;
                updateState.sortOrder = location.state.payload.sortOrder;
                updateState.categoryId = location.state.payload.categoryId;

                return updateState;
            });

            setIsUpdating(true);
        }
    }, []);

    const onGetFaqSuccess = (response) => {
        _logger('RESPONSE', response);
        let arrayOfCats = response.item.faQsCategories;
        setCategories(arrayOfCats);
    };

    const mapFaq = (faq, i) => {
        return (
            <option value={faq.id} key={`faq_${faq.id}_${i}`}>
                {faq.name}
            </option>
        );
    };

    const handleSubmit = (values) => {
        _logger(values);

        if (isUpdating) {
            faqService.updateFaq(values, faqId).then(onHandleSuccess).catch(onHandleErr);
        } else {
            faqService.addFaq(values).then(onHandleSuccess).catch(onHandleErr);
        }
    };

    const onHandleSuccess = (data) => {
        _logger(data);

        if (isUpdating) {
            toastr.success('FAQ Updated');
        } else {
            toastr.success('FAQ Added');
        }

        navigate('/faq');
    };

    const onHandleErr = (err) => {
        _logger(err);

        if (isUpdating) {
            toastr.error('Error Updating FAQ!');
        } else {
            toastr.error('Error Adding FAQ!');
        }
    };
    return (
        <React.Fragment>
            <div className="w-50 mx-auto my-3 shadow-lg p-3 mb-3 ">
                <h1 className="display-6 fw-bolder text-center faq-form-title">
                    {isUpdating && 'EDIT FAQ'}
                    {!isUpdating && 'NEW FAQ'}
                </h1>
                <div className=" ">
                    <div className="">
                        <Formik
                            enableReinitialize={true}
                            initialValues={faqFormData}
                            onSubmit={handleSubmit}
                            validationSchema={RequiredYup}>
                            {({ values }) => (
                                <Form>
                                    <p className="form-label fw-bold text-center">Question</p>
                                    <div className="input-group mb-3  w-50 mx-auto">
                                        <span className="input-group-text">
                                            <RiQuestionnaireFill />
                                        </span>
                                        <Field
                                            type="question"
                                            className="form-control"
                                            id="question"
                                            name="question"
                                            aria-describedby="questionHelp"
                                            value={values.question}></Field>
                                        <ErrorMessage name="question" component="div" className="has-error" />
                                    </div>

                                    <p className="form-label fw-bold text-center">Answer</p>
                                    <div className="input-group mb-3  w-50 mx-auto">
                                        <span className="input-group-text">
                                            <RiQuestionAnswerFill />
                                        </span>

                                        <Field
                                            type="answer"
                                            className="form-control w-50 mx-auto"
                                            id="answer"
                                            name="answer"
                                            value={values.answer}></Field>
                                        <ErrorMessage name="answer" component="div" className="has-error" />
                                    </div>

                                    <p className="form-label fw-bold text-center ">FAQ Category</p>
                                    <div className="input-group mb-3  w-50 mx-auto">
                                        <span className="input-group-text">
                                            <BiCategoryAlt />
                                        </span>

                                        <Field
                                            component="select"
                                            name="categoryId"
                                            className="form-select w-50 mx-auto">
                                            {categories.map(mapFaq)}
                                        </Field>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-outline-dark my-2">
                                            {isUpdating && 'Update'}
                                            {!isUpdating && 'Add'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

FaqForm.propTypes = {
    currentUser: PropTypes.shape({
        email: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    }),
};

export default FaqForm;
