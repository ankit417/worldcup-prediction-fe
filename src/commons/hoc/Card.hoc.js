import React from "react";
import PropTypes from "prop-types";

export const Card = (props) => {
  const { children, containerStyle } = props;
  return (
    <div className="card-container" style={containerStyle}>
      {children ? children : null}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
