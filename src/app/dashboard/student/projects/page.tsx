"use client";

import { motion } from "framer-motion";
import { FolderKanban, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce app with authentication, cart, and admin dashboard.",
    tech: ["Next.js", "Node.js", "MongoDB"],
    status: "Completed",
  },
  {
    title: "Career Readiness Tracker",
    description:
      "Student skill tracking system with role-based dashboards.",
    tech: ["React", "Tailwind", "Chart.js"],
    status: "In Progress",
  },
  {
    title: "AI Resume Analyzer",
    description:
      "AI-based resume scoring tool with skill gap analysis.",
    tech: ["Python", "NLP", "FastAPI"],
    status: "Planned",
  },
];

export default function StudentProjectsPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-gray-400 mt-1">
          Showcase what you’ve built. Quality beats quantity.
        </p>
      </motion.div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-indigo-500/40 transition"
          >
            {/* TITLE */}
            <div className="flex items-start justify-between">
              <div className="flex gap-2 items-center">
                <FolderKanban size={18} className="text-indigo-400" />
                <h2 className="font-medium">{project.title}</h2>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full
                ${
                  project.status === "Completed"
                    ? "bg-green-500/15 text-green-400"
                    : project.status === "In Progress"
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "bg-gray-500/15 text-gray-400"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              {project.description}
            </p>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-5">
              <button className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 transition">
                <ExternalLink size={14} />
                Live
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300 transition">
                <Github size={14} />
                Code
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
