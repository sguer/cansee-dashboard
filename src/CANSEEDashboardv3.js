import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const CANSEEDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // --- Financial Data ---
  const revenueData = [
    { category: 'Conference Registration', '2023': 12960.30, '2024': 0.0 },
    { category: 'Membership & Other', '2023': 4825.34, '2024': 4190.24 }
  ];

  const summaryData = [
    { metric: 'Total Revenue', '2023': 17785.64, '2024': 4190.24, change: -76.4 },
    { metric: 'Total Expenses', '2023': 22248.67, '2024': 17593.05, change: -20.9 },
    { metric: 'Net Income (Loss)', '2023': -4463.03, '2024': -13402.81, change: -200.2 },
    { metric: 'Cash Position', '2023': 13819.62, '2024': 3223.42, change: -76.7 },
    { metric: 'Net Assets', '2023': 20309.54, '2024': 6906.73, change: -66.0 }
  ];

  // --- Thematic / Conference Data ---
  const thematicData = [
    { theme: 'Indigenous Reconciliation', value: 27, color: '#dc2626' },
    { theme: 'Ecological Governance', value: 27, color: '#16a34a' },
    { theme: 'Sustainable Transitions', value: 26, color: '#2563eb' },
    { theme: 'Degrowth Economics', value: 20, color: '#7c3aed' }
  ];

  // --- Institutional Analysis Data (now removed clusters) ---
  const geographicDistribution = [
    { region: 'Ontario', percentage: 50, members: 24 },
    { region: 'Quebec', percentage: 27, members: 13 },
    { region: 'Western Canada', percentage: 15, members: 7 },
    { region: 'Atlantic Canada', percentage: 4, members: 2 },
    { region: 'International', percentage: 4, members: 2 }
  ];

  // --- Key Insights / Resilience Highlights ---
  const resilienceHighlights = [
    {
      title: "Adaptive Spending",
      value: "↓ 21%",
      description: "Expenses were 21% lower in 2024 due to the conference pause, reflecting prudent cost management while preserving capacity to scale up in 2025.",
      color: "bg-green-50 border-green-200 text-green-700"
    },
    {
      title: "Member Commitment",
      value: "87%",
      description: "Membership revenue retained 87% of 2023 levels, demonstrating strong community support even without a 2024 conference.",
      color: "bg-blue-50 border-blue-200 text-blue-700"
    },
    {
      title: "Knowledge Assets",
      value: "15+",
      description: "At least 15 presentations from the last conference remain freely accessible online, alongside recordings that showcase ongoing organizational impact.",
      color: "bg-purple-50 border-purple-200 text-purple-700"
    }
  ];

  // --- Volunteer Proposals ---
  const volunteerProposals = [
    {
      title: "CANSEE Impact Tracker",
      description: "A low-cost initiative to measure and amplify the network's influence using work already done.",
      initiatives: [
        "Track & Measure: Monitor mentions across press, policy documents, and digital platforms",
        "Amplify & Connect: Engage with the 60% of 2023 conference presenters who are not currently members, with tailored invitations to the 2026 conference",
        "Network Mapping: Visualize collaborations to identify strengths and opportunities"
      ],
      note: "Minimal volunteer coordination required; builds on existing content and relationships"
    },
    {
      title: "Knowledge Sharing Hub",
      description: "Curate existing presentations and resources to boost visibility and reuse.",
      initiatives: [
        "Highlight open-access conference materials",
        "Create a simple resource index for members",
        "Encourage cross-thematic collaboration using prior work"
      ],
      note: "Minimal content creation needed, builds on past efforts."
    }
  ];

  const BAR_COLORS = { '2023': '#4f46e5', '2024': '#10b981' };

  // --- Formatting Helpers ---
  const formatCurrency = (value) => {
    const formatted = `$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    return value < 0 ? `(${formatted})` : formatted;
  };

  const formatChange = (value) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const TabButton = ({ id, label, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 mx-1 rounded-t-lg font-medium transition-colors ${
        isActive
          ? 'bg-blue-600 text-white border-b-2 border-blue-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const MetricCard = ({ insight }) => (
    <div className={`p-4 rounded-lg border-2 ${insight.color} flex flex-col items-center text-center`}>
      <h3 className="font-bold text-lg">{insight.title}</h3>
      <div className="text-2xl font-bold my-2">{insight.value}</div>
      <p className="text-sm">{insight.description}</p>
    </div>
  );

  const VolunteerCard = ({ proposal }) => (
    <div className="p-4 rounded-lg border-2 border-blue-300 bg-blue-50 flex flex-col">
      <h3 className="font-bold text-lg mb-2 text-blue-800">{proposal.title}</h3>
      <p className="text-gray-700 mb-3">{proposal.description}</p>
      <ul className="list-none text-gray-700 mb-3 space-y-2">
        {proposal.initiatives.map((item, i) => {
          const parts = item.split(':');
          if (parts.length > 1) {
            return (
              <li key={i}>
                • <span className="font-semibold text-blue-800">{parts[0]}:</span>
                {parts.slice(1).join(':')}
              </li>
            );
          }
          return <li key={i}>• {item}</li>;
        })}
      </ul>
      <p className="text-blue-600 text-sm italic mt-auto">{proposal.note}</p>
    </div>
  );

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">{payload[0].value}% of conference content</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* --- Header --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CANSEE Strategic Analysis Dashboard</h1>
      </div>

      {/* --- Tabs --- */}
      <div className="mb-6 border-b">
        <nav className="flex space-x-1">
          <TabButton id="overview" label="Overview" isActive={activeTab === 'overview'} />
          <TabButton id="financial" label="Financial Analysis" isActive={activeTab === 'financial'} />
          <TabButton id="content" label="Conference Content" isActive={activeTab === 'content'} />
          <TabButton id="strategies" label="Community Engagement" isActive={activeTab === 'strategies'} />
        </nav>
      </div>

      {/* --- Overview Tab --- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resilienceHighlights.map((insight, i) => <MetricCard key={i} insight={insight} />)}
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Note: All figures relate to the 2023 conference. Source: <a href="https://yorkspace.library.yorku.ca/collections/1b74f3b1-06e3-4dd9-bc0b-72fee85161b8" className="underline text-blue-600">conference materials</a> and <a href="https://theisee.wildapricot.org/page-1548415" className="underline text-blue-600">ISEE member directory</a>.
          </p>
        </div>
      )}

      {/* --- Financial Analysis Tab --- */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Revenue Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                  <Legend />
                  <Bar dataKey="2023" fill={BAR_COLORS['2023']} name="2023" />
                  <Bar dataKey="2024" fill={BAR_COLORS['2024']} name="2024" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Complete Financial Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">2023</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">2024</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">YoY</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{row.metric}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono">{formatCurrency(row['2023'])}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right font-mono">{formatCurrency(row['2024'])}</td>
                      <td className={`border border-gray-300 px-4 py-2 text-right font-mono ${row.change < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatChange(row.change)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- Conference Content Tab --- */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">2023 Conference Theme Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={thematicData}
                  dataKey="value"
                  nameKey="theme"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label={({ theme, value }) => `${theme}: ${value}%`}
                >
                  {thematicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 text-center mt-2">
              Based on 15 presentations across 4 thematic areas
            </p>
          </div>
        </div>
      )}

      {/* --- Community Engagement Tab --- */}
      {activeTab === 'strategies' && (
        <div className="space-y-6">
          {/* Regional Representation Only */}
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800 mb-3">Geographic Membership Overview</h3>
            <div className="space-y-2 text-sm">
              {geographicDistribution.map((region, i) => (
                <div key={i} className="bg-white p-2 rounded border flex justify-between items-center">
                  <span className="font-semibold text-purple-700">{region.region}</span>
                  <span className="font-mono text-purple-800">~{region.percentage}%</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-purple-600 italic mt-2">
              Note: Analysis based on available member data, which may be incomplete. Network mapping tools could provide more comprehensive insights.
            </p>
          </div>

          {/* Proposed Volunteer Initiatives */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Proposed Volunteer Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {volunteerProposals.map((proposal, i) => <VolunteerCard key={i} proposal={proposal} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CANSEEDashboard;






