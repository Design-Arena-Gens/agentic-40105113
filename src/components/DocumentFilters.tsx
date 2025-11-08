'use client';

import { useState } from 'react';
import { useDocumentContext } from '@/lib/state';

interface DocumentFiltersProps {
  onFilterChange: (filters: { search: string; type: string; security: string; status: string }) => void;
}

export const DocumentFilters = ({ onFilterChange }: DocumentFiltersProps) => {
  const { documentTypes } = useDocumentContext();
  const [filters, setFilters] = useState({ search: '', type: 'All', security: 'All', status: 'All' });

  const updateFilter = (key: 'search' | 'type' | 'security' | 'status', value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange(next);
  };

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="md:col-span-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Search</label>
        <input
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          placeholder="Title, number, owner, or category"
          value={filters.search}
          onChange={(event) => updateFilter('search', event.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Document Type</label>
        <select
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={filters.type}
          onChange={(event) => updateFilter('type', event.target.value)}
        >
          <option>All</option>
          {documentTypes.map((type) => (
            <option key={type.id}>{type.type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Security</label>
        <select
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={filters.security}
          onChange={(event) => updateFilter('security', event.target.value)}
        >
          <option>All</option>
          <option>Confidential</option>
          <option>Internal</option>
          <option>Restricted</option>
          <option>Public</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
        <select
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={filters.status}
          onChange={(event) => updateFilter('status', event.target.value)}
        >
          <option>All</option>
          <option>Draft</option>
          <option>In Review</option>
          <option>Pending Approval</option>
          <option>Approved</option>
          <option>Effective</option>
          <option>Obsolete</option>
        </select>
      </div>
    </div>
  );
};
