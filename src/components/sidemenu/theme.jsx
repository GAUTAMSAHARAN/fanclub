import React, {useState} from 'react';

const ThemeChanger = () => {

    const handleThemeChange = () => {
        let root = document.getElementById('root-layout')
        root.classList.toggle('dark')
        root.classList.toggle('light')
    }

    return (
        <>
        <i class="fas fa-cloud-moon" onClick={handleThemeChange}></i>
        </>
    )
}

export default ThemeChanger;