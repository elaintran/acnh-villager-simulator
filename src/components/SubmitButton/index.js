import React from "react";
import "./style.css";

function SubmitButton(props) {
    return (
        <div className="submit" onClick={() => props.click()}>
            Take Off <i className="fas fa-arrow-right"></i>
        </div>
    );
}

export default SubmitButton;