import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const PopoverComponent = ({ children }) => {
    const popover = (
        <Popover id="popover-basic" style={{ backgroundColor: "#000233", minWidth: '900px' }}>
            <Popover.Content>
                {children}
            </Popover.Content>
        </Popover>
    );

    return (
        <div className='d-flex justify-content-center mt-2'>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <button className="button mb-3">Filtros</button>
            </OverlayTrigger>
        </div>
    );
}

export default PopoverComponent;
