"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Search, Clock, CheckCircle2, AlertTriangle, PlayCircle, Pause, Eye, Play } from 'lucide-react';

const workflows = [
  {
    title: 'Daily SQL Server Backup',
    status: 'Running',
    type: 'Database Backup',
    cluster: 'Production-East-01',
    successRate: '98.7%',
    schedule: 'Daily at 2:00 AM',
    lastRun: '2 min ago',
    duration: '2h 15m',
  },
  {
    title: 'File Server Incremental Sync',
    status: 'Success',
    type: 'File Backup',
    cluster: 'Production-West-02',
    successRate: '99.2%',
    schedule: 'Every 4 hours',
    lastRun: '1h 23m ago',
    duration: '45m',
  },
  {
    title: 'VM Infrastructure Snapshot',
    status: 'Failed',
    type: 'VM Backup',
    cluster: 'Production-East-01',
    successRate: '94.5%',
    schedule: 'Daily at 11:00 PM',
    lastRun: '3h 12m ago',
    duration: 'Failed at 1h 23m',
  },
  {
    title: 'Exchange Email Archive',
    status: 'Scheduled',
    type: 'Email Backup',
    cluster: 'DR-Central-01',
    successRate: '97.8%',
    schedule: 'Weekly on Sunday',
    lastRun: 'Yesterday',
    duration: '3h 45m',
  },
  {
    title: 'Development Code Repository',
    status: 'Success',
    type: 'Code Backup',
    cluster: 'Dev-Test-03',
    successRate: '99.9%',
    schedule: 'Every 2 hours',
    lastRun: '45 min ago',
    duration: '12m',
  },
];

const statusConfig = {
  Running: { icon: Clock, color: 'text-blue-500 bg-blue-100', pillColor: 'bg-blue-500/10 text-blue-600 ring-blue-500/20' },
  Success: { icon: CheckCircle2, color: 'text-green-500 bg-green-100', pillColor: 'bg-green-500/10 text-green-600 ring-green-500/20' },
  Failed: { icon: AlertTriangle, color: 'text-red-500 bg-red-100', pillColor: 'bg-red-500/10 text-red-600 ring-red-500/20' },
  Scheduled: { icon: PlayCircle, color: 'text-gray-500 bg-gray-100', pillColor: 'bg-gray-500/10 text-gray-600 ring-gray-500/20' },
};

const headerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const headerItemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const listItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// keep slug consistent with the details page
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const WorkflowItem = ({
  workflow,
  onOpen,
}: {
  workflow: typeof workflows[0];
  onOpen: (slug: string) => void;
}) => {
  const { icon: Icon, color, pillColor } = statusConfig[workflow.status as keyof typeof statusConfig];
  const slug = slugify(workflow.title);

  const handleCardClick = () => onOpen(slug);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.div
      variants={listItemVariants}
      whileHover={{ scale: 1.02, boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.07)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5 flex flex-col md:flex-row items-start md:items-center gap-4 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleCardClick();
      }}
    >
      <div className="flex-none w-10 h-10 rounded-lg flex items-center justify-center mr-4">
        <Icon className={`w-6 h-6 ${color.split(' ')[0]}`} />
      </div>

      <div className="flex-grow grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-4 w-full">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-semibold text-gray-800">{workflow.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${pillColor}`}>
            {workflow.status}
          </span>
        </div>

        <div className="text-sm">
          <p className="text-gray-500">
            Type: <span className="font-medium text-gray-700">{workflow.type}</span>
          </p>
          <p className="text-gray-500">
            Cluster: <span className="font-medium text-gray-700">{workflow.cluster}</span>
          </p>
        </div>

        <div className="text-sm">
          <p className="text-gray-500">
            Success Rate: <span className="font-medium text-gray-700">{workflow.successRate}</span>
          </p>
          <p className="text-gray-500">
            Schedule: <span className="font-medium text-gray-700">{workflow.schedule}</span>
          </p>
        </div>

        <div className="text-sm">
          <p className="text-gray-500">
            Last Run: <span className="font-medium text-gray-700">{workflow.lastRun}</span>
          </p>
          <p className="text-gray-500">
            Duration: <span className="font-medium text-gray-700">{workflow.duration}</span>
          </p>
        </div>

        <div className="col-span-2 md:col-span-1 flex items-center justify-end gap-2">
          {workflow.status === 'Running' ? (
            <button
              onClick={stop}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Pause size={14} />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={stop}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Play size={14} />
              <span>Run Now</span>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(slug);
            }}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
            aria-label="View details"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkflowsPage() {
  const router = useRouter();

  const openDetails = (slug: string) => {
    router.push(`/workflows/${slug}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <motion.div variants={headerContainerVariants} initial="hidden" animate="visible">
        <motion.div variants={headerItemVariants} className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
            <p className="text-gray-500 mt-1">Manage and monitor your backup workflows and schedules</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#13275c] text-white font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-90 transition-colors"
          >
            Create Workflow
          </motion.button>
        </motion.div>

        <motion.div variants={headerItemVariants} className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <motion.input
            whileFocus={{ boxShadow: '0 0 0 2px rgba(19, 39, 92, 0.4)' }}
            type="text"
            placeholder="Search workflows..."
            className="w-full max-w-sm pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-[#13275c] transition placeholder-gray-500 text-gray-900"
          />
        </motion.div>
      </motion.div>

      <motion.div variants={listContainerVariants} initial="hidden" animate="visible" className="space-y-4">
        {workflows.map((workflow, index) => (
          <WorkflowItem key={index} workflow={workflow} onOpen={openDetails} />
        ))}
      </motion.div>
    </div>
  );
}