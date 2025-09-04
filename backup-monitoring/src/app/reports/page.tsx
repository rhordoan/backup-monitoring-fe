"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CheckCircle, Zap, HardDrive, Wifi, Calendar, Download, Cpu, Box, TrendingUp } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <motion.div variants={itemVariants} className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center gap-4">
        <div className={`p-2 rounded-full bg-gray-100`}>
            <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className={`text-xs font-semibold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
            </div>
        </div>
    </motion.div>
);

const TrendChart = ({ title, icon: Icon, data, unit, values, chartColorClass }: any) => (
     <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
            <Icon className="w-5 h-5 text-gray-500"/>
            <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="flex items-end h-32 gap-2">
            {data.map((height: number, index: number) => (
                <motion.div
                    key={index}
                    className={`w-full ${chartColorClass || 'bg-indigo-200'} rounded-t`}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.1 * index }}
                />
            ))}
        </div>
        <div className="flex justify-between mt-3 text-sm">
           {values.map((val: any, i: number) => (
               <div key={i} className="text-center">
                   <p className="font-bold text-lg text-gray-800">{val.value}{unit}</p>
                   <p className="text-xs text-gray-500">{val.label}</p>
               </div>
           ))}
        </div>
    </motion.div>
);

const ClusterHealthBar = ({ data }: any) => (
    <motion.div variants={itemVariants} className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">{data.name}</h4>
            <span className={`w-2.5 h-2.5 rounded-full ${data.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
        </div>
        <div className="space-y-3">
            {Object.entries(data.metrics).map(([key, value]: [string, any]) => (
                <div key={key}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{key}</span>
                        <span>{value.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                            className={`${value.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${value.value}%` }}
                            transition={{ type: 'spring', stiffness: 50 }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState('Hardware Health');

    const stats = [
        { icon: CheckCircle, title: 'Success Rate', value: '98.7%', change: '+0.5% vs last month', color: 'text-green-500' },
        { icon: Zap, title: 'Total Jobs', value: '2,847', change: '+12% vs last month', color: 'text-blue-500' },
        { icon: HardDrive, title: 'Avg Storage', value: '73.2%', change: '+2.1% vs last month', color: 'text-yellow-500' },
        { icon: Wifi, title: 'Connectivity', value: '99.1%', change: 'stable', color: 'text-indigo-500' },
    ];
    
    const cpuData = [40, 55, 45, 60, 30, 40, 25, 35, 20, 30, 15, 25, 70, 60, 80, 50];
    const storageData = [60, 70, 65, 80, 75, 85, 70, 90, 80, 85, 75, 95, 80, 88, 70, 92];
    const successRateData = [98, 92, 95, 99, 88, 93, 97, 99, 94, 96, 98, 92, 95, 97, 99];
    const jobVolumeData = [60, 70, 65, 80, 75, 85, 70, 90, 80, 85, 75, 95, 80, 88, 70, 92];
    const connectivityData = [30, 40, 55, 70, 60, 50, 75, 65, 80, 50, 25, 85, 90, 40, 70, 85, 50, 40];
    
    const connectivityStats = [
        { value: '99.1%', label: 'Uptime', color: 'text-green-500' },
        { value: '234', label: 'Connected', color: 'text-gray-800' },
        { value: '3', label: 'Unstable', color: 'text-yellow-500' },
        { value: '1', label: 'Offline', color: 'text-red-500' },
    ];

    const clusterData = [
        { name: 'Production-East-01', status: 'healthy', metrics: { CPU: { value: 34, color: 'bg-blue-500' }, Memory: { value: 67, color: 'bg-green-500' }, Storage: { value: 85, color: 'bg-orange-500' } } },
        { name: 'Production-West-02', status: 'healthy', metrics: { CPU: { value: 28, color: 'bg-blue-500' }, Memory: { value: 54, color: 'bg-green-500' }, Storage: { value: 72, color: 'bg-orange-500' } } },
        { name: 'DR-Central-01', status: 'warning', metrics: { CPU: { value: 45, color: 'bg-blue-500' }, Memory: { value: 78, color: 'bg-green-500' }, Storage: { value: 45, color: 'bg-orange-500' } } },
        { name: 'Dev-Test-03', status: 'healthy', metrics: { CPU: { value: 23, color: 'bg-blue-500' }, Memory: { value: 41, color: 'bg-green-500' }, Storage: { value: 34, color: 'bg-orange-500' } } },
    ];
    
    return (
        <div className="p-8 bg-gray-50 min-h-full">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                 <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                        <p className="text-gray-500 mt-1">Analyze trends and generate insights from your backup infrastructure</p>
                    </div>
                     <div className="flex gap-2">
                         <button className="flex items-center gap-2 font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors">
                            <Calendar size={16}/> Date Range
                        </button>
                        <button className="flex items-center gap-2 bg-[#13275c] text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-colors">
                            <Download size={16}/> Export Report
                        </button>
                    </div>
                </div>
            </motion.div>
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
            </motion.div>
            
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {['Hardware Health', 'Backup Trends', 'Connectivity'].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`${ activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                            {tab}
                        </button>
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
                    {activeTab === 'Hardware Health' && (
                        <div>
                             <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                <TrendChart title="CPU Utilization Trends" icon={Cpu} data={cpuData} unit="%" values={[{value: 34, label: 'Average'}, {value: 67, label: 'Peak'}, {value: 12, label: 'Minimum'}]} chartColorClass="bg-indigo-300" />
                                <TrendChart title="Storage Capacity Trends" icon={Box} data={storageData} unit=" TB" values={[{value: 847, label: 'Total TB'}, {value: 620, label: 'Used TB'}, {value: 227, label: 'Free TB'}]} chartColorClass="bg-green-300" />
                            </motion.div>

                             <motion.div variants={itemVariants} initial="hidden" animate="visible">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Cluster Health Summary</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {clusterData.map((cluster) => (
                                        <ClusterHealthBar key={cluster.name} data={cluster} />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {activeTab === 'Backup Trends' && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                             <TrendChart title="Success Rate Trends" icon={TrendingUp} data={successRateData} unit="%" values={[{value: '98.7', label: 'This Month'}, {value: '98.4', label: 'Last Month'}, {value: '97.9', label: '3 Months Ago'}]} chartColorClass="bg-green-300" />
                             <TrendChart title="Job Volume Trends" icon={Zap} data={jobVolumeData} unit="" values={[{value: '2,847', label: 'This Month'}, {value: '2,534', label: 'Last Month'}, {value: '+12%', label: 'Growth'}]} chartColorClass="bg-blue-300" />
                        </motion.div>
                    )}
                    
                    {activeTab === 'Connectivity' && (
                         <motion.div variants={itemVariants}>
                            <div className="bg-white p-6 rounded-t-xl border-x border-t border-gray-200/80 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Wifi className="w-5 h-5 text-gray-500"/>
                                    <h3 className="font-semibold text-gray-800">Client Connectivity Trends</h3>
                                </div>
                                <div className="flex items-end h-32 gap-2">
                                    {connectivityData.map((height, index) => (
                                        <motion.div
                                            key={index}
                                            className="w-full bg-green-300 rounded-t"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ type: 'spring', stiffness: 100, delay: 0.1 * index }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200/80 border border-gray-200/80 rounded-b-xl overflow-hidden shadow-sm">
                                {connectivityStats.map(stat => (
                                    <div key={stat.label} className="bg-white p-4 text-center">
                                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

