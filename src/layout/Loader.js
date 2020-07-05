import React, {  useState , useEffect } from 'react';

const Loader = (props) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
          }, 3000);
        
    },[show]);
    return (
        <div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
            <div className="loader loader-7">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>
        </div>
    );
}

export default Loader;