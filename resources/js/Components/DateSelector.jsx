import React, { forwardRef, useState, useEffect } from 'react';
import SelectInput from '@/Components/SelectInput';

export default forwardRef(function DateSelect({ className = '', onChange, value }, ref) {
    const currentYear = new Date().getFullYear();
    const [selectedDate, setSelectedDate] = useState(() => {
        if (!value) return {};
        const date = new Date(value);
        return {
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString().padStart(2, '0'),
            day: date.getDate().toString().padStart(2, '0')
        };
    });

    useEffect(() => {
        onChange(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`);
    }, [selectedDate]);

    const handleDateChange = (field, value) => {
        setSelectedDate({ ...selectedDate, [field]: value });

    };

    const daysInMonth = new Date(selectedDate.year ?? currentYear, selectedDate.month ?? 1, 0).getDate();

    return (
        <div className={`flex mt-1 ${className}`}>
            <SelectInput
                optionsData={Array.from({ length: 120 }, (_, i) => (currentYear - i).toString())}
                className="block rounded-e-none w-full"
                onChange={e => handleDateChange('year', e.target.value)}
                value={selectedDate.year}
                defaultOption={'Year'}
            />
            <SelectInput
                optionsData={Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))}
                className="block rounded-s-none rounded-e-none w-full"
                onChange={e => handleDateChange('month', e.target.value)}
                value={selectedDate.month}
                defaultOption={'Month'}
            />
            <SelectInput
                optionsData={Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'))}
                className="block rounded-s-none w-full"
                onChange={e => handleDateChange('day', e.target.value)}
                value={selectedDate.day}
                defaultOption={'Day'}
            />
        </div>
    );
});
