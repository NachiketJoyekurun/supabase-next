import { supabase } from '@/utils/supabase';
import React from 'react'

const Button = ({
    label,
    onClick
}) => {
    return (
        <button onClick={onClick}>
            {label}
        </button>
    )
}

export default Button