import React from 'react';
import Dominos from './../../assets/dominos.jpg'
import Boston from './../../assets/boston.jpg'
import './styles.scss'

const Directory = props => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Dominos})`
                    }}
                >
                    <a href="/">
                        Domino's Pizza
                    </a>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Boston})`
                    }}
                >
                    <a href="/">
                        Boston pizza
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Directory;