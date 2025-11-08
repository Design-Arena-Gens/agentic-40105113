'use client';

import { format } from 'date-fns';
import clsx from 'clsx';
import type { DocumentRecord } from '@/types/documents';

interface DocumentTableProps {
  documents: DocumentRecord[];
  selectedId?: string;
  onSelect: (doc: DocumentRecord) => void;
}

export const DocumentTable = ({ documents, selectedId, onSelect }: DocumentTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-100 text-left uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Number</th>
            <th className="px-4 py-3">Version</th>
            <th className="px-4 py-3">Security</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Effective From</th>
            <th className="px-4 py-3">Next Review</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className={clsx(
                'cursor-pointer transition hover:bg-primary-50',
                selectedId === doc.id && 'bg-primary-50'
              )}
              onClick={() => onSelect(doc)}
            >
              <td className="px-4 py-3 font-semibold text-slate-700">{doc.title}</td>
              <td className="px-4 py-3 text-slate-600">{doc.documentNumber}</td>
              <td className="px-4 py-3 text-slate-600">{doc.documentVersion}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {doc.documentSecurity}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={clsx('rounded-full px-2 py-1 text-xs font-semibold', {
                    'bg-emerald-100 text-emerald-700': doc.status === 'Effective' || doc.status === 'Approved',
                    'bg-amber-100 text-amber-700': doc.status === 'In Review' || doc.status === 'Pending Approval',
                    'bg-slate-200 text-slate-600': doc.status === 'Draft',
                    'bg-rose-100 text-rose-700': doc.status === 'Obsolete'
                  })}
                >
                  {doc.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{format(new Date(doc.effectiveFrom), 'dd MMM yyyy')}</td>
              <td className="px-4 py-3 text-slate-600">{format(new Date(doc.nextReviewDate), 'dd MMM yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {documents.length === 0 && (
        <div className="p-6 text-center text-sm text-slate-500">
          No documents match the current filters. Adjust filters or create a new controlled document.
        </div>
      )}
    </div>
  );
};
