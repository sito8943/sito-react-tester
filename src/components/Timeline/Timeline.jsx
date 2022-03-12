import React from "react";

import PropTypes from "prop-types";

const Timeline = (props) => {
  const { backgroundColor, backgroundImage, children } = props;
  return (
    <div
      style={{
        backgroundColor,
        backgroundImage,
      }}
    >
      {children}
    </div>
  );
};

Timeline.defaultProps = {
  backgroundColor: "#4158D0",
  backgroundImage:
    "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
};

Timeline.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Timeline;
