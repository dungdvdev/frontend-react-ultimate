import _ from 'lodash';
import { Lightbox } from "react-modal-image";
import { useState } from 'react';
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

function Question({ data, index, handleCheckbox, isShowAnswer }) {
    const [isShowPreviewImage, setIsShowPreviewImage] = useState(false)

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleHandleCheckbox = (event, aId, qId) => {
        handleCheckbox(aId, qId);
    }

    return (
        <>
            {data.image &&
                <div className='quiz-image mb-3'>
                    <img onClick={() => setIsShowPreviewImage(true)} className='image' src={`data:image/png;base64, ${data.image}`} alt='Quiz' />
                    {
                        isShowPreviewImage && <Lightbox
                            medium={`data:image/png;base64, ${data.image}`}
                            alt='Question Image'
                            onClose={() => setIsShowPreviewImage(false)}
                        />
                    }
                </div>
            }

            <div className='question text-center'>
                <h5>Question {index + 1}: {data.questionDescription} ?</h5>
            </div>

            <div className='answers'>
                {data.answers && data.answers.length > 0 && data.answers.map((item, index) => {
                    return (
                        <div key={`${index}-answer`} className='answer-item'>
                            <div className="form-check">
                                <input
                                    disabled={isShowAnswer}
                                    checked={item.isSelected}
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={(event) => { handleHandleCheckbox(event, item.id, data.questionId) }}
                                />
                                <label className="form-check-label">
                                    <span>{item.description}</span>
                                </label>
                                {isShowAnswer === true &&
                                    <>
                                        {item.isSelected === true && item.isCorrect === false && <IoIosClose className='incorrect' />}
                                        {item.isCorrect === true && <IoIosCheckmark className='correct' />}
                                    </>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>


        </>
    );
}

export default Question;