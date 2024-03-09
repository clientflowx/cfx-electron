// Inside the Toggle component

import React, { useState } from "react";

interface ToggleProps {
  title: string;
  onChange: (permission: string, value: boolean) => void; // Callback function to handle toggle change
}

const Toggle: React.FC<ToggleProps> = ({ title, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(title, newValue); // Invoke the onChange callback with the title and new value
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-sm font-medium">{title}</span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
        />
        <div
          className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
        />
      </label>
    </div>
  );
};

export default Toggle;
