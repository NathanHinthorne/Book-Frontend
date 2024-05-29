import React from 'react';

interface InputProps {
    label: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name: string;
}

function Input({ label, value, onChange, type = 'text', name }: InputProps) {
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
