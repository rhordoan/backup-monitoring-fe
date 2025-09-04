"use client";
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Plus, Search, Server, HardDrive, Eye } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 100 } 
  },
};

const ClusterCard = ({ cluster }: any) => {
  const statusPill = {
    Healthy: 'bg-green-100 text-green-700',
    Warning: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{cluster.name}</h3>
            <p className="text-sm text-gray-500">{cluster.location}</p>
          </div>
          <div
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              statusPill[cluster.status as keyof typeof statusPill]
            }`}
          >
            {cluster.status}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 space-x-6 mb-5">
          <div className="flex items-center gap-2">
            <Server size={16} />
            <span>{cluster.nodes} Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive size={16} />
            <span>{cluster.capacity} TB</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Storage Used</span>
            <span>{cluster.storageUsed}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div
              className="bg-indigo-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${cluster.storageUsed}%` }}
              transition={{ type: 'spring', stiffness: 50, duration: 1 }}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">{cluster.activeJobs} active jobs</p>
          </div>
          <div>
            <p>
              Last backup: <span className="font-medium">{cluster.lastBackup}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200/80 mt-auto p-4">
        <a
          href={`/clusters/${cluster.id}`}
          className="flex items-center justify-center gap-2 w-full text-indigo-600 font-semibold bg-indigo-50 hover:bg-indigo-100 rounded-lg py-2 transition-colors"
        >
          View Details <Eye size={16} />
        </a>
      </div>
    </motion.div>
  );
};

export default function ClustersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const clusters = [
    {
      id: 'production-east-01',
      name: 'Production-East-01',
      location: 'US East',
      status: 'Healthy',
      nodes: 4,
      capacity: 247,
      storageUsed: 85,
      activeJobs: 45,
      lastBackup: '2 min ago',
    },
    {
      id: 'production-west-02',
      name: 'Production-West-02',
      location: 'US West',
      status: 'Healthy',
      nodes: 6,
      capacity: 382,
      storageUsed: 72,
      activeJobs: 38,
      lastBackup: '5 min ago',
    },
    {
      id: 'dr-central-01',
      name: 'DR-Central-01',
      location: 'Central',
      status: 'Warning',
      nodes: 3,
      capacity: 156,
      storageUsed: 45,
      activeJobs: 23,
      lastBackup: '12 min ago',
    },
    {
      id: 'dev-test-03',
      name: 'Dev-Test-03',
      location: 'Development',
      status: 'Healthy',
      nodes: 2,
      capacity: 98,
      storageUsed: 34,
      activeJobs: 12,
      lastBackup: '8 min ago',
    },
  ];

  // filter by name or location
  const filteredClusters = clusters.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clusters</h1>
            <p className="text-gray-500 mt-1">
              Manage and monitor your backup infrastructure clusters
            </p>
          </div>
          <button className="bg-[#13275c] text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-opacity-90 transition-colors">
            <Plus size={18} />
            Add Cluster
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clusters by name or location..."
            className="
              w-full pl-10 pr-4 py-2.5
              bg-white border border-gray-300 rounded-lg
              text-gray-900 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              transition-shadow
            "
          />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredClusters.map((cluster) => (
          <ClusterCard key={cluster.id} cluster={cluster} />
        ))}
      </motion.div>
    </div>
  );
}