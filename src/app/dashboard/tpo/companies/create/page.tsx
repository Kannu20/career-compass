"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function AddCompanyPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    type: "",
    domain: "",
    location: "",
    minPackage: "",
    maxPackage: "",
    hrName: "",
    hrEmail: "",
    status: "Active",
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "tpo")) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 🔥 API CALL LATER
    console.log("Add Company:", form);

    router.push("/dashboard/tpo/companies");
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add New Company 🏢
        </h1>
        <p className="text-slate-400">
          Register a company for future placement drives
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 border border-slate-700 rounded-xl p-6"
      >

        {/* COMPANY NAME */}
        <Input label="Company Name" name="name" value={form.name} onChange={handleChange} />

        {/* TYPE */}
        <Select
          label="Company Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          options={["Service", "Product", "Startup"]}
        />

        {/* DOMAIN */}
        <Input label="Industry / Domain" name="domain" value={form.domain} onChange={handleChange} />

        {/* LOCATION */}
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />

        {/* PACKAGE RANGE */}
        <Input label="Min Package (LPA)" name="minPackage" type="number" value={form.minPackage} onChange={handleChange} />
        <Input label="Max Package (LPA)" name="maxPackage" type="number" value={form.maxPackage} onChange={handleChange} />

        {/* HR DETAILS */}
        <Input label="HR Name" name="hrName" value={form.hrName} onChange={handleChange} />
        <Input label="HR Email" name="hrEmail" type="email" value={form.hrEmail} onChange={handleChange} />

        {/* STATUS */}
        <Select
          label="Company Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Inactive"]}
        />

        {/* ACTIONS */}
        <div className="col-span-full flex gap-4 mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Save size={16} />
            Save Company
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/tpo/companies")}
            className="px-6 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- REUSABLE INPUTS ---------------- */

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1 text-slate-300">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="block text-sm mb-1 text-slate-300">
        {label}
      </label>
      <select
        {...props}
        required
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
      >
        <option value="">Select</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
