'use client';

import { useMemo, useState } from 'react';
import { useDocumentContext } from '@/lib/state';
import type { DocumentRecord } from '@/types/documents';

interface AuditFilterControlsProps {
  document: DocumentRecord;
}

export const AuditFilterControls = ({ document }: AuditFilterControlsProps) => {
  const { auditLogFilter, setAuditFilter } = useDocumentContext();
  const [search, setSearch] = useState(auditLogFilter.search);
  const [actor, setActor] = useState(auditLogFilter.actor);

  const actors = useMemo(() => {
    const unique = new Set(document.auditTrail.map((event) => event.actor));
    return Array.from(unique.values());
  }, [document.auditTrail]);

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Search Audit Trail
        </label>
        <input
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          placeholder="Events, actors, or descriptions"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="md:w-48">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Actor</label>
        <select
          className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={actor}
          onChange={(event) => setActor(event.target.value)}
        >
          <option value="">All actors</option>
          {actors.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="h-10 rounded-md bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
        type="button"
        onClick={() => setAuditFilter(search, actor)}
      >
        Apply Filters
      </button>
    </div>
  );
};
