const mapping: Record<string, string> = {
  atms: 'atm',
  'bank-accounts': 'bank_account',
  branches: 'branch',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
