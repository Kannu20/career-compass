"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Loader2, CheckCircle, Clock, XCircle } from "lucide-react";

type Role = "mentor" | "tpo" | "";

export default function RequestRolePage() {
  const [requestedRole, setRequestedRole] = useState<Role>("");
  const [status, setStatus] = useState<
    "idle" | "pending" | "approved" | "rejected"
  >("idle");

  const [form, setForm] = useState({
    expertise: "",
    experience: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Load current user role status
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await api.get("/api/user/me");
        const data = res.data?.data;

        if (data?.roleStatus === "pending") {
          setStatus("pending");
        } else if (data?.roleStatus === "approved" && data.role !== "student") {
          setStatus("approved");
        } else if (data?.roleStatus === "rejected") {
          setStatus("rejected");
        }
      } catch {
        // silent fail
      }
    };

    loadStatus();
  }, []);

  const handleSubmit = async () => {
    if (!requestedRole || !form.expertise || !form.experience) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await api.post("/api/user/request-role", {
        requestedRole,
        expertise: form.expertise,
        experience: form.experience,
        linkedin: form.linkedin,
      });

      setStatus("pending");
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===================== UI STATES ===================== */

  if (status === "pending") {
    return <StatusCard icon="pending" title="Request Pending" />;
  }

  if (status === "approved") {
    return (
      <StatusCard
        icon="approved"
        title="Request Approved"
        subtitle="Please logout and login again to continue."
      />
    );
  }

  if (status === "rejected") {
    return (
      <StatusCard
        icon="rejected"
        title="Request Rejected"
        subtitle="You can reapply after improving your profile."
      />
    );
  }

  /* ===================== REQUEST FORM ===================== */

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Request Role Upgrade</h1>
        <p className="text-sm text-gray-400">
          Apply for Mentor or TPO access. Approval required.
        </p>
      </div>

      {message && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {message}
        </div>
      )}

      {/* ROLE SELECT */}
      <div>
        <label className="text-sm text-gray-400">Requested Role</label>
        <select
          value={requestedRole}
          onChange={(e) =>
            setRequestedRole(e.target.value as Role)
          }
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2"
        >
          <option value="">Select role</option>
          <option value="mentor">Mentor</option>
          <option value="tpo">TPO</option>
        </select>
      </div>

      {/* EXPERTISE */}
      <div>
        <label className="text-sm text-gray-400">Expertise</label>
        <input
          value={form.expertise}
          onChange={(e) =>
            setForm({ ...form, expertise: e.target.value })
          }
          placeholder="DSA, Web, Core CS..."
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2"
        />
      </div>

      {/* EXPERIENCE */}
      <div>
        <label className="text-sm text-gray-400">
          Experience (years)
        </label>
        <select
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2"
        >
          <option value="">Select</option>
          <option value="0-1">0–1</option>
          <option value="1-3">1–3</option>
          <option value="3-5">3–5</option>
          <option value="5+">5+</option>
        </select>
      </div>

      {/* LINKEDIN */}
      <div>
        <label className="text-sm text-gray-400">
          LinkedIn / Portfolio (optional)
        </label>
        <input
          value={form.linkedin}
          onChange={(e) =>
            setForm({ ...form, linkedin: e.target.value })
          }
          placeholder="https://linkedin.com/in/..."
          className="w-full mt-1 bg-black/40 border border-white/10 rounded-md px-3 py-2"
        />
      </div>

      {/* ACTION */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit Request
      </button>
    </div>
  );
}

/* ===================== STATUS CARD ===================== */

function StatusCard({
  icon,
  title,
  subtitle,
}: {
  icon: "pending" | "approved" | "rejected";
  title: string;
  subtitle?: string;
}) {
  const Icon =
    icon === "pending"
      ? Clock
      : icon === "approved"
      ? CheckCircle
      : XCircle;

  const color =
    icon === "pending"
      ? "text-yellow-400"
      : icon === "approved"
      ? "text-green-400"
      : "text-red-400";

  return (
    <div className="max-w-md border border-white/10 rounded-xl bg-white/5 p-6 text-center space-y-3">
      <Icon className={`mx-auto h-10 w-10 ${color}`} />
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle && (
        <p className="text-sm text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}
