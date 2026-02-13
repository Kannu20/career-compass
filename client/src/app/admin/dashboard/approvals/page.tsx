"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Check, X, Loader2 } from "lucide-react";

type PendingUser = {
  _id: string;
  name: string;
  email: string;
  requestedRole: "mentor" | "tpo";
  createdAt: string;
};

export default function AdminApprovalsPage() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/pending-requests");
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch approvals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id: string) => {
    try {
      setActionId(id);
      await api.post(`/api/admin/approve/${id}`);
      fetchRequests();
    } finally {
      setActionId(null);
    }
  };

  const reject = async (id: string) => {
    try {
      setActionId(id);
      await api.post(`/api/admin/reject/${id}`);
      fetchRequests();
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-gray-400 flex items-center gap-2">
        <Loader2 className="animate-spin" />
        Loading pending approvals...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Pending Approvals
        </h1>
        <p className="text-gray-400">
          Approve or reject mentor & TPO requests
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-gray-400 bg-white/5 border border-white/10 rounded-xl p-6">
          No pending requests 🎉
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/10 text-gray-300">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Requested On</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 capitalize">{u.requestedRole}</td>
                  <td className="p-4 text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => approve(u._id)}
                      disabled={actionId === u._id}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
                      title="Approve"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => reject(u._id)}
                      disabled={actionId === u._id}
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-60"
                      title="Reject"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
