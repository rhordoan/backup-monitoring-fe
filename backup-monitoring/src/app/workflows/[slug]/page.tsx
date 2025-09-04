"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Pause,
  Play,
  Eye,
  Server,
  Calendar,
} from "lucide-react";

// Reuse the same dataset shape you have on the list page
const workflows = [
  {
    title: "Daily SQL Server Backup",
    status: "Running",
    type: "Database Backup",
    cluster: "Production-East-01",
    successRate: "98.7%",
    schedule: "Daily at 2:00 AM",
    lastRun: "2 min ago",
    duration: "2h 15m",
  },
  {
    title: "File Server Incremental Sync",
    status: "Success",
    type: "File Backup",
    cluster: "Production-West-02",
    successRate: "99.2%",
    schedule: "Every 4 hours",
    lastRun: "1h 23m ago",
    duration: "45m",
  },
  {
    title: "VM Infrastructure Snapshot",
    status: "Failed",
    type: "VM Backup",
    cluster: "Production-East-01",
    successRate: "94.5%",
    schedule: "Daily at 11:00 PM",
    lastRun: "3h 12m ago",
    duration: "Failed at 1h 23m",
  },
  {
    title: "Exchange Email Archive",
    status: "Scheduled",
    type: "Email Backup",
    cluster: "DR-Central-01",
    successRate: "97.8%",
    schedule: "Weekly on Sunday",
    lastRun: "Yesterday",
    duration: "3h 45m",
  },
  {
    title: "Development Code Repository",
    status: "Success",
    type: "Code Backup",
    cluster: "Dev-Test-03",
    successRate: "99.9%",
    schedule: "Every 2 hours",
    lastRun: "45 min ago",
    duration: "12m",
  },
];

const statusConfig = {
  Running: {
    icon: Clock,
    pillColor: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  },
  Success: {
    icon: CheckCircle2,
    pillColor: "bg-green-500/10 text-green-600 ring-green-500/20",
  },
  Failed: {
    icon: AlertTriangle,
    pillColor: "bg-red-500/10 text-red-600 ring-red-500/20",
  },
  Scheduled: {
    icon: PlayCircle,
    pillColor: "bg-gray-500/10 text-gray-600 ring-gray-500/20",
  },
};

// Simple slugify to match list item by title
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { y: 14, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

// Fake recent runs and steps for the details view
const buildRecentRuns = (status: string) => {
  const base = [
    { id: 1, time: "Today, 02:00 AM", status: "Success", duration: "2h 12m" },
    { id: 2, time: "Yesterday, 02:00 AM", status: "Success", duration: "2h 05m" },
    { id: 3, time: "2 days ago, 02:00 AM", status: "Failed", duration: "1h 23m" },
  ];
  if (status === "Running") {
    base.unshift({ id: 0, time: "In progress", status: "Running", duration: "1h 07m" });
  }
  return base.slice(0, 4);
};

const stepIconFor = (s: string) => {
  if (s === "Success") return <CheckCircle2 size={16} className="text-green-600" />;
  if (s === "Running") return <Clock size={16} className="text-blue-600" />;
  if (s === "Failed") return <AlertTriangle size={16} className="text-red-600" />;
  return <Clock size={16} className="text-gray-500" />;
};

export default function WorkflowDetailsPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const current = workflows.find((w) => slugify(w.title) === params.slug);

  if (!current) {
    return (
      <div className="p-8 bg-gray-50 min-h-full">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.push("/workflows")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Workflows
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-8 text-center">
            <p className="text-gray-800 font-semibold mb-2">Workflow not found</p>
            <p className="text-gray-500">The workflow you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[current.status as keyof typeof statusConfig].icon;
  const pillColor = statusConfig[current.status as keyof typeof statusConfig].pillColor;

  const recentRuns = buildRecentRuns(current.status);
  const steps = [
    { name: "Pre-checks", status: "Success" },
    { name: "Snapshot", status: current.status === "Running" ? "Running" : "Success" },
    { name: "Transfer", status: current.status === "Failed" ? "Failed" : "Success" },
    { name: "Verification", status: current.status === "Success" ? "Success" : "Pending" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <button
            onClick={() => router.push("/workflows")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Workflows
          </button>

          <div className="flex items-center gap-2">
            {current.status === "Running" ? (
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <Pause size={16} />
                Pause
              </button>
            ) : (
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                <Play size={16} />
                Run Now
              </button>
            )}
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <Eye size={16} />
              View Logs
            </button>
            <button className="bg-[#13275c] text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-colors">
              Edit Workflow
            </button>
          </div>
        </motion.div>

        {/* Header Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6 mb-8"
        >
          <motion.div variants={itemVariants} className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{current.title}</h1>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${pillColor}`}
                >
                  <StatusIcon size={14} />
                  {current.status}
                </span>
                <span className="text-sm text-gray-500">in {current.cluster}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6"
          >
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Type</p>
              <p className="text-sm font-semibold text-gray-800">{current.type}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Cluster</p>
              <div className="flex items-center gap-2">
                <Server size={14} className="text-gray-500" />
                <p className="text-sm font-semibold text-gray-800">{current.cluster}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Schedule</p>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-500" />
                <p className="text-sm font-semibold text-gray-800">{current.schedule}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Success Rate</p>
              <p className="text-sm font-semibold text-gray-800">{current.successRate}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Last Run</p>
              <p className="text-sm font-semibold text-gray-800">{current.lastRun}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-semibold text-gray-800">{current.duration}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left: Recent Runs */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm p-6"
          >
            <div className="flex items-center mb-4">
              <Clock className="text-blue-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Recent Runs</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentRuns.map((r) => (
                <div key={r.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {r.status === "Success" && (
                      <CheckCircle2 size={18} className="text-green-600" />
                    )}
                    {r.status === "Failed" && (
                      <AlertTriangle size={18} className="text-red-600" />
                    )}
                    {r.status === "Running" && (
                      <Clock size={18} className="text-blue-600" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{r.time}</p>
                      <p className="text-xs text-gray-500">{r.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-700">{r.duration}</p>
                    <button className="px-2 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
                      View Log
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Steps and Configuration */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6"
            >
              <div className="flex items-center mb-4">
                <PlayCircle className="text-indigo-500 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Workflow Steps</h2>
              </div>
              <div className="space-y-3">
                {steps.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 p-3 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {stepIconFor(s.status)}
                      <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                    </div>
                    <span className="text-xs text-gray-500">{s.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuration</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="text-sm font-semibold text-gray-800">Object Storage (S3-compatible)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500">Retention Policy</p>
                  <p className="text-sm font-semibold text-gray-800">
                    30 daily, 12 monthly, 7 yearly
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500">Encryption</p>
                  <p className="text-sm font-semibold text-gray-800">AES-256, KMS-managed</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500">Exclusions</p>
                  <p className="text-sm font-semibold text-gray-800">Temp files, node_modules</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}