import { categories, products } from '../data/catalog.js'

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

async function remote(path, options) {
  if (!API_URL) throw new Error('API non configurée')
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) throw new Error(`API ${response.status}`)
  return response.json()
}

export async function getCatalog() {
  try { return await remote('/catalog') }
  catch { return { categories, products } }
}

export async function createOrder(payload) {
  try {
    return await remote('/orders', { method: 'POST', body: JSON.stringify(payload) })
  } catch {
    return { ok: true, demo: true, orderId: `DBS-${Date.now().toString().slice(-8)}` }
  }
}
