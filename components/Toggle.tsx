// Inside the Toggle component
"use client"
import React, { useEffect, useState } from "react";
import { Permissions } from "@/app/dashboard/types";

interface ToggleProps {
  title: string;
  onChange: (permission: keyof Permissions, value: boolean) => void; // Callback function to handle toggle change
  value: boolean;
  permission: keyof Permissions;
}

const Toggle: React.FC<ToggleProps> = ({
  title,
  onChange,
  value,
  permission,
}) => {
  const [checked, setChecked] = useState<boolean>(value);

  useEffect(() => {
    setChecked(value);
  }, [value]); 

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(permission, newValue);
  };

  console.log("checked value is: ", checked);
  console.log("prop value is: ", value);


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
