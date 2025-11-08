'use client';

import { format } from 'date-fns';
import type { DocumentRecord, DocumentVersion } from '@/types/documents';
import { useCurrentPermissions } from '@/lib/permissions';

interface DocumentVersionHistoryProps {
  document: DocumentRecord;
  onSign: (versionId: string) => void;
}

const formatSignatureLabel = (version: DocumentVersion) => {
  if (!version.signedOffBy.length) return 'Awaiting signatures';
  return `${version.signedOffBy.length} signature(s) captured`;
};

export const DocumentVersionHistory = ({ document, onSign }: DocumentVersionHistoryProps) => {
  const permissions = useCurrentPermissions();
  const canSign = permissions.some((permission) => permission.startsWith('sign:'));

  return (
    <div className="space-y-3">
      {document.versions.map((version) => (
        <div key={version.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">Version {version.version}</p>
              <p className="text-xs text-slate-500">Created {format(new Date(version.createdAt), 'dd MMM yyyy')}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                {formatSignatureLabel(version)}
              </span>
              {canSign && (
                <button
                  className="rounded-md bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-primary-700"
                  onClick={() => onSign(version.id)}
                  type="button"
                >
                  Apply e-Signature
                </button>
              )}
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">{version.changeSummary}</p>
          {version.signedOffBy.length > 0 && (
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              {version.signedOffBy.map((signature) => (
                <div key={signature.id} className="text-xs text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700">{signature.signedBy}</span> ({signature.signerRole})
                    {' · '} {signature.meaning} ·{' '}
                    {format(new Date(signature.signedAt), 'dd MMM yyyy HH:mm')} UTC
                  </p>
                  <p>Justification: {signature.justification}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
