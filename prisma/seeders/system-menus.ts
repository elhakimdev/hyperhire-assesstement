export const systemMenuTree = {
  name: "System",
  url: "/system",
  children: [
    {
      name: "User Management",
      url: "/system/users",
      children: [
        {
          name: "User List",
          url: "/system/users/list",
          children: []
        },
        {
          name: "Roles & Permissions",
          url: "/system/users/roles",
          children: [
            {
              name: "Admin Roles",
              url: "/system/users/roles/admin",
              children: []
            },
            {
              name: "Financial Roles",
              url: "/system/users/roles/financial",
              children: [
                {
                  name: "View-Only Permissions",
                  url: "/system/users/roles/financial/view-only",
                  children: []
                },
                {
                  name: "Full Access Permissions",
                  url: "/system/users/roles/financial/full-access",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Settings",
      url: "/system/settings",
      children: [
        {
          name: "General Settings",
          url: "/system/settings/general",
          children: []
        },
        {
          name: "Security Settings",
          url: "/system/settings/security",
          children: [
            {
              name: "Two-Factor Authentication",
              url: "/system/settings/security/2fa",
              children: []
            },
            {
              name: "Password Policies",
              url: "/system/settings/security/password-policies",
              children: [
                {
                  name: "Complexity Rules",
                  url: "/system/settings/security/password-policies/complexity",
                  children: []
                },
                {
                  name: "Expiration Rules",
                  url: "/system/settings/security/password-policies/expiration",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Notification Preferences",
          url: "/system/settings/notifications",
          children: []
        },
        {
          name: "Audit Logs",
          url: "/system/settings/audit-logs",
          children: []
        }
      ]
    }
  ]
};