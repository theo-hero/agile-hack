import React, { useState, useRef } from "react";

interface TimelineProps {
    min: number;
    max: number;
    value: number;
    step: number;
}

const Timeline: React.FC<TimelineProps> = ({ min, max, value, step }) => {
    const [sliderRange, setSliderRange] = useState<number>((value - min) / (max - min) * 100);
    const [inputValue, setInputValue] = useState<number>(value);
    const sliderRef = useRef<HTMLInputElement | null>(null);

    const handleSliderInput = () => {
        if (!sliderRef.current) return;

        const currentValue = parseFloat(sliderRef.current.value);
        const range = max - min;
        const distance = currentValue - min;
        const percentage = (distance / range) * 100;

        setSliderRange(percentage);
        setInputValue(currentValue);
    };

    const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = parseFloat(e.target.value);

        if (currentValue >= min && currentValue <= max) {
            setInputValue(currentValue);
            const percentage = ((currentValue - min) / (max - min)) * 100;
            setSliderRange(percentage);
        }
    };

    return (
        <div className="range-slider">
            <div className="slider-values">
                <input
                    type="number"
                    onChange={handleNumberInput}
                    value={inputValue}
                    className="number-input"
                    min={min}
                    max={max}
                    step={step}
                />
            </div>

            <div className="slider-container">
                <input
                    type="range"
                    onInput={handleSliderInput}
                    value={inputValue}
                    className="slider"
                    min={min}
                    max={max}
                    step={step}
                    ref={sliderRef}
                />
                <div
                    className="slider-thumb"
                    style={{
                        left: `${sliderRange}%`
                    }}
                ></div>
                <div
                    className="progress"
                    style={{ width: `${sliderRange}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Timeline;
