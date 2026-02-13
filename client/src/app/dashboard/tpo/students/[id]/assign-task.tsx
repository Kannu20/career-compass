"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AssignTask() {
  const [taskType, setTaskType] = useState("DSA");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleAssign = () => {
    if (!dueDate || !notes.trim()) {
      alert("Please fill all required fields");
      return;
    }

    // TEMP: backend integration later
    console.log({
      taskType,
      priority,
      dueDate,
      notes,
    });

    alert("Task assigned successfully");
    setNotes("");
    setDueDate("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-white/10 rounded-xl bg-white/5 p-6 space-y-5"
    >
      <h2 className="font-medium">Assign Task</h2>

      {/* TASK TYPE */}
      <div>
        <label className="text-xs text-gray-400">Task Type</label>
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm"
        >
          <option>DSA</option>
          <option>Core CS</option>
          <option>Projects</option>
          <option>Resume</option>
        </select>
      </div>

      {/* PRIORITY */}
      <div>
        <label className="text-xs text-gray-400">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* DUE DATE */}
      <div>
        <label className="text-xs text-gray-400">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* NOTES */}
      <div>
        <label className="text-xs text-gray-400">
          Instructions / Notes
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Solve 10 array problems on LeetCode"
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm resize-none"
        />
      </div>

      {/* ACTION */}
      <button
        onClick={handleAssign}
        className="bg-indigo-600 hover:bg-indigo-500 transition rounded-md px-4 py-2 text-sm"
      >
        Assign Task
      </button>
    </motion.div>
  );
}
