import React, {PropTypes} from "react";

const propTypes = {
    markup: PropTypes.string.isRequired,
};

const Svg = ({markup, ...props}) => {
    const isBase64 = typeof markup === 'string' && markup.indexOf('data') === 0;
    return isBase64
        ? <img src={markup} alt="" {...props} />
        // eslint-disable-next-line react/no-danger
        : <div dangerouslySetInnerHTML={{__html: markup}} {...props} />;
};

Svg.propTypes = propTypes;

export default Svg;
