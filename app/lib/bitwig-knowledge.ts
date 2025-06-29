interface QueryResponse {
  answer: string
  steps?: Step[]
  mousePositions?: MousePosition[]
}

interface Step {
  id: string
  title: string
  description: string
  mousePosition?: MousePosition
  screenshot?: string
}

interface MousePosition {
  x: number
  y: number
  action: 'click' | 'drag' | 'hover' | 'double-click'
  description: string
}

export class BitwigKnowledge {
  private knowledgeBase: Map<string, any>

  constructor() {
    this.knowledgeBase = new Map()
    this.initializeKnowledgeBase()
  }

  private initializeKnowledgeBase() {
    // Basic Operations
    this.knowledgeBase.set('create_project', {
      answer: "To create a new project in Bitwig Studio:\n\n• Go to **File > New Project** or press **Ctrl+N** (Windows) / **Cmd+N** (Mac)\n• Choose your project settings (sample rate, bit depth)\n• Select a template if desired\n• Click **Create** to start your new project",
      steps: [
        {
          id: '1',
          title: 'Open File Menu',
          description: 'Click on the File menu in the top menu bar',
          mousePosition: { x: 50, y: 20, action: 'click', description: 'Click File menu' }
        },
        {
          id: '2',
          title: 'Select New Project',
          description: 'From the File menu, select "New Project" option',
          mousePosition: { x: 50, y: 60, action: 'click', description: 'Click New Project' }
        },
        {
          id: '3',
          title: 'Configure Settings',
          description: 'Set your desired sample rate and bit depth in the project settings dialog',
          mousePosition: { x: 400, y: 300, action: 'click', description: 'Click sample rate dropdown' }
        },
        {
          id: '4',
          title: 'Create Project',
          description: 'Click the Create button to start your new project',
          mousePosition: { x: 500, y: 400, action: 'click', description: 'Click Create button' }
        }
      ]
    })

    // Audio Recording
    this.knowledgeBase.set('record_audio', {
      answer: "To record audio in Bitwig Studio:\n\n• **Arm the track** by clicking the record button (red circle) on the track header\n• **Set input source** - choose your audio interface input in the track's input selector\n• **Adjust levels** - ensure your input signal is not clipping (keep it in the green/yellow range)\n• **Press record** - click the main record button in the transport bar or press **R**\n• **Start playback** - press **Space** or click play to begin recording\n• **Stop recording** - press **Space** again or click stop when finished",
      steps: [
        {
          id: '1',
          title: 'Arm the Track',
          description: 'Click the red record button on the track header to arm it for recording',
          mousePosition: { x: 150, y: 100, action: 'click', description: 'Click record arm button' }
        },
        {
          id: '2',
          title: 'Select Input Source',
          description: 'Choose your audio interface input from the track input selector',
          mousePosition: { x: 200, y: 120, action: 'click', description: 'Click input selector' }
        },
        {
          id: '3',
          title: 'Check Input Levels',
          description: 'Monitor the input level meter to ensure proper signal strength',
          mousePosition: { x: 250, y: 150, action: 'hover', description: 'Hover over level meter' }
        },
        {
          id: '4',
          title: 'Start Recording',
          description: 'Press the main record button in the transport bar to begin recording',
          mousePosition: { x: 400, y: 50, action: 'click', description: 'Click main record button' }
        }
      ]
    })

    // MIDI Recording
    this.knowledgeBase.set('record_midi', {
      answer: "To record MIDI in Bitwig Studio:\n\n• **Create a MIDI track** - right-click in the track list and select 'Add MIDI Track'\n• **Arm the track** - click the record button on the MIDI track\n• **Select MIDI input** - choose your MIDI device from the track input selector\n• **Press record** - click the main record button or press **R**\n• **Play your MIDI device** - start playing your keyboard, drum pad, etc.\n• **Stop recording** - press **Space** or click stop when finished\n\n**Pro Tips:**\n• Use **Quantize** to fix timing issues after recording\n• Enable **Metronome** for better timing (press **M**)\n• Use **Punch In/Out** for precise recording sections",
      steps: [
        {
          id: '1',
          title: 'Add MIDI Track',
          description: 'Right-click in the track list and select "Add MIDI Track"',
          mousePosition: { x: 100, y: 200, action: 'click', description: 'Right-click track list' }
        },
        {
          id: '2',
          title: 'Arm MIDI Track',
          description: 'Click the record button on the new MIDI track to arm it',
          mousePosition: { x: 150, y: 250, action: 'click', description: 'Click record arm button' }
        },
        {
          id: '3',
          title: 'Select MIDI Input',
          description: 'Choose your MIDI device from the track input selector',
          mousePosition: { x: 200, y: 270, action: 'click', description: 'Click MIDI input selector' }
        },
        {
          id: '4',
          title: 'Start Recording',
          description: 'Press the main record button and start playing your MIDI device',
          mousePosition: { x: 400, y: 50, action: 'click', description: 'Click main record button' }
        }
      ]
    })

    // Mixing
    this.knowledgeBase.set('mixing', {
      answer: "Essential mixing techniques in Bitwig Studio:\n\n• **Volume Balance** - Use track faders to balance levels between instruments\n• **Panning** - Use pan controls to create stereo width and separation\n• **EQ** - Add an EQ+ device to shape frequency content\n• **Compression** - Use Compressor device to control dynamics\n• **Reverb/Delay** - Add time-based effects for depth and space\n• **Side-chaining** - Use side-chain compression for pumping effects\n\n**Workflow Tips:**\n• Start with the kick drum at -6dB and mix everything around it\n• Use the spectrum analyzer to identify frequency conflicts\n• Group related tracks using track groups for easier mixing\n• Use the master track for overall level control",
      steps: [
        {
          id: '1',
          title: 'Adjust Track Levels',
          description: 'Use the track faders to balance the volume of each instrument',
          mousePosition: { x: 300, y: 150, action: 'drag', description: 'Drag track fader up/down' }
        },
        {
          id: '2',
          title: 'Set Pan Position',
          description: 'Use the pan control to position sounds in the stereo field',
          mousePosition: { x: 320, y: 170, action: 'drag', description: 'Drag pan control left/right' }
        },
        {
          id: '3',
          title: 'Add EQ Device',
          description: 'Right-click on track and select "Add Device > EQ+"',
          mousePosition: { x: 350, y: 200, action: 'click', description: 'Right-click track for device menu' }
        },
        {
          id: '4',
          title: 'Adjust EQ Settings',
          description: 'Use the EQ+ interface to shape the frequency response',
          mousePosition: { x: 500, y: 300, action: 'drag', description: 'Drag EQ bands to adjust frequencies' }
        }
      ]
    })

    // Effects and Devices
    this.knowledgeBase.set('effects_devices', {
      answer: "Working with effects and devices in Bitwig Studio:\n\n• **Add Device** - Right-click on a track and select 'Add Device' or drag from the browser\n• **Device Browser** - Press **F4** to open the device browser\n• **Device Chain** - Devices process in order from top to bottom\n• **Device Presets** - Save and load device settings using the preset system\n• **Modulation** - Use the modulation system to create dynamic effects\n\n**Popular Devices:**\n• **EQ+** - Parametric equalizer with spectrum analyzer\n• **Compressor** - Dynamic range compression\n• **Reverb** - Room and hall reverb effects\n• **Delay** - Time-based delay effects\n• **Filter** - Low-pass, high-pass, and band-pass filters\n• **Distortion** - Various distortion and saturation effects",
      steps: [
        {
          id: '1',
          title: 'Open Device Browser',
          description: 'Press F4 or click the device browser button to open the device panel',
          mousePosition: { x: 800, y: 50, action: 'click', description: 'Click device browser button' }
        },
        {
          id: '2',
          title: 'Select Device',
          description: 'Browse and select the desired effect or instrument device',
          mousePosition: { x: 850, y: 150, action: 'click', description: 'Click on device in browser' }
        },
        {
          id: '3',
          title: 'Add to Track',
          description: 'Drag the device from the browser onto your track',
          mousePosition: { x: 850, y: 150, action: 'drag', description: 'Drag device to track' }
        },
        {
          id: '4',
          title: 'Configure Device',
          description: 'Adjust the device parameters in the device panel',
          mousePosition: { x: 900, y: 400, action: 'drag', description: 'Adjust device parameters' }
        }
      ]
    })

    // Automation
    this.knowledgeBase.set('automation', {
      answer: "Creating automation in Bitwig Studio:\n\n• **Enable Automation** - Click the automation button on a track or press **A**\n• **Select Parameter** - Choose which parameter to automate from the dropdown\n• **Draw Automation** - Use the pencil tool to draw automation curves\n• **Record Automation** - Enable write mode and move controls while playing\n• **Edit Points** - Click and drag automation points to adjust curves\n\n**Automation Modes:**\n• **Read** - Playback automation data\n• **Write** - Record automation as you move controls\n• **Touch** - Write automation only while touching the control\n• **Latch** - Write automation until you release the control",
      steps: [
        {
          id: '1',
          title: 'Enable Automation',
          description: 'Click the automation button on the track or press A key',
          mousePosition: { x: 400, y: 120, action: 'click', description: 'Click automation button' }
        },
        {
          id: '2',
          title: 'Select Parameter',
          description: 'Choose the parameter you want to automate from the dropdown menu',
          mousePosition: { x: 450, y: 140, action: 'click', description: 'Click parameter selector' }
        },
        {
          id: '3',
          title: 'Draw Automation',
          description: 'Use the pencil tool to draw automation curves in the automation lane',
          mousePosition: { x: 500, y: 300, action: 'drag', description: 'Draw automation curve' }
        },
        {
          id: '4',
          title: 'Edit Points',
          description: 'Click and drag automation points to fine-tune the curve',
          mousePosition: { x: 550, y: 280, action: 'drag', description: 'Drag automation point' }
        }
      ]
    })

    // Arrangement View
    this.knowledgeBase.set('arrangement', {
      answer: "Working in the Arrangement view:\n\n• **Timeline Navigation** - Use the timeline ruler to navigate and zoom\n• **Clip Management** - Drag clips from the browser or record directly\n• **Editing Tools** - Use scissors, glue, and other tools to edit clips\n• **Snap Settings** - Enable/disable snap to grid for precise editing\n• **Track Groups** - Group tracks for easier management\n• **Markers** - Add markers to mark important sections\n\n**Keyboard Shortcuts:**\n• **Space** - Play/Stop\n• **R** - Record\n• **M** - Metronome\n• **S** - Snap to grid\n• **Z** - Zoom to fit\n• **Ctrl/Cmd + Z** - Undo",
      steps: [
        {
          id: '1',
          title: 'Navigate Timeline',
          description: 'Use the timeline ruler to navigate to different parts of your song',
          mousePosition: { x: 200, y: 50, action: 'click', description: 'Click on timeline to navigate' }
        },
        {
          id: '2',
          title: 'Add Clips',
          description: 'Drag clips from the browser or record new clips directly',
          mousePosition: { x: 100, y: 200, action: 'drag', description: 'Drag clip to arrangement' }
        },
        {
          id: '3',
          title: 'Edit Clips',
          description: 'Use editing tools like scissors to cut and arrange clips',
          mousePosition: { x: 300, y: 250, action: 'click', description: 'Click scissors tool' }
        },
        {
          id: '4',
          title: 'Adjust Snap',
          description: 'Toggle snap to grid for precise editing',
          mousePosition: { x: 600, y: 50, action: 'click', description: 'Click snap button' }
        }
      ]
    })

    // Clip Launcher
    this.knowledgeBase.set('clip_launcher', {
      answer: "Using the Clip Launcher for live performance:\n\n• **Session View** - Switch to Session view for clip launching\n• **Create Clips** - Record or create clips in the clip launcher\n• **Launch Clips** - Click clips to launch them\n• **Scene Launching** - Launch entire scenes with one click\n• **Follow Actions** - Set clips to automatically follow each other\n• **Quantization** - Set launch quantization for precise timing\n\n**Performance Tips:**\n• Use different colors for different clip types\n• Set up follow actions for seamless transitions\n• Use scene launching for song sections\n• Practice with quantization settings",
      steps: [
        {
          id: '1',
          title: 'Switch to Session View',
          description: 'Click the Session view button to access the clip launcher',
          mousePosition: { x: 700, y: 50, action: 'click', description: 'Click Session view button' }
        },
        {
          id: '2',
          title: 'Create New Clip',
          description: 'Click an empty clip slot to create a new clip',
          mousePosition: { x: 200, y: 150, action: 'click', description: 'Click empty clip slot' }
        },
        {
          id: '3',
          title: 'Record Clip',
          description: 'Press record and play to record content into the clip',
          mousePosition: { x: 400, y: 50, action: 'click', description: 'Click record button' }
        },
        {
          id: '4',
          title: 'Launch Clip',
          description: 'Click the clip to launch it in the arrangement',
          mousePosition: { x: 200, y: 150, action: 'click', description: 'Click clip to launch' }
        }
      ]
    })

    // Troubleshooting
    this.knowledgeBase.set('troubleshooting', {
      answer: "Common Bitwig Studio issues and solutions:\n\n• **Audio Dropouts** - Increase buffer size in Preferences > Audio\n• **High CPU Usage** - Freeze tracks or use track groups to reduce processing\n• **MIDI Not Working** - Check MIDI device settings in Preferences > MIDI\n• **Crashes** - Update to latest version and check system requirements\n• **Performance Issues** - Close unnecessary applications and optimize system\n\n**System Requirements:**\n• **Windows:** Windows 10/11, 8GB RAM minimum, 16GB recommended\n• **macOS:** macOS 10.15 or later, 8GB RAM minimum\n• **Linux:** Ubuntu 20.04+, 8GB RAM minimum\n\n**Optimization Tips:**\n• Use SSD for project files\n• Disable unnecessary background processes\n• Keep Bitwig updated to latest version",
      steps: [
        {
          id: '1',
          title: 'Open Preferences',
          description: 'Go to File > Preferences to access system settings',
          mousePosition: { x: 50, y: 20, action: 'click', description: 'Click File menu' }
        },
        {
          id: '2',
          title: 'Audio Settings',
          description: 'Navigate to Audio tab and adjust buffer size if experiencing dropouts',
          mousePosition: { x: 100, y: 100, action: 'click', description: 'Click Audio tab' }
        },
        {
          id: '3',
          title: 'MIDI Settings',
          description: 'Check MIDI device connections and settings',
          mousePosition: { x: 150, y: 150, action: 'click', description: 'Click MIDI tab' }
        },
        {
          id: '4',
          title: 'Apply Changes',
          description: 'Click OK to apply your settings changes',
          mousePosition: { x: 400, y: 400, action: 'click', description: 'Click OK button' }
        }
      ]
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
} 