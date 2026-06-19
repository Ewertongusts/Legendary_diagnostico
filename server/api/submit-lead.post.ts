import { defineEventHandler, readBody } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('Sending webhook body:', JSON.stringify(body, null, 2))
  
  // Log payload to a local file in the workspace for debugging (only in development/local)
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    try {
      const logPath = path.resolve('submit-lead-payloads.json')
      const logData = {
        timestamp: new Date().toISOString(),
        payload: body
      }
      fs.appendFileSync(logPath, JSON.stringify(logData, null, 2) + ',\n')
    } catch (err) {
      console.error('Failed to write local payload log:', err)
    }
  }
  
  try {
    const response = await $fetch('https://back4.legendaryhub.com.br/api/webhooks/6ec2ca8a-ad59-43bd-a1b9-0d49930585b1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    return { success: true, data: response }
  } catch (error: any) {
    console.error('Webhook forward error:', error)
    return { success: false, error: error.message || error }
  }
})
