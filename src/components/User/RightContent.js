import { useRef } from "react";
import CountDown from "./CountDown";

function RightContent({ data, setIndex, handleFinishQuiz }) {
    const refDiv = useRef([]);

    const getClassQuestion = (item, index) => {
        if (item && item.answers.length > 0) {
            let isAnswered = item.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question-item selected";
            }
        }
        return "question-item";
    }

    const onTimeUp = () => {
        handleFinishQuiz();
    }

    const handleClickQuestion = (question, index) => {
        setIndex(index);
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question-item clicked") {
                    item.className = "question-item"
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return;
            }


        }

        refDiv.current[index].className = "question-item clicked";
    }
    return (
        <div className="right-detail">
            <div className="group-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="group-questions">
                {data && data.length > 0 && data.map((item, index) => {
                    return (
                        <div
                            key={`question-${index}`}
                            className={getClassQuestion(item, index)}
                            onClick={() => handleClickQuestion(item, index)}
                            ref={element => refDiv.current[index] = element}
                        >
                            {index + 1}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default RightContent;