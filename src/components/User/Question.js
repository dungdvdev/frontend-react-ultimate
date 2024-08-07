import _ from 'lodash';

function Question({ data, index, handleCheckbox }) {
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
                    <img className='image' src={`data:image/png;base64, ${data.image}`} alt='Quiz' />
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
                                    checked={item.isSelected}
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={(event) => { handleHandleCheckbox(event, item.id, data.questionId) }}
                                />
                                <label className="form-check-label">
                                    <span>{item.description}</span>
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>


        </>
    );
}

export default Question;