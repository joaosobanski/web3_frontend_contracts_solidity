import React from 'react'
import style from './Label.module.css'

export const Label = ({ text }) =>
    <label className={style['label']}>{text}</label>