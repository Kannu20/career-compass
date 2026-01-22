// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import { Pencil, Trash2 } from "lucide-react";

// type User = {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   roleStatus: string;
//   provider: string;
//   createdAt: string;
// };

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [editRole, setEditRole] = useState("");
//   const [editStatus, setEditStatus] = useState("");

//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState("");
//   const [search, setSearch] = useState("");

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/api/admin/users", {
//         params: { role, status, search },
//       });
//       setUsers(res.data.data);
//     } catch (err) {
//       console.error("Failed to load users", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [role, status]);

//   const openEdit = (user: User) => {
//     setEditingUser(user);
//     setEditRole(user.role);
//     setEditStatus(user.roleStatus);
//   };

//   const updateUser = async () => {
//     if (!editingUser) return;

//     await api.patch(`/api/admin/users/${editingUser._id}`, {
//       role: editRole,
//       roleStatus: editStatus,
//     });

//     setEditingUser(null);
//     fetchUsers();
//   };

//   const deleteUser = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;

//     await api.delete(`/api/admin/users/${id}`);
//     fetchUsers();
//   };


//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-white">Users</h1>
//         <p className="text-gray-400">
//           View and manage all registered users
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3">
//         <input
//           placeholder="Search name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
//           className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="px-3 py-2 rounded bg-black/40 border border-white/20 text-white"
//         >
//           <option value="">All Roles</option>
//           <option value="student">Student</option>
//           <option value="mentor">Mentor</option>
//           <option value="tpo">TPO</option>
//           <option value="admin">Admin</option>
//         </select>

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="px-3 py-2  rounded bg-black/40 border border-white/20 text-white"
//         >
//           <option value="">All Status</option>
//           <option value="approved">Approved</option>
//           <option value="pending">Pending</option>
//           <option value="rejected">Rejected</option>
//         </select>

//         <button
//           onClick={fetchUsers}
//           className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
//         >
//           Apply
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-black/10 text-black-300">
//             <tr>
//               <th className="p-4 text-left">Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-left">Provider</th>
//               <th className="p-4 text-left">Joined</th>
//               <th className="p-4 text-left">Actions</th>

//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={6} className="p-6 text-center text-gray-400">
//                   Loading users...
//                 </td>
//               </tr>
//             ) : users.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="p-6 text-center text-gray-400">
//                   No users found
//                 </td>
//               </tr>
//             ) : (
//               users.map((u) => (
//                 <tr
//                   key={u._id}
//                   className="border-t border-white/10 hover:bg-white/5"
//                 >
//                   <td className="p-4">{u.name}</td>
//                   <td className="p-4">{u.email}</td>
//                   <td className="p-4 capitalize">{u.role}</td>
//                   <td className="p-4 capitalize">{u.roleStatus}</td>
//                   <td className="p-4">{u.provider}</td>
//                   <td className="p-4 text-gray-400">
//                     {new Date(u.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-4 flex gap-3">
//                     <button
//                       onClick={() => openEdit(u)}
//                       className="p-2 rounded bg-indigo-600/20 hover:bg-indigo-600/40"
//                     >
//                       <Pencil size={16} />
//                     </button>

//                     {u.role !== "admin" && (
//                       <button
//                         onClick={() => deleteUser(u._id)}
//                         className="p-2 rounded bg-red-600/20 hover:bg-red-600/40"
//                         {editingUser && (
//                           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//                             <div className="bg-slate-900 border border-white/20 rounded-xl p-6 w-96 space-y-4">
//                               <h2 className="text-lg font-semibold text-white">
//                                 Edit User
//                               </h2>

//                               <select
//                                 value={editRole}
//                                 onChange={(e) => setEditRole(e.target.value)}
//                                 className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded text-white"
//                               >
//                                 <option value="student">Student</option>
//                                 <option value="mentor">Mentor</option>
//                                 <option value="tpo">TPO</option>
//                                 <option value="admin">Admin</option>
//                               </select>

//                               <select
//                                 value={editStatus}
//                                 onChange={(e) => setEditStatus(e.target.value)}
//                                 className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded text-white"
//                               >
//                                 <option value="approved">Approved</option>
//                                 <option value="pending">Pending</option>
//                                 <option value="rejected">Rejected</option>
//                               </select>

//                               <div className="flex justify-end gap-3">
//                                 <button
//                                   onClick={() => setEditingUser(null)}
//                                   className="px-4 py-2 rounded bg-white/10"
//                                 >
//                                   Cancel
//                                 </button>
//                                 <button
//                                   onClick={updateUser}
//                                   className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
//                                 >
//                                   Save
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     )}
//                   </td>

//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Pencil, Trash2 } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  roleStatus: string;
  provider: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/users", {
        params: { role, status, search },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role, status]);

  const openEdit = (user: User) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditStatus(user.roleStatus);
  };

  const updateUser = async () => {
    if (!editingUser) return;

    await api.patch(`/api/admin/users/${editingUser._id}`, {
      role: editRole,
      roleStatus: editStatus,
    });

    setEditingUser(null);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    await api.delete(`/api/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-400">
          View and manage all registered users
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Search name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
          className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-3 py-2 rounded bg-black/40 border border-white/20 text-white"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="tpo">TPO</option>
          <option value="admin">Admin</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded bg-black/40 border border-white/20 text-white"
        >
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/10">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Provider</th>
              <th className="p-4 text-left">Joined</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 capitalize">{u.role}</td>
                  <td className="p-4 capitalize">{u.roleStatus}</td>
                  <td className="p-4">{u.provider}</td>
                  <td className="p-4 text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => openEdit(u)}
                      className="p-2 rounded bg-indigo-600/20 hover:bg-indigo-600/40"
                    >
                      <Pencil size={16} />
                    </button>

                    {u.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="p-2 rounded bg-red-600/20 hover:bg-red-600/40"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-white/20 rounded-xl p-6 w-96 space-y-4">
            <h2 className="text-lg font-semibold text-white">Edit User</h2>

            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded text-white"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="tpo">TPO</option>
              <option value="admin">Admin</option>
            </select>

            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded text-white"
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
