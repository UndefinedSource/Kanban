import React from 'react';

const Header = (props) => {
        return (
            <div className="header">
                <input type="text" spellCheck="false" className={"txt-title"} placeholder="Enter Title"/>
                <div className="menu">
                    <span></span>
                    <button className="btn-addColumn" onClick={props.onClickAddCol}>+</button>
                    <span className="switch-container">
                    <input type="checkbox" className="chk-darkMode" onClick={props.onClickDarkMode}/>
                    <label htmlFor="" className="switch-on-text">Light</label>
                    <label htmlFor="" className="switch-off-text">Dark</label>
                    </span>
                </div>
            </div>
        );
    }

export default Header;