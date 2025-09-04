"use client";
import React, { useState, useEffect, useRef } from 'react';
// import Link from 'next/link'; // Removed to fix compilation error
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
    ArrowLeft, HardDrive, Cpu, MemoryStick, Server, Zap, CheckCircle, Settings, 
    Monitor, Database, CheckCircle2, Loader, AlertTriangle, HeartPulse, ListChecks 
} from 'lucide-react';

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const headerVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, duration: 0.5 } },
}

// Components
const StatCard = ({ icon: Icon, title, value }: any) => (
    <motion.div 
        variants={itemVariants} 
        whileHover={{ y: -5, scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
        className="bg-white/50 backdrop-blur-lg p-5 rounded-xl border border-white/20 shadow-md flex items-center gap-4 cursor-pointer transition-shadow duration-300"
    >
        <div className="bg-white/50 p-3 rounded-full">
            <Icon className="w-7 h-7 text-indigo-600" />
        </div>
        <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </motion.div>
);

const NodeInfoCard = ({ node }: any) => {
    const statusPill = {
        Healthy: 'bg-green-100 text-green-800 border-green-200',
        Warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return (
        <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="bg-white/60 backdrop-blur-md p-5 rounded-xl border border-white/30 shadow-sm flex items-center justify-between hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center gap-4">
                 <motion.span 
                    animate={{ scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                    className={`w-2.5 h-2.5 rounded-full ${node.status === 'Healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}
                ></motion.span>
                <div>
                    <p className="font-bold text-gray-800">{node.name}</p>
                    <p className="text-sm text-gray-500">{node.type}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Cpu size={14}/>
                        <span>{node.cpu}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                    <MemoryStick size={16}/>
                    <span>{node.ram}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <HardDrive size={16}/>
                    <span>{node.storage}</span>
                </div>
            </div>
             <div className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusPill[node.status as keyof typeof statusPill]}`}>
                {node.status}
            </div>
        </motion.div>
    );
}

const TabButton = ({ tab, activeTab, setActiveTab }: any) => {
    return (
        <button onClick={() => setActiveTab(tab.name)} className={`flex items-center gap-2 whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm relative transition-colors ${ activeTab === tab.name ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            <tab.icon size={16} />
            {tab.name}
            {activeTab === tab.name && (
                <motion.div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-indigo-500" layoutId="underline" />
            )}
        </button>
    );
};

const UsageBar = ({ label, percentage, color }: any) => (
    <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-gray-600">{label}</span>
        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
             <motion.div 
                className={`h-4 rounded-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </div>
        <span className="w-10 text-sm font-semibold text-gray-700">{percentage}%</span>
    </div>
);

const JobActivityItem = ({ job }: any) => {
    const statusInfo = {
        Success: { icon: CheckCircle2, color: 'text-green-500', pill: 'bg-green-100 text-green-800 border-green-200' },
        Running: { icon: Loader, color: 'text-blue-500', pill: 'bg-blue-100 text-blue-800 border-blue-200' },
        Failed: { icon: AlertTriangle, color: 'text-red-500', pill: 'bg-red-100 text-red-800 border-red-200' },
    };
    const { icon: Icon, color, pill } = statusInfo[job.status as keyof typeof statusInfo];

    return (
        <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0px 5px 20px rgba(0,0,0,0.05)" }}
            className="bg-white/70 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm flex items-center justify-between transition-shadow"
        >
            <div className="flex items-center gap-4">
                <Icon className={`w-6 h-6 ${color} ${job.status === 'Running' ? 'animate-spin' : ''}`} />
                <div>
                    <p className="font-semibold text-gray-800">{job.name}</p>
                    <p className="text-sm text-gray-500">{job.duration}</p>
                </div>
            </div>
            <div className="text-right">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${pill}`}>{job.status === 'Running' ? 'In progress' : job.status}</span>
                <p className="text-sm text-gray-500 mt-1">{job.time}</p>
            </div>
        </motion.div>
    );
};


export default function ClusterDetailPage({ params }: { params: { clusterId: string } }) {
    const TABS = [
        { name: 'Hardware Inventory', icon: HardDrive },
        { name: 'Component Health', icon: HeartPulse },
        { name: 'Job Activity', icon: ListChecks }
    ];
    const [activeTab, setActiveTab] = useState(TABS[0].name);
    
    // Mock data
    const cluster = {
        id: 'production-east-01',
        name: 'Production-East-01',
        region: 'US East',
        status: 'Healthy',
        nodes: 4,
        totalCapacity: '247 TB',
        storageUsed: '85%',
        uptime: '99.9%',
    };

    const hardwareNodes = [
        { name: 'node-01', type: 'Storage Node', cpu: 'Intel Xeon Gold 6248', ram: '128 GB', storage: '48 TB', status: 'Healthy' },
        { name: 'node-02', type: 'Storage Node', cpu: 'Intel Xeon Gold 6248', ram: '128 GB', storage: '48 TB', status: 'Healthy' },
        { name: 'node-03', type: 'Compute Node', cpu: 'Intel Xeon Silver 4214', ram: '64 GB', storage: '2 TB', status: 'Warning' },
        { name: 'node-04', type: 'Management Node', cpu: 'Intel Core i7-9700', ram: '32 GB', storage: '1 TB', status: 'Healthy' },
    ];

    const componentHealth = [
        { name: 'node-01', cpu: 23, memory: 78 },
        { name: 'node-02', cpu: 45, memory: 65 },
        { name: 'node-03', cpu: 67, memory: 89 },
        { name: 'node-04', cpu: 34, memory: 45 },
    ];

    const jobActivity = [
        { id: 1, name: 'SQL Server Full Backup', duration: '2h 15m', status: 'Success', time: '2 min ago' },
        { id: 2, name: 'File Server Incremental', duration: 'Running 45m', status: 'Running', time: 'In progress' },
        { id: 3, name: 'VM Snapshot Backup', duration: '1h 32m', status: 'Success', time: '25 min ago' },
        { id: 4, name: 'Exchange Database Backup', duration: 'Failed at 23m', status: 'Failed', time: '1h ago' },
    ];

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-full relative overflow-hidden">

            <motion.div variants={headerVariants} initial="hidden" animate="visible">
                <motion.a 
                    href="/clusters" 
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 mb-4 transition-colors"
                    whileHover={{ x: -5 }}
                >
                    <ArrowLeft size={16} />
                    Back to Clusters
                </motion.a>

                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                             <motion.span 
                                animate={{ scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                                className={`w-3 h-3 rounded-full ${cluster.status === 'Healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}
                             ></motion.span>
                            <h1 className="text-3xl font-bold text-gray-900">{cluster.name}</h1>
                             <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${cluster.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{cluster.status}</span>
                        </div>
                        <p className="text-gray-500 mt-1">{cluster.region} • {cluster.nodes} nodes • {cluster.totalCapacity} total capacity</p>
                    </div>
                     <motion.div className="flex gap-2" variants={itemVariants}>
                         <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                            <Settings size={16}/> Configure
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 bg-[#13275c] text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-all">
                            <Monitor size={16}/> Monitor
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

             <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Server} title="Active Nodes" value={cluster.nodes.toString()} />
                <StatCard icon={Database} title="Total Capacity" value={cluster.totalCapacity} />
                <StatCard icon={Zap} title="Storage Used" value={cluster.storageUsed} />
                <StatCard icon={CheckCircle} title="Uptime" value={cluster.uptime} />
            </motion.div>

            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8" aria-label="Tabs">
                    {TABS.map((tab) => (
                       <TabButton key={tab.name} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                    ))}
                </nav>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'Hardware Inventory' && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Hardware Inventory</h2>
                            <div className="space-y-4">
                               {hardwareNodes.map(node => <NodeInfoCard key={node.name} node={node} />)}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'Component Health' && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-sm">
                                <h3 className="font-bold text-lg text-gray-800 mb-4">CPU Utilization</h3>
                                <div className="space-y-4">
                                    {componentHealth.map(node => <UsageBar key={node.name} label={node.name} percentage={node.cpu} color="bg-blue-600" />)}
                                </div>
                            </div>
                            <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-sm">
                                <h3 className="font-bold text-lg text-gray-800 mb-4">Memory Usage</h3>
                                <div className="space-y-4">
                                     {componentHealth.map(node => <UsageBar key={node.name} label={node.name} percentage={node.memory} color="bg-green-500" />)}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'Job Activity' && (
                         <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Job Activity</h2>
                            <div className="space-y-4">
                                {jobActivity.map(job => <JobActivityItem key={job.id} job={job} />)}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

