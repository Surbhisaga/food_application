import React from 'react';
import './styles.scss';

const AuthWapper = ({ hendline, children }) => {
    return (
        <div className="authWrapper">
            <div className="wrap">
                {hendline && <h2>{hendline}</h2>}

                <div className="children">
                    {children && children}
                </div>
            </div>
        </div>
    );
}

export default AuthWapper;
