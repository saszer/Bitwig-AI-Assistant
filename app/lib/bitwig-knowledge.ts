import { BitwigController } from './bitwig-controller'

interface QueryResponse {
  answer: string
  steps?: Step[]
  mousePositions?: MousePosition[]
  actions?: BitwigAction[]
  canExecute?: boolean
}

interface Step {
  id: string
  title: string
  description: string
  mousePosition?: MousePosition
  screenshot?: string
  action?: BitwigAction
}

interface MousePosition {
  x: number
  y: number
  action: 'click' | 'drag' | 'hover' | 'double-click'
  description: string
}

interface BitwigAction {
  type: 'click' | 'drag' | 'keyboard' | 'menu' | 'parameter' | 'device' | 'track'
  target: string
  value?: any
  coordinates?: { x: number; y: number }
  description: string
}

export class BitwigKnowledge {
  private knowledgeBase: Map<string, any>
  private controller: BitwigController

  constructor() {
    this.knowledgeBase = new Map()
    this.controller = new BitwigController()
    this.initializeKnowledgeBase()
  }

  private initializeKnowledgeBase() {
    // Basic Operations
    this.knowledgeBase.set('create_project', {
      answer: "I'll create a new project in Bitwig Studio for you!\n\n• Going to **File > New Project** or pressing **Ctrl+N**\n• Setting up project settings\n• Creating the new project\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Open File Menu',
          description: 'Click on the File menu in the top menu bar',
          mousePosition: { x: 50, y: 20, action: 'click', description: 'Click File menu' },
          action: {
            type: 'keyboard',
            target: 'Ctrl+N',
            description: 'Create new project with keyboard shortcut'
          }
        }
      ],
      actions: [
        {
          type: 'keyboard',
          target: 'Ctrl+N',
          description: 'Create new project'
        }
      ],
      canExecute: true
    })

    // Audio Recording
    this.knowledgeBase.set('record_audio', {
      answer: "I'll set up audio recording in Bitwig Studio for you!\n\n• **Arming the track** by clicking the record button\n• **Setting input source** - choosing your audio interface\n• **Starting recording** - pressing the main record button\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Arm the Track',
          description: 'Click the red record button on the track header to arm it for recording',
          mousePosition: { x: 150, y: 100, action: 'click', description: 'Click record arm button' },
          action: {
            type: 'click',
            target: 'record_arm_button',
            coordinates: { x: 150, y: 100 },
            description: 'Arm track for recording'
          }
        },
        {
          id: '2',
          title: 'Start Recording',
          description: 'Press the main record button in the transport bar to begin recording',
          mousePosition: { x: 400, y: 50, action: 'click', description: 'Click main record button' },
          action: {
            type: 'click',
            target: 'main_record_button',
            coordinates: { x: 400, y: 50 },
            description: 'Start recording'
          }
        }
      ],
      actions: [
        {
          type: 'click',
          target: 'record_arm_button',
          coordinates: { x: 150, y: 100 },
          description: 'Arm track for recording'
        },
        {
          type: 'click',
          target: 'main_record_button',
          coordinates: { x: 400, y: 50 },
          description: 'Start recording'
        }
      ],
      canExecute: true
    })

    // MIDI Recording
    this.knowledgeBase.set('record_midi', {
      answer: "I'll set up MIDI recording in Bitwig Studio for you!\n\n• **Creating a MIDI track** - adding a new MIDI track\n• **Arming the track** - enabling recording\n• **Starting recording** - pressing the record button\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Add MIDI Track',
          description: 'Right-click in the track list and select "Add MIDI Track"',
          mousePosition: { x: 100, y: 200, action: 'click', description: 'Right-click track list' },
          action: {
            type: 'track',
            target: 'add_midi_track',
            description: 'Add new MIDI track'
          }
        },
        {
          id: '2',
          title: 'Arm MIDI Track',
          description: 'Click the record button on the new MIDI track to arm it',
          mousePosition: { x: 150, y: 250, action: 'click', description: 'Click record arm button' },
          action: {
            type: 'click',
            target: 'midi_record_arm_button',
            coordinates: { x: 150, y: 250 },
            description: 'Arm MIDI track for recording'
          }
        }
      ],
      actions: [
        {
          type: 'track',
          target: 'add_midi_track',
          description: 'Add new MIDI track'
        },
        {
          type: 'click',
          target: 'midi_record_arm_button',
          coordinates: { x: 150, y: 250 },
          description: 'Arm MIDI track for recording'
        }
      ],
      canExecute: true
    })

    // Mixing
    this.knowledgeBase.set('mixing', {
      answer: "I'll help you set up mixing in Bitwig Studio!\n\n• **Adjusting track levels** - balancing volume between instruments\n• **Adding EQ** - inserting EQ+ device for frequency shaping\n• **Setting pan positions** - creating stereo width\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Add EQ Device',
          description: 'Right-click on track and select "Add Device > EQ+"',
          mousePosition: { x: 350, y: 200, action: 'click', description: 'Right-click track for device menu' },
          action: {
            type: 'device',
            target: 'add_eq_device',
            description: 'Add EQ+ device to track'
          }
        },
        {
          id: '2',
          title: 'Adjust Track Levels',
          description: 'Use the track faders to balance the volume of each instrument',
          mousePosition: { x: 300, y: 150, action: 'drag', description: 'Drag track fader up/down' },
          action: {
            type: 'parameter',
            target: 'track_volume',
            value: -6,
            description: 'Set track volume to -6dB'
          }
        }
      ],
      actions: [
        {
          type: 'device',
          target: 'add_eq_device',
          description: 'Add EQ+ device to track'
        },
        {
          type: 'parameter',
          target: 'track_volume',
          value: -6,
          description: 'Set track volume to -6dB'
        }
      ],
      canExecute: true
    })

    // Effects and Devices
    this.knowledgeBase.set('effects_devices', {
      answer: "I'll add effects and devices to your track in Bitwig Studio!\n\n• **Opening device browser** - pressing F4 or clicking browser button\n• **Adding device** - dragging device to track\n• **Configuring device** - adjusting parameters\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Open Device Browser',
          description: 'Press F4 or click the device browser button to open the device panel',
          mousePosition: { x: 800, y: 50, action: 'click', description: 'Click device browser button' },
          action: {
            type: 'keyboard',
            target: 'F4',
            description: 'Open device browser'
          }
        },
        {
          id: '2',
          title: 'Add Device to Track',
          description: 'Drag the device from the browser onto your track',
          mousePosition: { x: 850, y: 150, action: 'drag', description: 'Drag device to track' },
          action: {
            type: 'device',
            target: 'add_selected_device',
            description: 'Add selected device to track'
          }
        }
      ],
      actions: [
        {
          type: 'keyboard',
          target: 'F4',
          description: 'Open device browser'
        },
        {
          type: 'device',
          target: 'add_selected_device',
          description: 'Add selected device to track'
        }
      ],
      canExecute: true
    })

    // Automation
    this.knowledgeBase.set('automation', {
      answer: "I'll set up automation in Bitwig Studio for you!\n\n• **Enabling automation** - clicking the automation button or pressing A\n• **Selecting parameter** - choosing which parameter to automate\n• **Drawing automation** - using the pencil tool\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Enable Automation',
          description: 'Click the automation button on the track or press A key',
          mousePosition: { x: 400, y: 120, action: 'click', description: 'Click automation button' },
          action: {
            type: 'click',
            target: 'automation_button',
            coordinates: { x: 400, y: 120 },
            description: 'Enable automation mode'
          }
        },
        {
          id: '2',
          title: 'Select Parameter',
          description: 'Choose the parameter you want to automate from the dropdown menu',
          mousePosition: { x: 450, y: 140, action: 'click', description: 'Click parameter selector' },
          action: {
            type: 'parameter',
            target: 'automation_parameter',
            value: 'volume',
            description: 'Select volume parameter for automation'
          }
        }
      ],
      actions: [
        {
          type: 'click',
          target: 'automation_button',
          coordinates: { x: 400, y: 120 },
          description: 'Enable automation mode'
        },
        {
          type: 'parameter',
          target: 'automation_parameter',
          value: 'volume',
          description: 'Select volume parameter for automation'
        }
      ],
      canExecute: true
    })

    // Arrangement View
    this.knowledgeBase.set('arrangement', {
      answer: "I'll help you work with the Arrangement view in Bitwig Studio!\n\n• **Navigating timeline** - moving to different parts of your song\n• **Adding clips** - dragging clips from browser or recording\n• **Editing tools** - using scissors, glue, and other tools\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Navigate Timeline',
          description: 'Use the timeline ruler to navigate to different parts of your song',
          mousePosition: { x: 200, y: 50, action: 'click', description: 'Click on timeline to navigate' },
          action: {
            type: 'click',
            target: 'timeline_position',
            coordinates: { x: 200, y: 50 },
            description: 'Navigate to timeline position'
          }
        },
        {
          id: '2',
          title: 'Toggle Snap to Grid',
          description: 'Enable snap to grid for precise editing',
          mousePosition: { x: 600, y: 50, action: 'click', description: 'Click snap button' },
          action: {
            type: 'keyboard',
            target: 'S',
            description: 'Toggle snap to grid'
          }
        }
      ],
      actions: [
        {
          type: 'click',
          target: 'timeline_position',
          coordinates: { x: 200, y: 50 },
          description: 'Navigate to timeline position'
        },
        {
          type: 'keyboard',
          target: 'S',
          description: 'Toggle snap to grid'
        }
      ],
      canExecute: true
    })

    // Clip Launcher
    this.knowledgeBase.set('clip_launcher', {
      answer: "I'll help you use the Clip Launcher for live performance in Bitwig Studio!\n\n• **Switching to Session view** - accessing the clip launcher\n• **Creating clips** - recording or creating clips\n• **Launching clips** - clicking clips to launch them\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Switch to Session View',
          description: 'Click the Session view button to access the clip launcher',
          mousePosition: { x: 700, y: 50, action: 'click', description: 'Click Session view button' },
          action: {
            type: 'click',
            target: 'session_view_button',
            coordinates: { x: 700, y: 50 },
            description: 'Switch to Session view'
          }
        },
        {
          id: '2',
          title: 'Create New Clip',
          description: 'Click an empty clip slot to create a new clip',
          mousePosition: { x: 200, y: 150, action: 'click', description: 'Click empty clip slot' },
          action: {
            type: 'click',
            target: 'empty_clip_slot',
            coordinates: { x: 200, y: 150 },
            description: 'Create new clip'
          }
        }
      ],
      actions: [
        {
          type: 'click',
          target: 'session_view_button',
          coordinates: { x: 700, y: 50 },
          description: 'Switch to Session view'
        },
        {
          type: 'click',
          target: 'empty_clip_slot',
          coordinates: { x: 200, y: 150 },
          description: 'Create new clip'
        }
      ],
      canExecute: true
    })

    // Troubleshooting
    this.knowledgeBase.set('troubleshooting', {
      answer: "I'll help you troubleshoot Bitwig Studio issues!\n\n• **Opening preferences** - accessing system settings\n• **Adjusting audio settings** - fixing buffer size and dropouts\n• **Checking MIDI settings** - verifying device connections\n\n**Click 'Execute in Bitwig' to have me do this automatically!**",
      steps: [
        {
          id: '1',
          title: 'Open Preferences',
          description: 'Go to File > Preferences to access system settings',
          mousePosition: { x: 50, y: 20, action: 'click', description: 'Click File menu' },
          action: {
            type: 'menu',
            target: 'File > Preferences',
            description: 'Open preferences menu'
          }
        },
        {
          id: '2',
          title: 'Audio Settings',
          description: 'Navigate to Audio tab and adjust buffer size if experiencing dropouts',
          mousePosition: { x: 100, y: 100, action: 'click', description: 'Click Audio tab' },
          action: {
            type: 'click',
            target: 'audio_tab',
            coordinates: { x: 100, y: 100 },
            description: 'Open audio settings'
          }
        }
      ],
      actions: [
        {
          type: 'menu',
          target: 'File > Preferences',
          description: 'Open preferences menu'
        },
        {
          type: 'click',
          target: 'audio_tab',
          coordinates: { x: 100, y: 100 },
          description: 'Open audio settings'
        }
      ],
      canExecute: true
    })
  }

  async processQuery(query: string): Promise<QueryResponse> {
    const lowerQuery = query.toLowerCase()
    
    // Check for exact matches first
    for (const [key, value] of this.knowledgeBase) {
      if (lowerQuery.includes(key.replace('_', ' '))) {
        return value
      }
    }

    // Check for keyword matches
    const keywords = {
      'create': 'create_project',
      'new project': 'create_project',
      'start project': 'create_project',
      'record': 'record_audio',
      'recording': 'record_audio',
      'audio': 'record_audio',
      'midi': 'record_midi',
      'keyboard': 'record_midi',
      'mix': 'mixing',
      'mixing': 'mixing',
      'volume': 'mixing',
      'eq': 'mixing',
      'effect': 'effects_devices',
      'device': 'effects_devices',
      'plugin': 'effects_devices',
      'automation': 'automation',
      'automate': 'automation',
      'arrangement': 'arrangement',
      'timeline': 'arrangement',
      'clip': 'clip_launcher',
      'session': 'clip_launcher',
      'launch': 'clip_launcher',
      'problem': 'troubleshooting',
      'issue': 'troubleshooting',
      'crash': 'troubleshooting',
      'error': 'troubleshooting',
      'help': 'troubleshooting'
    }

    for (const [keyword, key] of Object.entries(keywords)) {
      if (lowerQuery.includes(keyword)) {
        return this.knowledgeBase.get(key)
      }
    }

    // Default response for unrecognized queries
    return {
      answer: "I'm here to help you with Bitwig Studio! I can assist with:\n\n• **Recording** - Audio and MIDI recording techniques\n• **Mixing** - Volume, panning, EQ, and effects\n• **Arrangement** - Timeline editing and clip management\n• **Clip Launcher** - Live performance and session view\n• **Automation** - Parameter automation and modulation\n• **Effects** - Using devices and plugins\n• **Troubleshooting** - Common issues and solutions\n\nTry asking about any of these topics or be more specific about what you'd like to learn!"
    }
  }

  async executeActions(actions: BitwigAction[]): Promise<string[]> {
    const results: string[] = []
    
    for (const action of actions) {
      try {
        const result = await this.controller.executeAction(action)
        results.push(result.message)
        
        // Add a small delay between actions
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        results.push(`Failed to execute action: ${error}`)
      }
    }
    
    return results
  }

  getController(): BitwigController {
    return this.controller
  }

  isBitwigConnected(): boolean {
    return this.controller.getConnectionStatus()
  }

  async checkBitwigConnectionAsync(): Promise<boolean> {
    return await this.controller.waitForInitialization()
  }
} 