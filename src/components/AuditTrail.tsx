'use client';

import { format } from 'date-fns';
import { useDocumentContext } from '@/lib/state';
import type { DocumentRecord } from '@/types/documents';

interface AuditTrailProps {
  document: DocumentRecord;
}

export const AuditTrail = ({ document }: AuditTrailProps) => {
  const { auditLogFilter } = useDocumentContext();
  const normalizedSearch = auditLogFilter.search.toLowerCase();

  const filtered = document.auditTrail.filter((event) => {
    const matchesSearch =
      !normalizedSearch ||
      event.action.toLowerCase().includes(normalizedSearch) ||
      event.description.toLowerCase().includes(normalizedSearch) ||
      event.actor.toLowerCase().includes(normalizedSearch);
    const matchesActor = !auditLogFilter.actor || event.actor === auditLogFilter.actor;
    return matchesSearch && matchesActor;
  });

  return (
    <div className="space-y-3">
      {filtered.map((event) => (
        <div key={event.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-1 text-xs uppercase tracking-wide text-slate-500 md:flex-row md:items-center md:justify-between">
            <span>{event.action}</span>
            <span>{format(new Date(event.timestamp), 'dd MMM yyyy HH:mm')} UTC</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-slate-700">{event.actor}</p>
          <p className="text-xs text-slate-500">{event.role}</p>
          <p className="mt-2 text-sm text-slate-600">{event.description}</p>
          {event.metadata && (
            <div className="mt-3 grid gap-2 rounded-md border border-slate-100 bg-slate-50 p-2 text-xs text-slate-500 md:grid-cols-2">
              {Object.entries(event.metadata).map(([key, value]) => (
                <div key={key}>
                  <span className="font-semibold text-slate-600">{key}</span>: {value}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          No audit events match the current filters. Audit trails preserve every change for compliance review.
        </p>
      )}
    </div>
  );
};
