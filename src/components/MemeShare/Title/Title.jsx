import React from "react";

import PropTypes from "prop-types";

const Title = (props) => {
  const { id, className, style, name, variant, text } = props;
  return (
    <div
      className={`${variant} ${className}`}
      style={style}
      id={id}
      name={name}
    >
      {text}
    </div>
  );
};

Title.defaultProps = {
  id: "",
  className: "",
  style: "",
  name: "",
  variant: "h1",
  text: "",
};

Title.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.string,
  variant: PropTypes.string,
  text: PropTypes.string,
};

export default Title;
