export const financeServiceTree = {
  name: "Finance Services",
  url: "/finance",
  children: [
    {
      name: "Payments",
      url: "/finance/payments",
      children: [
        {
          name: "Domestic Payments",
          url: "/finance/payments/domestic",
          children: [
            {
              name: "Bank Transfers",
              url: "/finance/payments/domestic/bank-transfers",
              children: [
                {
                  name: "RTGS",
                  url: "/finance/payments/domestic/bank-transfers/rtgs",
                  children: []
                },
                {
                  name: "NEFT",
                  url: "/finance/payments/domestic/bank-transfers/neft",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "International Payments",
          url: "/finance/payments/international",
          children: [
            {
              name: "SWIFT Transfers",
              url: "/finance/payments/international/swift",
              children: [
                {
                  name: "Wire Transfers",
                  url: "/finance/payments/international/swift/wire",
                  children: []
                },
                {
                  name: "Forex Payments",
                  url: "/finance/payments/international/swift/forex",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Scheduled Payments",
          url: "/finance/payments/scheduled",
          children: []
        }
      ]
    },
    {
      name: "Loans & Credit",
      url: "/finance/loans",
      children: [
        {
          name: "Loan Applications",
          url: "/finance/loans/applications",
          children: [
            {
              name: "Personal Loans",
              url: "/finance/loans/applications/personal",
              children: []
            },
            {
              name: "Business Loans",
              url: "/finance/loans/applications/business",
              children: [
                {
                  name: "SME Loans",
                  url: "/finance/loans/applications/business/sme",
                  children: []
                },
                {
                  name: "Corporate Loans",
                  url: "/finance/loans/applications/business/corporate",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Loan Repayments",
          url: "/finance/loans/repayments",
          children: [
            {
              name: "Auto-Debit Repayments",
              url: "/finance/loans/repayments/auto-debit",
              children: []
            },
            {
              name: "Manual Repayments",
              url: "/finance/loans/repayments/manual",
              children: [
                {
                  name: "Bank Transfer Repayments",
                  url: "/finance/loans/repayments/manual/bank-transfer",
                  children: []
                },
                {
                  name: "Cash Repayments",
                  url: "/finance/loans/repayments/manual/cash",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Credit Line",
          url: "/finance/loans/credit-line",
          children: []
        }
      ]
    },
    {
      name: "Investments",
      url: "/finance/investments",
      children: [
        {
          name: "Fixed Deposits",
          url: "/finance/investments/fixed-deposits",
          children: []
        },
        {
          name: "Mutual Funds",
          url: "/finance/investments/mutual-funds",
          children: [
            {
              name: "Equity Funds",
              url: "/finance/investments/mutual-funds/equity",
              children: []
            },
            {
              name: "Debt Funds",
              url: "/finance/investments/mutual-funds/debt",
              children: [
                {
                  name: "Government Bonds",
                  url: "/finance/investments/mutual-funds/debt/government-bonds",
                  children: []
                },
                {
                  name: "Corporate Bonds",
                  url: "/finance/investments/mutual-funds/debt/corporate-bonds",
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: "Stocks & Bonds",
          url: "/finance/investments/stocks-bonds",
          children: []
        }
      ]
    },
    {
      name: "Reconciliation",
      url: "/finance/reconciliation",
      children: [
        {
          name: "Bank Reconciliation",
          url: "/finance/reconciliation/bank",
          children: []
        },
        {
          name: "Cash Flow Reports",
          url: "/finance/reconciliation/cash-flow",
          children: [
            {
              name: "Daily Reports",
              url: "/finance/reconciliation/cash-flow/daily",
              children: []
            },
            {
              name: "Monthly Reports",
              url: "/finance/reconciliation/cash-flow/monthly",
              children: []
            }
          ]
        },
        {
          name: "Ledger Balancing",
          url: "/finance/reconciliation/ledger",
          children: [
            {
              name: "Trial Balance",
              url: "/finance/reconciliation/ledger/trial-balance",
              children: []
            },
            {
              name: "Final Balance",
              url: "/finance/reconciliation/ledger/final-balance",
              children: []
            }
          ]
        }
      ]
    }
  ]
};