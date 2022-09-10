import React, { useState, useEffect, useCallback } from 'react';
import faqService from '../../services/faqService';
import FaqItem from './FaqItem';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import swal from '@sweetalert/with-react';
import debug from 'sabio-debug';
import Accordion from 'react-bootstrap/Accordion';
import lookUpService from '../../services/lookUpService';
import './faq.css';
import PropTypes from 'prop-types';

const _logger = debug.extend('FAQ');

_logger('App constructor with location');

_logger('Full Application/Page refresh Detected');

function FAQS(props) {
    _logger('FAQ props....', props);
    const [faqState, setFaqState] = useState({
        arrayOfFaq: [],
        faqComponents: [],
    });

    const [categoriesButton, setCategoriesButton] = useState(null);

    const [isLoggedIn] = React.useState(props.currentUser.isLoggedIn);

    React.useEffect(() => {
        lookUpService
            .LookUp(['FAQsCategories'])
            .then(onGetFaqCategoriesSuccess)
            .catch((error) => _logger('failed to get lookup', error.response));
    }, []);

    const onGetFaqCategoriesSuccess = (response) => {
        let arrayOfCats = response.item.faQsCategories;
        setCategoriesButton(arrayOfCats.map(mapCategorySelectBtt));
    };

    const mapCategorySelectBtt = (aCategory) => {
        _logger('Mapping asdasdasdadsa');
        return (
            <button
                id={`${aCategory.id}`}
                key={`btt_cat_${aCategory.id}`}
                className="btn faq-btn mx-1"
                onClick={onSelectCategoryClicked}>
                {aCategory.name}
            </button>
        );
    };

    const onDeleteRequested = useCallback((myFaq, obj) => {
        _logger('OnDeleteRequest firing');

        const handler = getDeleteSuccessHandler(myFaq, obj);

        faqService.deleteFaq(myFaq.id).then(handler).catch(onDeleteErr);
    }, []);
    const onDeleteErr = (err) => {
        _logger('Delete Err', err);
        toastr.error('Delete Error!!');
    };

    const getDeleteSuccessHandler = (selectedFaq) => {
        _logger('onDeleteSuccess', selectedFaq);

        swal({
            title: 'Are you sure you want to delete this FAQ?',
            text: 'Once deleted, you will not be able to recover it!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal('Poof! Your FAQ file has been deleted!', {
                    icon: 'success',
                });
                setFaqState((prevState) => {
                    const faa = { ...prevState };

                    faa.arrayOfFaq = [...faa.arrayOfFaq];

                    const idxOf = faa.arrayOfFaq.findIndex((faq) => {
                        let result = false;

                        if (faq.id === selectedFaq.id) {
                            result = true;
                        }

                        return result;
                    });

                    if (idxOf >= 0) {
                        faa.arrayOfFaq.splice(idxOf, 1);
                        faa.faqComponents = faa.arrayOfFaq.map(mapFaq);
                    }
                    return faa;
                });
            } else {
                swal('FAQ not deleted!');
            }
        });
    };

    const navigate = useNavigate();
    const onEditRequested = (faq) => {
        const stateforTransport = { type: 'faq_EDIT', payload: faq };

        navigate(`/faq/${faq.id}`, { state: stateforTransport });
    };
    const onAddRequested = (e) => {
        e.preventDefault();
        navigate(`/faq/new`);
    };
    const mapFaq = (anFaq) => {
        return (
            <FaqItem
                faq={anFaq}
                onDeleteClicked={onDeleteRequested}
                onEditClicked={onEditRequested}
                id={anFaq.id}
                key={anFaq.id}
                isLoggedIn={isLoggedIn}
            />
        );
    };

    useEffect(() => {
        _logger('firing UseEffect');
        faqService.getFaq().then(onAddFaqSuccess).catch(onAddFaqErr);
    }, []);

    const onAddFaqSuccess = (data) => {
        _logger('onAddFaqSuccess', data);
        if (data.item.pagedItems) {
            let arrOfFaqs = data.item.pagedItems;

            _logger({ data }, 'data');

            setFaqState((prevState) => {
                const faa = { ...prevState };
                faa.arrayOfFaq = data.item.pagedItems;

                faa.faqComponents = arrOfFaqs.map(mapFaq);
                return faa;
            });
        }
    };

    const onAddFaqErr = (err) => {
        _logger(err);
        toastr.error('getFaq error!!');
    };

    const onShowAllClicked = (e) => {
        e.preventDefault();

        setFaqState((prevState) => {
            const newState = { ...prevState };

            newState.faqComponents = newState.arrayOfFaq.map(mapFaq);

            return newState;
        });
    };

    const onSelectCategoryClicked = (e) => {
        e.preventDefault();

        const catId = parseInt(e.target.id);

        setFaqState((prevState) => {
            const newState = { ...prevState };

            let filteredFaq = newState.arrayOfFaq.filter((aFaq) => aFaq.categoryId === catId);
            newState.faqComponents = filteredFaq.map(mapFaq);

            return newState;
        });
    };

    return (
        <React.Fragment>
            <div className="text-center my-1">
                <h4 className="faq-header-title my-2">FAQ</h4>
                <div className="w-50 mx-auto">
                    {' '}
                    <h3 className="fw-bolder mt-4 mb-2">
                        Got a question? You’ll probably find your answer in this list of frequently asked questions. If
                        you don’t see your question on this page, contact us and we will gladly assist you.
                    </h3>
                </div>
            </div>
            <div className="container">
                {' '}
                {isLoggedIn && (
                    <div className="text-center mb-2">
                        <button type="button" className="btn btn-outline-dark" onClick={onAddRequested}>
                            Add FAQ
                        </button>
                    </div>
                )}
                <>
                    <div className="text-center">
                        <button className="btn faq-btn mx-1" onClick={onShowAllClicked}>
                            Show All
                        </button>
                        {categoriesButton}

                        {!isLoggedIn && (
                            <>
                                <button id="1" className="btn faq-btn mx-1" onClick={onSelectCategoryClicked}>
                                    Aquifer PE
                                </button>
                                <button id="2" className="btn faq-btn mx-1" onClick={onSelectCategoryClicked}>
                                    Jobs
                                </button>
                                <button id="3" className="btn faq-btn mx-1" onClick={onSelectCategoryClicked}>
                                    Subscription
                                </button>
                            </>
                        )}
                    </div>
                </>
                <>
                    <div className="w-75 mx-auto mb-3">
                        <Accordion defaultActiveKey="0" flush>
                            {faqState.faqComponents}
                        </Accordion>
                    </div>
                </>
            </div>
        </React.Fragment>
    );
}

FAQS.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
};

export default React.memo(FAQS);
