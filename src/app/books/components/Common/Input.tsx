import React from 'react';

interface InputProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, type = 'text', name }) => {
    return (
        <div>
            <label>
                {label}
                <input type={type} value={value} onChange={onChange} name={name} />
            </label>
        </div>
    );
};

export default Input;
