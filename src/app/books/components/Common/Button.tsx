import React from 'react';

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

function Button({ label, onClick, type = 'button', disabled = false, className }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={className}>
            {label}
        </button>
    );
};

export default Button;