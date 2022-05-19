import React from 'react'
import style from './Label.module.css'

export const Label = ({ text, onClick }) =>
    <label className={style['label']} onClick={onClick}>{text}</label>