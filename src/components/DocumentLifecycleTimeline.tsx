'use client';

import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';
import type { DocumentLifecycleEntry } from '@/types/documents';

interface DocumentLifecycleTimelineProps {
  lifecycle: DocumentLifecycleEntry[];
}

export const DocumentLifecycleTimeline = ({ lifecycle }: DocumentLifecycleTimelineProps) => {
  return (
    <ol className="relative space-y-4 border-l border-slate-200 pl-6">
      {lifecycle.map((entry, index) => (
        <li key={entry.id} className="relative">
          <span
            className={clsx(
              'absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-white',
              index === 0 ? 'bg-primary-500' : 'bg-slate-300'
            )}
          />
          <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
              <span>{entry.stage}</span>
              <span>{formatDistanceToNow(new Date(entry.updatedAt), { addSuffix: true })}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-700">Status: {entry.status}</p>
            <p className="mt-1 text-sm text-slate-600">
              {entry.actor} ({entry.role})
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
};
