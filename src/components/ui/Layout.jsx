import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, onLogout }) => {
    return (
        <div className="flex h-screen bg-background font-sans text-text-main">
            <Sidebar onLogout={onLogout} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
