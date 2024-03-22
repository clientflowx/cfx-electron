type AccType = {
  key?: string;
  name: string;
  id: string;
};

type AdminUser = {
  firstname: string,
  lastname: string,
  email: string;
  role: string;
};

type User = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional phone property
  permissions: Permissions;
  roles: {
    type: string;
    role: string;
    locationIds: string[];
  };
};

type Permissions = {
  adwordsReportingEnabled: boolean;
  affiliateManagerEnabled: boolean;
  agentReportingEnabled: boolean;
  appointmentsEnabled: boolean;
  assignedDataOnly: boolean;
  attributionsReportingEnabled: boolean;
  bloggingEnabled: boolean;
  botService: boolean;
  bulkRequestsEnabled: boolean;
  campaignsEnabled: boolean;
  campaignsReadOnly: boolean;
  cancelSubscriptionEnabled: boolean;
  communitiesEnabled: boolean;
  contactsEnabled: boolean;
  contentAiEnabled: boolean;
  conversationsEnabled: boolean;
  dashboardStatsEnabled: boolean;
  exportPaymentsEnabled: boolean;
  facebookAdsReportingEnabled: boolean;
  funnelsEnabled: boolean;
  invoiceEnabled: boolean;
  leadValueEnabled: boolean;
  marketingEnabled: boolean;
  membershipEnabled: boolean;
  onlineListingsEnabled: boolean;
  opportunitiesEnabled: boolean;
  paymentsEnabled: boolean;
  phoneCallEnabled: boolean;
  recordPaymentEnabled: boolean;
  refundsEnabled: boolean;
  reviewsEnabled: boolean;
  settingsEnabled: boolean;
  socialPlanner: boolean;
  tagsEnabled: boolean;
  triggersEnabled: boolean;
  websitesEnabled: boolean;
  workflowsEnabled: boolean;
  workflowsReadOnly: boolean;
};

interface Business {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  timezone: string;
}

interface Social {
  facebookUrl: string;
  googlePlus: string;
  linkedIn: string;
  foursquare: string;
  twitter: string;
  yelp: string;
  instagram: string;
  youtube: string;
  pinterest: string;
  blogRss: string;
  googlePlaceId: string;
}

interface Settings {
  allowDuplicateContact: boolean;
  allowDuplicateOpportunity: boolean;
  allowFacebookNameMerge: boolean;
  disableContactTimezone: boolean;
}

interface subAccountDataType {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  timezone: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  business: Business;
  social: Social;
  settings: Settings;
}

type newSubAccountDataType = {
  businessName: string,
  address: string,
  email: string,
  firstName: string,
  lastName: string
}


export type { Permissions, AccType, AdminUser, User, subAccountDataType, newSubAccountDataType };
