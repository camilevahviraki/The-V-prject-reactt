import React from 'react';
import './GlobalVariable.js';


function MainComponent(props) {
    return (
        <div >
            {global.appname ="french"}
            {props.children}          
        </div>
    );
}

export default MainComponent;

