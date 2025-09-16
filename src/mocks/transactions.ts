export type MockTx = {
  hash: string
  type: 'Mint' | 'Transfer'
  date: string
  from?: string
  to?: string
  amount: number // positive for in, negative for out
}

// Mock transaction list based on requested hashes
export const MOCK_TRANSACTIONS: MockTx[] = [
  {
    hash: '0x2497120e760ab18085d8ec727106162556e111da064f20b93c301026086bcc08',
    type: 'Transfer',
    date: '09/15/2025, 04:29 PM',
    from: '0x59f6fae6...'
    , to: '0xed66ca98...',
    amount: -1000,
  },
  {
    hash: '0x62a95ee9abe5797de2d7dce741064a9553f2717debe51017476da921e65686ef',
    type: 'Mint',
    date: '09/15/2025, 04:28 PM',
    from: '0x59f6fae6...',
    amount: 10200,
  },
  {
    hash: '0xb7d87d1f8e87f324ec0d176666dfe6181ba811a799fe5159ee2e3f5649564dea',
    type: 'Transfer',
    date: '09/13/2025, 06:52 PM',
    from: '0x59f6fae6...',
    to: '0xed66ca98...',
    amount: -400,
  },
  {
    hash: '0xbeb2b65795a1b6789f788ff9f788a5500d93710e3dc7388731b97dfd84f9a0a5',
    type: 'Mint',
    date: '09/13/2025, 06:50 PM',
    from: '0x59f6fae6...',
    amount: 20000,
  },
  {
    hash: '0xa30156f7d96c0796ba1db93ba49592cd184d0a98a16aeed386a385740eb24a8d',
    type: 'Transfer',
    date: '09/13/2025, 11:48 AM',
    from: '0x59f6fae6...',
    to: '0xed66ca98...',
    amount: -8800,
  },
  {
    hash: '0x3730d2c66849162de58a89ca6c1dc7b71ff1f673aeecf245c58adb71ce0c07ad',
    type: 'Mint',
    date: '09/12/2025, 08:40 AM',
    from: '0x59f6fae6...',
    amount: 2000000,
  },
  {
    hash: '0xd4838b5011b781c5707f2b135670dc9713f228d53a422e9a27f06c44c7ca28e3',
    type: 'Transfer',
    date: '09/11/2025, 05:12 PM',
    from: '0x59f6fae6...',
    to: '0xed66ca98...',
    amount: -2500,
  },
]


