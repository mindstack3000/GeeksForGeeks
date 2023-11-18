import React from 'react';
import PopUp from '@/components/popUp';

function LoginLayout({children}){
    return<>
    {children}
    <PopUp/>
    </>
}

export default LoginLayout;