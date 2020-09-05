import React from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <input type="text" spellCheck="false" className="txt-title" placeholder="Enter Title"/>
            <button className="btn-addColumn" onClick={props.onClickAddCol}>+</button>
        </div>
    );
}

export default Header;