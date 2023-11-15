import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideWhenVisible = { display: isVisible ? "none" : "" };
  const showWhenVisible = { display: isVisible ? "" : "none" };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div style={{ ...hideWhenVisible, marginBottom: "5px" }}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={{ ...showWhenVisible, padding: 3, margin: 1 }}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = "Toggleable";

export default Toggleable;
