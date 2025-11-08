'use client';

import { format } from 'date-fns';
import { useDocumentContext } from '@/lib/state';

const complianceHighlights = [
  {
    title: '21 CFR Part 11',
    description: 'Electronic signatures are enforced for approvals and audit logs are immutable.'
  },
  {
    title: 'ICH Q7',
    description: 'Manufacturing instructions align with GMP expectations for APIs.'
  },
  {
    title: 'ISO 9001',
    description: 'Document lifecycle ensures continuous improvement and traceability.'
  }
];

export const ComplianceSummary = () => {
  const { documents } = useDocumentContext();
  const effectiveDocuments = documents.filter((doc) => doc.status === 'Effective' || doc.status === 'Approved');
  const nextReview = documents
    .map((doc) => ({ doc, date: new Date(doc.nextReviewDate) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-600">Effective Documents</h3>
        <p className="mt-2 text-3xl font-bold text-primary-700">{effectiveDocuments.length}</p>
        <p className="mt-2 text-sm text-slate-500">Documents currently released for use across operations.</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-600">Upcoming Review</h3>
        <p className="mt-2 text-3xl font-bold text-emerald-600">
          {nextReview ? format(nextReview.date, 'dd MMM yyyy') : 'No reviews scheduled'}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {nextReview ? `${nextReview.doc.title} requires next periodic review.` : 'All documents within review cycle.'}
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-600">Compliance Focus</h3>
        <ul className="mt-2 space-y-1 text-sm text-slate-500">
          {complianceHighlights.map((item) => (
            <li key={item.title}>
              <span className="font-semibold text-slate-700">{item.title}</span>: {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
