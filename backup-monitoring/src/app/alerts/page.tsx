"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  History as HistoryIcon,
} from "lucide-react";

// --- your alert data
const alerts = [
  {
    id: 1,
    title: "High CPU Usage on Production-East-01",
    status: "Warning",
    category: "Performance",
    source: "Production-East-01 / Node-03",
    time: "2 min ago",
    description: "CPU utilization has exceeded 85% for the past 15 minutes",
    acknowledged: false,
  },
  {
    id: 2,
    title: "Backup Job Failed",
    status: "Critical",
    category: "Backup",
    source: "Exchange Database Backup",
    time: "15 min ago",
    description: "Exchange backup failed due to insufficient storage space",
    acknowledged: false,
  },
  {
    id: 3,
    title: "Storage Capacity Warning",
    status: "Warning",
    category: "Storage",
    source: "DR-Central-01",
    time: "1h ago",
    description: "Storage utilization is at 92% capacity",
    acknowledged: true,
  },
];

// --- styling config by status
const statusConfig = {
  Critical: {
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    pillColor: "bg-red-100 text-red-700",
  },
  Warning: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    pillColor: "bg-yellow-100 text-yellow-700",
  },
  Acknowledged: {
    icon: CheckCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    pillColor: "bg-blue-100 text-blue-700",
  },
};

// --- framer‐motion variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

// --- single alert card
const AlertItem = ({ alert }: { alert: typeof alerts[0] }) => {
  const key = alert.acknowledged ? "Acknowledged" : alert.status as "Critical" | "Warning";
  const cfg = statusConfig[key];

  return (
    <motion.div
      variants={itemVariants}
      className={`rounded-xl border ${cfg.borderColor} ${cfg.bgColor} p-5`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <cfg.icon className={`w-6 h-6 flex-shrink-0 ${cfg.color} mt-1`} />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-gray-800">{alert.title}</h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.pillColor}`}
              >
                {alert.acknowledged ? "Acknowledged" : alert.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-4">
              <span>{alert.category}</span>
              <span>Source: {alert.source}</span>
              <span>Time: {alert.time}</span>
            </div>
            <p className="text-gray-700 mt-2">{alert.description}</p>
          </div>
        </div>
        {!alert.acknowledged && (
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
            <CheckCircle size={14} />
            <span>Acknowledge</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function AlertsPage() {
  // full list in state
  const [alertList] = useState(alerts);
  // which tab
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  // split them out
  const activeAlerts = alertList.filter((a) => !a.acknowledged);
  const historyAlerts = alertList.filter((a) => a.acknowledged);

  // summary cards
  const summaryCards = [
    {
      title: "Critical",
      value: activeAlerts.filter((a) => a.status === "Critical").length,
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      title: "Warning",
      value: activeAlerts.filter((a) => a.status === "Warning").length,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      title: "Acknowledged",
      value: historyAlerts.length,
      icon: CheckCircle,
      color: "text-blue-500",
    },
    {
      title: "Avg Resolution",
      value: "45m",
      icon: Clock,
      color: "text-green-500",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-500 mt-1">
            Monitor system alerts and incident history
          </p>
        </div>
        <div className="flex gap-2">
          <button className="font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors">
            Configure
          </button>
          <button className="bg-[#13275c] text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-colors">
            Alert Rules
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {summaryCards.map((c, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-4"
          >
            <div className="p-2 rounded-full bg-gray-100">
              <c.icon className={`w-6 h-6 ${c.color}`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{c.value}</p>
              <p className="text-sm text-gray-500">{c.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="relative bg-violet-50 p-2 rounded-xl border border-violet-100 shadow-sm mb-6 overflow-visible">
        {/* white pill indicator */}
        <motion.div
          layoutId="tab-indicator-alerts"
          className="absolute inset-1 bg-white rounded-lg shadow-sm"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <div className="relative flex">
          <button
            onClick={() => setActiveTab("active")}
            className={`z-10 w-1/2 px-6 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "active"
                ? "text-violet-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Zap size={16} /> Active Alerts ({activeAlerts.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`z-10 w-1/2 px-6 py-2 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              activeTab === "history"
                ? "text-violet-800"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <HistoryIcon size={16} /> Alert History ({historyAlerts.length})
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === "active" ? (
          <motion.div
            key="active-alerts"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {activeAlerts.map((a) => (
              <AlertItem key={a.id} alert={a} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="history-alerts"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {historyAlerts.length > 0 ? (
              historyAlerts.map((a) => <AlertItem key={a.id} alert={a} />)
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No alert history available.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}