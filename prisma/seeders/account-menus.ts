export const accountManagementTree = {
  name: "Accounts",
  url: "/accounts",
  children: [
    {
      name: "Account Overview",
      url: "/accounts/overview",
      children: []
    },
    {
      name: "Transactions",
      url: "/accounts/transactions",
      children: [
        {
          name: "Fund Transfers",
          url: "/accounts/transactions/fund-transfers",
          children: [
            {
              name: "Internal Transfers",
              url: "/accounts/transactions/fund-transfers/internal",
              children: []
            },
            {
              name: "External Transfers",
              url: "/accounts/transactions/fund-transfers/external",
              children: [
                {
                  name: "Bank-to-Bank Transfers",
                  url: "/accounts/transactions/fund-transfers/external/bank-to-bank",
                  children: []
                },
                {
                  name: "Wallet Transfers",
                  url: "/accounts/transactions/fund-transfers/external/wallet",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Payment History",
          url: "/accounts/transactions/payment-history",
          children: [
            {
              name: "Incoming Payments",
              url: "/accounts/transactions/payment-history/incoming",
              children: []
            },
            {
              name: "Outgoing Payments",
              url: "/accounts/transactions/payment-history/outgoing",
              children: [
                {
                  name: "Scheduled Payments",
                  url: "/accounts/transactions/payment-history/outgoing/scheduled",
                  children: []
                },
                {
                  name: "Immediate Payments",
                  url: "/accounts/transactions/payment-history/outgoing/immediate",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Deposits",
          url: "/accounts/transactions/deposits",
          children: [
            {
              name: "Cash Deposits",
              url: "/accounts/transactions/deposits/cash",
              children: []
            },
            {
              name: "Check Deposits",
              url: "/accounts/transactions/deposits/check",
              children: [
                {
                  name: "Cleared Checks",
                  url: "/accounts/transactions/deposits/check/cleared",
                  children: []
                },
                {
                  name: "Pending Checks",
                  url: "/accounts/transactions/deposits/check/pending",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Withdrawals",
          url: "/accounts/transactions/withdrawals",
          children: [
            {
              name: "ATM Withdrawals",
              url: "/accounts/transactions/withdrawals/atm",
              children: []
            },
            {
              name: "Bank Counter Withdrawals",
              url: "/accounts/transactions/withdrawals/counter",
              children: [
                {
                  name: "Verified Withdrawals",
                  url: "/accounts/transactions/withdrawals/counter/verified",
                  children: []
                },
                {
                  name: "Pending Approvals",
                  url: "/accounts/transactions/withdrawals/counter/pending",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Statements",
      url: "/accounts/statements",
      children: [
        {
          name: "Monthly Statements",
          url: "/accounts/statements/monthly",
          children: []
        },
        {
          name: "Yearly Reports",
          url: "/accounts/statements/yearly",
          children: [
            {
              name: "Tax Reports",
              url: "/accounts/statements/yearly/tax",
              children: []
            },
            {
              name: "Audited Reports",
              url: "/accounts/statements/yearly/audited",
              children: []
            }
          ]
        },
        {
          name: "Custom Reports",
          url: "/accounts/statements/custom",
          children: []
        }
      ]
    }
  ]
};