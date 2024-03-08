import React, { useEffect, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import "./PhoneNumberValidation.css"
import PhoneInput from 'react-phone-input-2';

export default function PhoneNumberValidation({ name, phoneNumber, onChange }: any) {
    const [valid, setValid] = useState<boolean>(true);

    const handleChange = (value: string) => {
        setValid(validatePhoneNumber(value));
        onChange && onChange({ target: { name, value } }); // Formik formunu güncelle
    };

    const validatePhoneNumber = (phoneNumber: string): boolean => {
        const phoneNumberPattern: RegExp = /^\+?[1-9]\d{1,14}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    return (
        <div>
            <label>
                <PhoneInput
                    country={'in'}
                    value={phoneNumber}
                    onChange={handleChange}
                    inputProps={{
                        required: true,
                        name: name, // name prop'unu PhoneInput'e ekleyin
                    }}
                />
            </label>
            {!valid && (
                <p className='phone-not-valid'>Lütfen geçerli telefon numarası giriniz.</p>
            )}
        </div>
    );
};
