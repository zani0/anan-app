// // lib/utils.ts

// export function cn(...classes: (string | false | null | undefined)[]) {
//   return classes.filter(Boolean).join(' ')
// }

import axios from 'axios'

const API_BASE_URL = 'http://192.168.100.25:3001/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
