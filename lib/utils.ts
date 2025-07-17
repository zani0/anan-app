// // lib/utils.ts

// export function cn(...classes: (string | false | null | undefined)[]) {
//   return classes.filter(Boolean).join(' ')
// }

import axios from 'axios'

const API_BASE_URL = 'http://192.168.100.4:3000/api' // Change this to your local IP if testing on a device

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
