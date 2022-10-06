import React, { useState } from "react";

import "./Editable.scss";

const Editable = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
        <form
          className={`editable_edit ${props.editClass ? props.editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="submit">{props.buttonText || "Add"}</button>
          </div>
        </form>
    </div>
  );
}

export default Editable;