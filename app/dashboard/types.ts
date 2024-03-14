type AccType = {
  key: string;
  name: string;
  id: string;
};

type AdminUser = {
  name: string,
  email: string,
  role: string
}

type User = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional phone property
  permissions: Permissions
  roles: {
      type: string;
      role: string;
      locationIds: string[];
  };
}

type Permissions = {
  funnelsEnabled: boolean;
  dashboardStatsEnabled: boolean;
  phoneCallEnabled: boolean;
  workflowsReadOnly: boolean;
  contactsEnabled: boolean;
  tagsEnabled: boolean;
  websitesEnabled: boolean;
  campaignsReadOnly: boolean;
  appointmentsEnabled: boolean;
  assignedDataOnly: boolean;
  onlineListingsEnabled: boolean;
  marketingEnabled: boolean;
  attributionsReportingEnabled: boolean;
  membershipEnabled: boolean;
  settingsEnabled: boolean;
  leadValueEnabled: boolean;
  opportunitiesEnabled: boolean;
  reviewsEnabled: boolean;
  facebookAdsReportingEnabled: boolean;
  workflowsEnabled: boolean;
  campaignsEnabled: boolean;
  conversationsEnabled: boolean;
  adwordsReportingEnabled: boolean;
  bulkRequestsEnabled: boolean;
  triggersEnabled: boolean;
}

export type {Permissions, AccType, AdminUser,User };
