/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/custom/logo.png`} alt="Logo" width={40} className="m-1" />
            by
            <span className="font-medium ml-2">Chu Đức Minh</span>
        </div>
    );
};

export default AppFooter;
