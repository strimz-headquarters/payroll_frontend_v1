export const DiamondABI = [
  {
    type: "function",
    name: "diamondCut",
    inputs: [
      {
        name: "_diamondCut",
        type: "tuple[]",
        internalType: "struct IDiamondCut.FacetCut[]",
        components: [
          {
            name: "facetAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "action",
            type: "uint8",
            internalType: "enum IDiamondCut.FacetCutAction",
          },
          {
            name: "functionSelectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
      { name: "_init", type: "address", internalType: "address" },
      { name: "_calldata", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "DiamondCut",
    inputs: [
      {
        name: "_diamondCut",
        type: "tuple[]",
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        components: [
          {
            name: "facetAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "action",
            type: "uint8",
            internalType: "enum IDiamondCut.FacetCutAction",
          },
          {
            name: "functionSelectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
      {
        name: "_init",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_calldata",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DiamondCut",
    inputs: [
      {
        name: "_diamondCut",
        type: "tuple[]",
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        components: [
          {
            name: "facetAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "action",
            type: "uint8",
            internalType: "enum IDiamondCut.FacetCutAction",
          },
          {
            name: "functionSelectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
      {
        name: "_init",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_calldata",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "EmptyCalldata", inputs: [] },
  {
    type: "error",
    name: "ImmutableFunction",
    inputs: [{ name: "selector", type: "bytes4", internalType: "bytes4" }],
  },
  { type: "error", name: "InValidFacetCutAction", inputs: [] },
  { type: "error", name: "InitCallFailed", inputs: [] },
  { type: "error", name: "MustBeZeroAddress", inputs: [] },
  { type: "error", name: "NoCode", inputs: [] },
  { type: "error", name: "NoSelectorsInFacet", inputs: [] },
  { type: "error", name: "NoZeroAddress", inputs: [] },
  { type: "error", name: "NonEmptyCalldata", inputs: [] },
  {
    type: "error",
    name: "NonExistentSelector",
    inputs: [{ name: "selector", type: "bytes4", internalType: "bytes4" }],
  },
  { type: "error", name: "NotDiamondOwner", inputs: [] },
  {
    type: "error",
    name: "SameSelectorReplacement",
    inputs: [{ name: "selector", type: "bytes4", internalType: "bytes4" }],
  },
  {
    type: "error",
    name: "SelectorExists",
    inputs: [{ name: "selector", type: "bytes4", internalType: "bytes4" }],
  },
  {
    type: "function",
    name: "facetAddress",
    inputs: [
      {
        name: "_functionSelector",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      { name: "facetAddress_", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "facetAddresses",
    inputs: [],
    outputs: [
      {
        name: "facetAddresses_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "facetFunctionSelectors",
    inputs: [{ name: "_facet", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "facetFunctionSelectors_",
        type: "bytes4[]",
        internalType: "bytes4[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "facets",
    inputs: [],
    outputs: [
      {
        name: "facets_",
        type: "tuple[]",
        internalType: "struct IDiamondLoupe.Facet[]",
        components: [
          {
            name: "facetAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "functionSelectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "_interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "owner_", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "_newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "NotDiamondOwner", inputs: [] },
  {
    type: "constructor",
    inputs: [
      {
        name: "_receipients",
        type: "tuple[]",
        internalType: "struct Receipient[]",
        components: [
          { name: "username", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "_address", type: "address", internalType: "address" },
          { name: "valid", type: "bool", internalType: "bool" },
        ],
      },
      { name: "_token", type: "address", internalType: "address" },
      { name: "_start_date", type: "uint256", internalType: "uint256" },
      {
        name: "_frequency",
        type: "uint8",
        internalType: "enum Frequency",
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "add_receipients",
    inputs: [
      {
        name: "_new_receipients",
        type: "tuple[]",
        internalType: "struct Receipient[]",
        components: [
          { name: "username", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "_address", type: "address", internalType: "address" },
          { name: "valid", type: "bool", internalType: "bool" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },

  {
    type: "function",
    name: "getFrequency",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "enum Frequency" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastPayrollDate",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMonth",
    inputs: [{ name: "timestamp", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getOwner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPayrollDetails",
    inputs: [],
    outputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "_status", type: "uint8", internalType: "enum Status" },
      {
        name: "_frequency",
        type: "uint8",
        internalType: "enum Frequency",
      },
      { name: "_lastPayroll", type: "uint256", internalType: "uint256" },
      { name: "_startDate", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecipients",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Receipient[]",
        components: [
          { name: "username", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "_address", type: "address", internalType: "address" },
          { name: "valid", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStatus",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "enum Status" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenAddress",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalAmountToDisburse",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalTokenBalance",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getYear",
    inputs: [{ name: "timestamp", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "get_token",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPayrollDue",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "remove_receipients",
    inputs: [
      {
        name: "_receipients",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "update_frequency",
    inputs: [
      {
        name: "_frequency",
        type: "uint8",
        internalType: "enum Frequency",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "update_status",
    inputs: [{ name: "_status", type: "uint8", internalType: "enum Status" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "update_token",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Deposit",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Disburse",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "receipients",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenAdded",
    inputs: [
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenRemoved",
    inputs: [
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdrawal",
    inputs: [
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "addSupportedToken",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "add_receipients",
    inputs: [
      {
        name: "_new_receipients",
        type: "tuple[]",
        internalType: "struct Receipient[]",
        components: [
          { name: "username", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "_address", type: "address", internalType: "address" },
          { name: "valid", type: "bool", internalType: "bool" },
        ],
      },
      { name: "_title", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "delete_payroll",
    inputs: [{ name: "_title", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "disburse",
    inputs: [{ name: "_title", type: "bytes32", internalType: "bytes32" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getActivePayrolls",
    inputs: [],
    outputs: [
      {
        name: "activePayrolls",
        type: "tuple[]",
        internalType: "struct PayrollInfo[]",
        components: [
          {
            name: "payrollAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "ownerAddress",
            type: "address",
            internalType: "address",
          },
          { name: "title", type: "bytes32", internalType: "bytes32" },
          { name: "status", type: "uint8", internalType: "enum Status" },
          {
            name: "frequency",
            type: "uint8",
            internalType: "enum Frequency",
          },
          {
            name: "tokenAddress",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllPayrolls",
    inputs: [],
    outputs: [
      {
        name: "activePayrolls",
        type: "tuple[]",
        internalType: "struct PayrollInfo[]",
        components: [
          {
            name: "payrollAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "ownerAddress",
            type: "address",
            internalType: "address",
          },
          { name: "title", type: "bytes32", internalType: "bytes32" },
          { name: "status", type: "uint8", internalType: "enum Status" },
          {
            name: "frequency",
            type: "uint8",
            internalType: "enum Frequency",
          },
          {
            name: "tokenAddress",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFullPayrollInfo",
    inputs: [{ name: "_title", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      {
        name: "info",
        type: "tuple",
        internalType: "struct PayrollInfo",
        components: [
          {
            name: "payrollAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "ownerAddress",
            type: "address",
            internalType: "address",
          },
          { name: "title", type: "bytes32", internalType: "bytes32" },
          { name: "status", type: "uint8", internalType: "enum Status" },
          {
            name: "frequency",
            type: "uint8",
            internalType: "enum Frequency",
          },
          {
            name: "tokenAddress",
            type: "address",
            internalType: "address",
          },
        ],
      },
      {
        name: "recipients",
        type: "tuple[]",
        internalType: "struct Receipient[]",
        components: [
          { name: "username", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "_address", type: "address", internalType: "address" },
          { name: "valid", type: "bool", internalType: "bool" },
        ],
      },
      { name: "totalAmount", type: "uint256", internalType: "uint256" },
      {
        name: "lastPayrollDate",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPayrollAddress",
    inputs: [
      { name: "cowner", type: "address", internalType: "address" },
      { name: "title", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPayrollDetails",
    inputs: [{ name: "_title", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "_status", type: "uint8", internalType: "enum Status" },
      {
        name: "_frequency",
        type: "uint8",
        internalType: "enum Frequency",
      },
      { name: "_lastPayroll", type: "uint256", internalType: "uint256" },
      { name: "_startDate", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPayrollOwner",
    inputs: [{ name: "_title", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPayrollsByOwner",
    inputs: [{ name: "_owner", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "ownerPayrolls",
        type: "tuple[]",
        internalType: "struct PayrollInfo[]",
        components: [
          {
            name: "payrollAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "ownerAddress",
            type: "address",
            internalType: "address",
          },
          { name: "title", type: "bytes32", internalType: "bytes32" },
          { name: "status", type: "uint8", internalType: "enum Status" },
          {
            name: "frequency",
            type: "uint8",
            internalType: "enum Frequency",
          },
          {
            name: "tokenAddress",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalPayrolls",
    inputs: [],
    outputs: [
      { name: "total", type: "uint256", internalType: "uint256" },
      { name: "active", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserHistory",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct History[]",
        components: [
          { name: "success", type: "bool", internalType: "bool" },
          { name: "owner", type: "address", internalType: "address" },
          { name: "timestamp", type: "uint256", internalType: "uint256" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "title", type: "bytes32", internalType: "bytes32" },
          { name: "token", type: "address", internalType: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "new_payroll",
    inputs: [
      { name: "_title", type: "bytes32", internalType: "bytes32" },
      {
        name: "_receipients",
        type: "tuple[]",
        internalType: "struct Receipient[]",
        components: [
          { name: "username", type: "string", internalType: "string" },
          { name: "amount", type: "uint256", internalType: "uint256" },
          { name: "_address", type: "address", internalType: "address" },
          { name: "valid", type: "bool", internalType: "bool" },
        ],
      },
      { name: "_token", type: "address", internalType: "address" },
      { name: "_start_date", type: "uint256", internalType: "uint256" },
      {
        name: "_frequency",
        type: "uint8",
        internalType: "enum Frequency",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeSupportedToken",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "remove_receipients",
    inputs: [
      {
        name: "_receipients",
        type: "address[]",
        internalType: "address[]",
      },
      { name: "_title", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "update_frequency",
    inputs: [
      {
        name: "_frequency",
        type: "uint8",
        internalType: "enum Frequency",
      },
      { name: "_title", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "update_status",
    inputs: [
      { name: "_status", type: "uint8", internalType: "enum Status" },
      { name: "_title", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "update_token",
    inputs: [
      { name: "_token", type: "address", internalType: "address" },
      { name: "_title", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Disburse",
    inputs: [
      {
        name: "success",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "title",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewPayroll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "title",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];
