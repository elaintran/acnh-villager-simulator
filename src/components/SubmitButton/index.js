import React from "react";
import "./style.css";

function SubmitButton(props) {
    return (
        <div className="submit" onClick={() => props.click()}>
            Time for Take Off!
        </div>
    );
}

export default SubmitButton;