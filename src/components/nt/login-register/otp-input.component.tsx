'use client';

import React, { useMemo, KeyboardEvent, FocusEvent, ChangeEvent } from 'react';

interface OtpInputProps {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, valueLength, onChange }) => {

    const RE_DIGIT = /^\d+$/;
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: string[] = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLInputElement) => {
        const nextElement = target.nextElementSibling as HTMLInputElement | null;
        if (nextElement) nextElement.focus();
    };

    const focusToPrevInput = (target: HTMLInputElement) => {
        const prevElement = target.previousElementSibling as HTMLInputElement | null;
        if (prevElement) prevElement.focus();
    };

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') return;

        targetValue = isTargetValueDigit ? targetValue : ' ';

        if (targetValue.length === 1) {
            const newValue =
                value.substring(0, idx) + targetValue + value.substring(idx + 1);
            onChange(newValue);
            if (!isTargetValueDigit) return;
            focusToNextInput(target);
        } else if (targetValue.length === valueLength) {
            onChange(targetValue);
            target.blur();
        }
    };

    const inputOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.currentTarget;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;
        target.setSelectionRange(0, targetValue.length);

        if (key !== 'Backspace' || targetValue !== '') return;

        focusToPrevInput(target);
    };

    const inputOnFocus = (e: FocusEvent<HTMLInputElement>) => {
        const { target } = e;
        const prevInput =
            target.previousElementSibling as HTMLInputElement | null;

        if (prevInput && prevInput.value === '') {
            return prevInput.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    return (
        <div className="otp-group col-12 d-flex justify-content-center">
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    id={`${idx}`}
                    type="text"
                    autoFocus={idx === 0}
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>
    );
};

export default OtpInput;
