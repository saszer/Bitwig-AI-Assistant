export interface UserProfile {
  favoriteVSTs: string[]
  favoriteDevices: string[]
  favoriteTemplates: string[]
  recentActions: string[]
  vstFolders: string[]
  preferences: {
    theme: 'dark' | 'light'
    showSuggestions: boolean
  }
}

const DEFAULT_PROFILE: UserProfile = {
  favoriteVSTs: [],
  favoriteDevices: [],
  favoriteTemplates: [],
  recentActions: [],
  vstFolders: [
    'C:/Program Files/VSTPlugins',
    'C:/Program Files/Common Files/VST2',
    'C:/Program Files/Common Files/VST3',
    'C:/VSTPlugins'
  ],
  preferences: {
    theme: 'dark',
    showSuggestions: true
  }
}

const STORAGE_KEY = 'bitwig_user_profile'

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) }
    }
  } catch (e) {
    // ignore
  }
  return DEFAULT_PROFILE
}

export function saveUserProfile(profile: UserProfile) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function updateUserProfile(update: Partial<UserProfile>) {
  const current = getUserProfile()
  const newProfile = { ...current, ...update }
  saveUserProfile(newProfile)
}

export function addFavoriteVST(vst: string) {
  const profile = getUserProfile()
  if (!profile.favoriteVSTs.includes(vst)) {
    profile.favoriteVSTs.push(vst)
    saveUserProfile(profile)
  }
}

export function addRecentAction(action: string) {
  const profile = getUserProfile()
  profile.recentActions.unshift(action)
  if (profile.recentActions.length > 50) profile.recentActions = profile.recentActions.slice(0, 50)
  saveUserProfile(profile)
}

export function setVSTFolders(folders: string[]) {
  const profile = getUserProfile()
  profile.vstFolders = folders
  saveUserProfile(profile)
} 