"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);

  const saveSettings = () => {
    // 🔥 Future: send to backend
    console.log({
      maintenance,
      registrationOpen,
    });

    alert("Settings saved (demo)");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-gray-400 mb-6">
        Manage platform level configurations
      </p>

      <div className="max-w-xl space-y-6">

        {/* Maintenance Mode */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-5">
          <h2 className="font-semibold mb-2">Maintenance Mode</h2>
          <p className="text-sm text-gray-400 mb-3">
            Temporarily disable access for non-admin users
          </p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={maintenance}
              onChange={() => setMaintenance(!maintenance)}
              className="accent-indigo-600"
            />
            Enable maintenance mode
          </label>
        </div>

        {/* Registration Toggle */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-5">
          <h2 className="font-semibold mb-2">User Registration</h2>
          <p className="text-sm text-gray-400 mb-3">
            Control whether new users can register
          </p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={registrationOpen}
              onChange={() => setRegistrationOpen(!registrationOpen)}
              className="accent-indigo-600"
            />
            Allow new registrations
          </label>
        </div>

        {/* Save */}
        <button
          onClick={saveSettings}
          className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-medium"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
