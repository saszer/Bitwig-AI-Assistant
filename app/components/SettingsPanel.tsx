"use client"

import React, { useState, useEffect } from "react";
import { getUserProfile, saveUserProfile, setVSTFolders, UserProfile } from "../lib/user-profile";
import { CheckCircle, AlertCircle, Folder, X } from "lucide-react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bitwigStatus: "connected" | "disconnected" | "checking";
}

export default function SettingsPanel({ isOpen, onClose, bitwigStatus }: SettingsPanelProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vstFolders, setFolders] = useState<string[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    const p = getUserProfile();
    setProfile(p);
    setFolders(p.vstFolders);
    setTheme(p.preferences.theme);
    setShowSuggestions(p.preferences.showSuggestions);
  }, [isOpen]);

  const handleVSTFolderChange = (idx: number, value: string) => {
    const updated = [...vstFolders];
    updated[idx] = value;
    setFolders(updated);
  };

  const handleAddVSTFolder = () => {
    setFolders([...vstFolders, ""]);
  };

  const handleRemoveVSTFolder = (idx: number) => {
    setFolders(vstFolders.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    if (!profile) return;
    const updated: UserProfile = {
      ...profile,
      vstFolders,
      preferences: {
        ...profile.preferences,
        theme,
        showSuggestions,
      },
    };
    saveUserProfile(updated);
    setProfile(updated);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bitwig-card w-full max-w-lg relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-white">Settings</h2>
        <div className="mb-4 flex items-center space-x-2">
          <span className="text-gray-300">Bitwig Status:</span>
          {bitwigStatus === "connected" ? (
            <span className="flex items-center text-green-400"><CheckCircle size={16} className="mr-1" /> Connected</span>
          ) : bitwigStatus === "disconnected" ? (
            <span className="flex items-center text-red-400"><AlertCircle size={16} className="mr-1" /> Disconnected</span>
          ) : (
            <span className="flex items-center text-blue-400"><span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mr-1" /> Checking...</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">VST Folders</label>
          {vstFolders.map((folder, idx) => (
            <div key={idx} className="flex items-center mb-2">
              <input
                type="text"
                value={folder}
                onChange={e => handleVSTFolderChange(idx, e.target.value)}
                className="bitwig-input flex-1 mr-2"
              />
              <button
                type="button"
                className="text-red-400 hover:text-red-600"
                onClick={() => handleRemoveVSTFolder(idx)}
                title="Remove folder"
              >
                <Folder size={16} />
                <span className="ml-1">Remove</span>
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bitwig-button mt-2"
            onClick={handleAddVSTFolder}
          >
            + Add Folder
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Theme</label>
          <select
            className="bitwig-input"
            value={theme}
            onChange={e => setTheme(e.target.value as "dark" | "light")}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-1">Show VST/Device Suggestions</label>
          <input
            type="checkbox"
            checked={showSuggestions}
            onChange={e => setShowSuggestions(e.target.checked)}
            className="mr-2"
          />
          <span className="text-gray-400">Enable subtle suggestions for VSTs and devices</span>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="bitwig-button bg-gray-600 hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bitwig-button"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 