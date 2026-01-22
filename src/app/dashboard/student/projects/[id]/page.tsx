"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const PROJECTS: Record<string, any> = {
  ecommerce: {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with authentication, product management, cart, and admin dashboard.",
    overview:
      "This project focuses on building a scalable and secure shopping platform using modern web technologies.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    features: [
      "User authentication & authorization",
      "Admin product dashboard",
      "Cart & checkout flow",
      "Payment gateway integration",
    ],
    status: "Completed",
  },
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = PROJECTS[id as string];

  if (!project) {
    return (
      <div className="text-gray-400">
        Project not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* BACK */}
      <Link
        href="/dashboard/student/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="text-gray-400">{project.description}</p>
      </motion.div>

      {/* STATUS */}
      <div className="flex gap-3 items-center">
        <span
          className={`text-xs px-3 py-1 rounded-full
          ${
            project.status === "Completed"
              ? "bg-green-500/15 text-green-400"
              : "bg-yellow-500/15 text-yellow-400"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* OVERVIEW */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <h2 className="text-lg font-medium">Overview</h2>
        <p className="text-gray-400 leading-relaxed">
          {project.overview}
        </p>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="space-y-2"
      >
        <h2 className="text-lg font-medium">Key Features</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          {project.features.map((feature: string) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </motion.section>

      {/* TECH STACK */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h2 className="text-lg font-medium">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech: string) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-md bg-white/10 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* ACTIONS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="flex gap-4 pt-4"
      >
        <button className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition">
          <ExternalLink size={16} />
          Live Demo
        </button>
        <button className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition">
          <Github size={16} />
          Source Code
        </button>
      </motion.div>
    </div>
  );
}
