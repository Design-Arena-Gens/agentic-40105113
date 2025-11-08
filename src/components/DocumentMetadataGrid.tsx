'use client';

import { format } from 'date-fns';
import type { DocumentRecord } from '@/types/documents';

interface DocumentMetadataGridProps {
  document: DocumentRecord;
}

const rows: Array<{ label: string; field: keyof DocumentRecord }> = [
  { label: 'Document Number', field: 'documentNumber' },
  { label: 'Document Version', field: 'documentVersion' },
  { label: 'Created By', field: 'createdBy' },
  { label: 'Date Created', field: 'dateCreated' },
  { label: 'Issued By', field: 'issuedBy' },
  { label: 'Issuer Role', field: 'issuerRole' },
  { label: 'Date of Issue', field: 'dateOfIssue' },
  { label: 'Effective From', field: 'effectiveFrom' },
  { label: 'Next Review Date', field: 'nextReviewDate' },
  { label: 'Document Type', field: 'documentType' },
  { label: 'Category', field: 'documentCategory' },
  { label: 'Security', field: 'documentSecurity' }
];

export const DocumentMetadataGrid = ({ document }: DocumentMetadataGridProps) => {
  const formatValue = (field: keyof DocumentRecord) => {
    const value = document[field];
    if (!value) return '—';
    if (field.toLowerCase().includes('date') || field === 'effectiveFrom' || field === 'nextReviewDate') {
      try {
        return format(new Date(String(value)), 'dd MMM yyyy');
      } catch (error) {
        return value as string;
      }
    }
    return value as string;
  };

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {rows.map((row) => (
        <div key={row.field} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{row.label}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{formatValue(row.field)}</p>
        </div>
      ))}
    </div>
  );
};
