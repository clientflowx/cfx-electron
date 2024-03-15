// Inside the Toggle component

import React, { useState } from "react";
import { Permissions } from "@/app/dashboard/types";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
  role: string;
  locationIds: string[];
  permissions: {
    campaignsEnabled: boolean;
    campaignsReadOnly: boolean;
    contactsEnabled: boolean;
    workflowsEnabled: boolean;
    triggersEnabled: boolean;
    funnelsEnabled: boolean;
    websitesEnabled: boolean;
    opportunitiesEnabled: boolean;
    dashboardStatsEnabled: boolean;
    bulkRequestsEnabled: boolean;
    appointmentsEnabled: boolean;
    reviewsEnabled: boolean;
    onlineListingsEnabled: boolean;
    phoneCallEnabled: boolean;
    conversationsEnabled: boolean;
    assignedDataOnly: boolean;
    adwordsReportingEnabled: boolean;
    membershipEnabled: boolean;
    facebookAdsReportingEnabled: boolean;
    attributionsReportingEnabled: boolean;
    settingsEnabled: boolean;
    tagsEnabled: boolean;
    leadValueEnabled: boolean;
    marketingEnabled: boolean;
  };
}

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

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(permission, newValue);
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
