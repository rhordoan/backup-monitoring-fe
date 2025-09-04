import type { Metadata } from "next";
import React from 'react';
import {
  LayoutDashboard,
  Server,
  Workflow,
  AlertTriangle,
  BarChart2,
  Settings,
  Shield,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import './globals.css';

export const metadata: Metadata = {
  title: "BackupAI Dashboard",
  description: "Infrastructure Monitoring by BackupAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

