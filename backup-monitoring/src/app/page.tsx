"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  LayoutGrid,
  HardDrive,
  CircleDot,
  Activity,
  CheckCircle2,
  MoreVertical,
  ArrowRightCircle,
  File,
  Server,
  Database,
  XCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Animation variants for staggering children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

// A simple component to render the small bar charts in the stat cards
const StatChart = ({ data, colorClass }: { data: number[], colorClass: string }) => (
  <div className="flex items-end h-10 space-x-1">
    {data.map((value, index) => (
      <motion.div
        key={index}
        className="w-full rounded-t-sm"
        style={{ backgroundColor: colorClass, originY: 1 }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: value / 100 }}
        transition={{ duration: 0.8, delay: index * 0.05, type: 'spring' }}
      />
    ))}
  </div>
);

const StatCard = ({ icon: Icon, title, value, subValue, trend, chartData, chartColor }: any) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
  >
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-xs ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{subValue}</p>
      </div>
      <Icon className="text-gray-400" size={20} />
    </div>
    <StatChart data={chartData} colorClass={chartColor} />
  </motion.div>
);

const ClusterHealthItem = ({ status, name, jobs, usage }: any) => {
    const statusColors: { [key: string]: string } = {
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        orange: "bg-orange-500",
        blue: "bg-blue-500"
    };

    const usageBadgeStyles: { [key: string]: string } = {
      green: "bg-[#13275c] text-white",
      orange: "bg-gray-200 text-gray-800",
      blue: "bg-[#13275c] text-white",
    };

    return (
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 p-4 rounded-lg flex items-center justify-between mb-3 last:mb-0"
        >
            <div className="flex items-center">
                <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status]} mr-4`}></span>
                <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{jobs}</p>
                </div>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${usageBadgeStyles[status]}`}>
                {usage}% used
            </span>
        </motion.div>
    );
};

const RecentJobItem = ({ icon: Icon, title, time, statusColor }: any) => (
    <motion.div
      variants={itemVariants}
      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
    >
        <div className="flex items-center">
            <Icon className={`${statusColor}`} size={18} />
            <p className="text-sm text-gray-700 ml-3">{title}</p>
        </div>
        <p className="text-xs text-gray-500">{time}</p>
    </motion.div>
);


const HomePage = () => {
    const router = useRouter();
    const statCardsData = [
        { title: "Active Clusters", value: "12", subValue: "+2 this week", trend: "up", chartData: [40, 50, 60, 80, 70, 90, 85], chartColor: '#a7f3d0', icon: LayoutGrid },
        { title: "Total Capacity", value: "847 TB", subValue: "12.3% used", trend: "up", chartData: [30, 40, 55, 60, 75, 65, 80], chartColor: '#d1d5db', icon: HardDrive },
        { title: "Backup Success Rate", value: "98.7%", subValue: "-0.3% vs last week", trend: "down", chartData: [80, 85, 90, 75, 88, 95, 92], chartColor: '#fde68a', icon: CircleDot },
        { title: "Active Jobs", value: "247", subValue: "+15 today", trend: "up", chartData: [50, 60, 70, 65, 80, 75, 90], chartColor: '#a7f3d0', icon: Activity }
    ];

    const clusterHealthData = [
        { status: "green", name: "Production-East-01", jobs: "45 active jobs", usage: 85 },
        { status: "green", name: "Production-West-02", jobs: "38 active jobs", usage: 72 },
        { status: "orange", name: "DR-Central-01", jobs: "23 active jobs", usage: 45 },
        { status: "green", name: "Dev-Test-03", jobs: "12 active jobs", usage: 34 }
    ];

    const recentJobsData = [
        { icon: CheckCircle2, title: "SQL Server Backup", time: "2 min ago", statusColor: "text-green-500" },
        { icon: Clock, title: "File Server Sync", time: "5 min ago", statusColor: "text-yellow-500" },
        { icon: CheckCircle2, title: "VM Snapshot", time: "12 min ago", statusColor: "text-green-500" },
        { icon: AlertTriangle, title: "Exchange Backup", time: "25 min ago", statusColor: "text-red-500" },
    ];


  return (
    <motion.div
      className="bg-gray-50 p-1"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">AI-powered backup infrastructure monitoring and insights</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        {statCardsData.map(card => <StatCard key={card.title} {...card} />)}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {/* Cluster Health Summary */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col"
        >
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <CheckCircle2 className="text-green-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-800">Cluster Health Summary</h2>
            </div>
            <motion.div variants={containerVariants}>
              {clusterHealthData.map(cluster => <ClusterHealthItem key={cluster.name} {...cluster} />)}
            </motion.div>
          </div>
           <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/clusters')}
            className="w-full mt-4 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 py-2 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
            View All Clusters <ArrowRightCircle className="ml-2" size={16} />
          </motion.button>
        </motion.div>

        {/* Backup Status Overview */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col"
        >
          <div className="flex-1">
            <div className="flex items-center mb-4">
                <Activity className="text-blue-500 mr-2" size={20} />
                <h2 className="text-lg font-semibold text-gray-800">Backup Status Overview</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div>
                    <p className="text-3xl font-bold text-green-600">234</p>
                    <p className="text-sm text-gray-500">Successful</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-yellow-500">13</p>
                    <p className="text-sm text-gray-500">Running</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-3xl font-bold text-red-600">3</p>
                    <p className="text-sm text-gray-500">Failed</p>
                </div>
            </div>
             <h3 className="text-sm font-semibold text-gray-600 mb-2">RECENT JOBS</h3>
            <motion.div variants={containerVariants}>
                {recentJobsData.map(job => <RecentJobItem key={job.title} {...job} />)}
            </motion.div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/workflows')}
            className="w-full mt-4 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 py-2 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
              View All Workflows <ArrowRightCircle className="ml-2" size={16} />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;