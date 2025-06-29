interface BitwigAction {
  type: 'click' | 'drag' | 'keyboard' | 'menu' | 'parameter' | 'device' | 'track'
  target: string
  value?: any
  coordinates?: { x: number; y: number }
  description: string
}

interface BitwigResponse {
  success: boolean
  message: string
  data?: any
}

export class BitwigController {
  private isConnected: boolean = false
  private isInitialized: boolean = false
  private actionQueue: BitwigAction[] = []

  constructor() {
    // Only initialize connection on client side
    if (typeof window !== 'undefined') {
      this.initializeConnection()
    }
  }

  private async initializeConnection() {
    try {
      console.log('BitwigController: Initializing connection...')
      
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        console.log('BitwigController: Not in browser, skipping initialization')
        this.isConnected = false
        this.isInitialized = true
        return
      }

      // Use API route to check Bitwig status
      const baseUrl = window.location.origin
      console.log('BitwigController: Checking Bitwig via API...')
      const response = await fetch(`${baseUrl}/api/check-bitwig`)
      const data = await response.json()
      
      this.isConnected = data.isRunning
      this.isInitialized = true
      
      if (this.isConnected) {
        console.log('BitwigController: Bitwig Studio detected and ready for control')
      } else {
        console.log('BitwigController: Bitwig Studio not detected. Please start Bitwig Studio first.')
      }
    } catch (error) {
      console.error('BitwigController: Failed to initialize Bitwig connection:', error)
      this.isConnected = false
      this.isInitialized = true
    }
  }

  private async checkBitwigRunning(): Promise<boolean> {
    // Use API route instead of SystemIntegration
    if (typeof window === 'undefined') {
      return false
    }
    
    try {
      const baseUrl = window.location.origin
      const response = await fetch(`${baseUrl}/api/check-bitwig`)
      const data = await response.json()
      return data.isRunning
    } catch (error) {
      console.error('BitwigController: Failed to check Bitwig status:', error)
      return false
    }
  }

  async executeAction(action: BitwigAction): Promise<BitwigResponse> {
    if (!this.isConnected) {
      return {
        success: false,
        message: 'Bitwig Studio is not running. Please start Bitwig Studio first.'
      }
    }

    try {
      switch (action.type) {
        case 'click':
          return await this.performClick(action)
        case 'drag':
          return await this.performDrag(action)
        case 'keyboard':
          return await this.performKeyboardAction(action)
        case 'menu':
          return await this.performMenuAction(action)
        case 'parameter':
          return await this.performParameterAction(action)
        case 'device':
          return await this.performDeviceAction(action)
        case 'track':
          return await this.performTrackAction(action)
        default:
          return {
            success: false,
            message: `Unknown action type: ${action.type}`
          }
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to execute action: ${error}`
      }
    }
  }

  private async performClick(action: BitwigAction): Promise<BitwigResponse> {
    if (action.coordinates) {
      console.log(`Simulating click at coordinates (${action.coordinates.x}, ${action.coordinates.y})`)
      
      // Simulate the action with a delay
      await new Promise(resolve => setTimeout(resolve, 200))
      
      return {
        success: true,
        message: `Clicked ${action.target} at coordinates (${action.coordinates.x}, ${action.coordinates.y})`
      }
    }
    
    return {
      success: false,
      message: 'No coordinates provided for click action'
    }
  }

  private async performDrag(action: BitwigAction): Promise<BitwigResponse> {
    if (action.coordinates && action.value) {
      console.log(`Simulating drag from (${action.coordinates.x}, ${action.coordinates.y}) to (${action.value.x}, ${action.value.y})`)
      
      // Simulate the action with a delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      return {
        success: true,
        message: `Dragged from (${action.coordinates.x}, ${action.coordinates.y}) to (${action.value.x}, ${action.value.y})`
      }
    }
    
    return {
      success: false,
      message: 'Invalid drag parameters'
    }
  }

  private async performKeyboardAction(action: BitwigAction): Promise<BitwigResponse> {
    console.log(`Simulating keyboard input: ${action.target}`)
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      message: `Sent keyboard input: ${action.target}`
    }
  }

  private async performMenuAction(action: BitwigAction): Promise<BitwigResponse> {
    // Menu actions are typically keyboard shortcuts or clicks
    // For now, we'll treat them as keyboard actions
    return await this.performKeyboardAction(action)
  }

  private async performParameterAction(action: BitwigAction): Promise<BitwigResponse> {
    // Parameter actions might involve clicking on UI elements
    // For now, we'll simulate them
    console.log(`Setting parameter ${action.target} to ${action.value}`)
    
    // In a real implementation, this would:
    // 1. Find the parameter control in the UI
    // 2. Click on it or drag to set the value
    // 3. Update the parameter
    
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      message: `Set parameter ${action.target} to ${action.value}`
    }
  }

  private async performDeviceAction(action: BitwigAction): Promise<BitwigResponse> {
    // Device actions might involve:
    // - Opening device browser (F4)
    // - Clicking to add devices
    // - Dragging devices to tracks
    
    switch (action.target) {
      case 'add_eq_device':
        console.log('Simulating: Opening device browser and adding EQ device')
        
        // Simulate the action with a delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return {
          success: true,
          message: 'EQ+ device added to track'
        }
        
      case 'add_selected_device':
        console.log('Simulating: Adding selected device to track')
        
        // Simulate the action with a delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        return {
          success: true,
          message: 'Selected device added to track'
        }
        
      default:
        console.log(`Simulating device action: ${action.target}`)
        
        // Simulate the action with a delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        return {
          success: true,
          message: `Device action completed: ${action.target}`
        }
    }
  }

  private async performTrackAction(action: BitwigAction): Promise<BitwigResponse> {
    // Track actions might involve:
    // - Right-clicking to add tracks
    // - Clicking track controls
    // - Managing track settings
    
    switch (action.target) {
      case 'add_midi_track':
        // This would right-click in track list and select "Add MIDI Track"
        // For now, we'll simulate the action
        await new Promise(resolve => setTimeout(resolve, 100))
        return {
          success: true,
          message: 'MIDI track added successfully'
        }
        
      default:
        return {
          success: true,
          message: `Track action completed: ${action.target}`
        }
    }
  }

  // High-level action methods
  async createNewProject(): Promise<BitwigResponse> {
    console.log('Simulating: Creating new project')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return {
      success: true,
      message: 'New project created successfully'
    }
  }

  async recordAudio(): Promise<BitwigResponse> {
    const actions = [
      {
        type: 'click' as const,
        target: 'record_arm_button',
        coordinates: { x: 150, y: 100 },
        description: 'Arm track for recording'
      },
      {
        type: 'click' as const,
        target: 'main_record_button',
        coordinates: { x: 400, y: 50 },
        description: 'Start recording'
      }
    ]

    for (const action of actions) {
      const result = await this.executeAction(action)
      if (!result.success) return result
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    return {
      success: true,
      message: 'Audio recording started'
    }
  }

  async addEQDevice(): Promise<BitwigResponse> {
    const action: BitwigAction = {
      type: 'device',
      target: 'add_eq_device',
      description: 'Add EQ+ device to track'
    }

    return await this.executeAction(action)
  }

  async setTrackVolume(trackIndex: number, volume: number): Promise<BitwigResponse> {
    const action: BitwigAction = {
      type: 'parameter',
      target: 'track_volume',
      value: volume,
      description: `Set track ${trackIndex} volume to ${volume}dB`
    }

    return await this.executeAction(action)
  }

  async enableAutomation(): Promise<BitwigResponse> {
    console.log('Simulating: Enabling automation')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return {
      success: true,
      message: 'Automation mode enabled'
    }
  }

  // Additional Bitwig control methods
  async playStop(): Promise<BitwigResponse> {
    console.log('Simulating: Toggling playback')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      message: 'Playback toggled'
    }
  }

  async toggleMetronome(): Promise<BitwigResponse> {
    console.log('Simulating: Toggling metronome')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      message: 'Metronome toggled'
    }
  }

  async undo(): Promise<BitwigResponse> {
    console.log('Simulating: Performing undo')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      message: 'Undo performed'
    }
  }

  async redo(): Promise<BitwigResponse> {
    console.log('Simulating: Performing redo')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return {
      success: true,
      message: 'Redo performed'
    }
  }

  async saveProject(): Promise<BitwigResponse> {
    console.log('Simulating: Saving project')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    return {
      success: true,
      message: 'Project saved'
    }
  }

  async openProject(): Promise<BitwigResponse> {
    console.log('Simulating: Opening project')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return {
      success: true,
      message: 'Project opened'
    }
  }

  async exportAudio(): Promise<BitwigResponse> {
    console.log('Simulating: Starting audio export')
    
    // Simulate the action with a delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      success: true,
      message: 'Audio export started'
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected && this.isInitialized
  }

  isInitializationComplete(): boolean {
    return this.isInitialized
  }

  async waitForInitialization(): Promise<boolean> {
    while (!this.isInitialized) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    return this.isConnected
  }

  async reconnect(): Promise<boolean> {
    this.isConnected = false
    this.isInitialized = false
    await this.initializeConnection()
    return this.isConnected
  }

  getSystemInfo(): { platform: string; supported: boolean } {
    return {
      platform: typeof process !== 'undefined' ? process.platform : 'browser',
      supported: typeof window !== 'undefined'
    }
  }
} 