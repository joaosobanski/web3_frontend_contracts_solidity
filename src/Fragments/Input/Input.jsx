import React from 'react'
import style from './Input.module.css'

export const InputNumber = ({ placeholder, onChange, value, children, onBlur }) =>
    <input
        type='number'
        className={style['input']}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder} >
        {children}
    </input>
