# Bitwig AI Assistant

An intelligent AI assistant that can **directly control Bitwig Studio** and provide step-by-step guidance, technical recommendations, and visual mouse overlays to help you master Bitwig Studio.

## 🚀 Key Features

### 🤖 **Direct Bitwig Control**
- **Real-time Control**: Actually performs actions in Bitwig Studio
- **Keyboard Shortcuts**: Sends keyboard commands directly to Bitwig
- **Mouse Control**: Clicks and drags in the Bitwig interface
- **Window Management**: Focuses and controls Bitwig Studio windows
- **Process Detection**: Automatically detects when Bitwig is running

### 📋 **Step-by-Step Guides**
- **Interactive Tutorials**: Follow along with detailed step-by-step instructions
- **Progress Tracking**: Visual progress indicators for multi-step processes
- **Navigation Controls**: Easy navigation between steps with play/pause functionality
- **Visual Feedback**: Clear visual indicators for each step

### 🖱️ **Mouse Overlay System**
- **Visual Guidance**: Animated mouse cursors show exactly where to click
- **Action Types**: Different colors and icons for click, drag, hover, and double-click actions
- **Playback Controls**: Play, pause, and reset mouse action sequences
- **Real-time Feedback**: Live descriptions of each action being performed

### 🎵 **Bitwig-Specific Knowledge**
- **Recording Techniques**: Audio and MIDI recording workflows
- **Mixing & Effects**: Professional mixing techniques and device usage
- **Arrangement & Editing**: Timeline editing and clip management
- **Automation**: Parameter automation and modulation
- **Clip Launcher**: Live performance and session view techniques
- **Troubleshooting**: Common issues and solutions

## 🎯 **What You Can Do**

### **Direct Actions in Bitwig Studio:**
- ✅ Create new projects
- ✅ Start/stop recording
- ✅ Add effects and devices
- ✅ Adjust track volumes
- ✅ Enable automation
- ✅ Toggle metronome
- ✅ Play/stop playback
- ✅ Save/open projects
- ✅ Undo/redo actions
- ✅ Export audio

### **Example Commands:**
- "Create a new project" → **Actually creates a new project in Bitwig**
- "Start recording" → **Arms tracks and starts recording**
- "Add EQ to this track" → **Opens device browser and adds EQ+**
- "Set track volume to -6dB" → **Adjusts the track fader**
- "Enable automation" → **Toggles automation mode**
- "Save the project" → **Saves the current project**

## 🛠️ Installation

### Prerequisites
- **Windows 10/11** (System integration currently supports Windows)
- **Node.js 18+** 
- **Bitwig Studio** (any version)
- **npm or yarn** package manager

### Quick Setup

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd bitwig-ai-assistant
   ```

2. **Run the installer** (Windows)
   ```bash
   install.bat
   ```
   
   Or manually install:
   ```bash
   npm install
   ```

3. **Start Bitwig Studio**
   - Make sure Bitwig Studio is running
   - The assistant will automatically detect it

4. **Launch the assistant**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### **Basic Interaction**
1. **Ask Questions**: Type your Bitwig-related questions in the chat input
2. **Voice Input**: Click the microphone icon to use voice recognition
3. **Execute Actions**: Click "Execute in Bitwig" to perform actions directly
4. **Follow Steps**: When step-by-step guides are available, use the side panel
5. **Watch Overlays**: Enable mouse overlays to see visual guidance

### **Connection Status**
- **🟢 Connected**: Bitwig Studio is running and ready for control
- **🔴 Disconnected**: Bitwig Studio is not running
- **🔄 Checking**: Verifying connection status

### **Example Workflows**

#### **Creating a New Project:**
1. Ask: "Create a new project"
2. Click "Execute in Bitwig"
3. Watch as the assistant presses Ctrl+N in Bitwig Studio

#### **Setting Up Recording:**
1. Ask: "How do I record audio?"
2. Get step-by-step instructions
3. Click "Execute in Bitwig" to arm tracks and start recording

#### **Adding Effects:**
1. Ask: "Add EQ to my track"
2. Click "Execute in Bitwig"
3. Watch as the assistant opens the device browser and adds EQ+

## 🔧 Technical Details

### **System Integration**
- **Windows API**: Uses Windows system calls for mouse and keyboard control
- **Process Detection**: Monitors for Bitwig Studio process
- **Window Management**: Focuses and controls Bitwig windows
- **Real-time Control**: Direct communication with Bitwig Studio

### **Technology Stack**
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **System Control**: Custom Windows API integration
- **AI Processing**: Custom knowledge engine with comprehensive Bitwig expertise

### **Supported Actions**
- **Mouse**: Click, drag, hover, double-click
- **Keyboard**: All standard shortcuts (Ctrl+N, R, Space, etc.)
- **Windows**: Focus, minimize, maximize
- **Process**: Detection, monitoring, control

## 📁 Project Structure

```
bitwig-ai-assistant/
├── app/
│   ├── components/
│   │   ├── BitwigAssistant.tsx    # Main assistant component
│   │   ├── ChatMessage.tsx        # Individual message display
│   │   ├── StepByStepGuide.tsx    # Step-by-step tutorial panel
│   │   └── MouseOverlay.tsx       # Mouse cursor overlay system
│   ├── lib/
│   │   ├── bitwig-knowledge.ts    # AI knowledge engine
│   │   ├── bitwig-controller.ts   # Bitwig control interface
│   │   └── system-integration.ts  # Windows system integration
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── install.bat                    # Windows installer
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🔒 Security & Permissions

### **Required Permissions**
- **System Access**: The assistant needs permission to control your system
- **Bitwig Integration**: Direct control of Bitwig Studio windows
- **Keyboard/Mouse**: Ability to send input to Bitwig Studio

### **Safety Features**
- **Process Verification**: Only controls verified Bitwig Studio processes
- **Window Focus**: Ensures actions are sent to the correct application
- **Error Handling**: Graceful failure if Bitwig is not available

## 🚧 Limitations

### **Current Limitations**
- **Windows Only**: System integration currently supports Windows only
- **Bitwig Required**: Bitwig Studio must be running for control features
- **UI Coordinates**: Some actions require specific UI element coordinates
- **Version Compatibility**: May need updates for new Bitwig versions

### **Future Enhancements**
- [ ] macOS and Linux support
- [ ] Advanced UI element detection
- [ ] Plugin-specific controls
- [ ] MIDI device integration
- [ ] Audio analysis and feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This tool provides direct control of Bitwig Studio. Use responsibly and ensure you have backups of your projects. The developers are not responsible for any data loss or system issues.

## 🆘 Support

If you encounter any issues:
1. Check that Bitwig Studio is running
2. Verify Windows permissions
3. Check the troubleshooting section in the app
4. Open an issue on GitHub

---

**Note**: This is an educational tool designed to help users learn and control Bitwig Studio. It's not affiliated with Bitwig Studio GmbH. 