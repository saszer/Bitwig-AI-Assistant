import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    console.log('API: Checking Bitwig Studio process...')
    
    // Check if we're on Windows
    if (process.platform !== 'win32') {
      console.log('API: Not on Windows, returning false')
      return NextResponse.json({ 
        isRunning: false, 
        error: 'Only Windows is supported' 
      })
    }

    // Use tasklist to check for Bitwig Studio process
    console.log('API: Executing tasklist command...')
    const { stdout, stderr } = await execAsync('tasklist /FI "IMAGENAME eq Bitwig Studio.exe" /FO CSV /NH')
    
    console.log('API: tasklist stdout:', stdout)
    if (stderr) console.log('API: tasklist stderr:', stderr)
    
    // If the output contains "Bitwig Studio.exe", the process is running
    const isRunning = stdout.includes('Bitwig Studio.exe')
    
    console.log(`API: Bitwig Studio is ${isRunning ? 'running' : 'not running'}`)
    
    return NextResponse.json({ 
      isRunning,
      timestamp: new Date().toISOString(),
      stdout: stdout.trim()
    })
  } catch (error) {
    console.error('API: Error checking Bitwig process:', error)
    return NextResponse.json({ 
      isRunning: false, 
      error: error instanceof Error ? error.message : 'Failed to check process',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 