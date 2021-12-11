import React, { useContext, useEffect } from 'react';
import "./Button.css";

const Button = (props) => {
    const { className, routeURL, title } = props;

    return (
        <a className={`btn ${className}`} href={routeURL}>
            {title}
        </a>
    )
}

export default Button;
