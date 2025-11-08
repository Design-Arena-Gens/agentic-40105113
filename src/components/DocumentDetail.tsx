'use client';

import { useState } from 'react';
import { useDocumentContext } from '@/lib/state';
import type { DocumentRecord } from '@/types/documents';
import { DocumentMetadataGrid } from '@/components/DocumentMetadataGrid';
import { DocumentLifecycleTimeline } from '@/components/DocumentLifecycleTimeline';
import { DocumentVersionHistory } from '@/components/DocumentVersionHistory';
import { WorkflowPanel } from '@/components/WorkflowPanel';
import { AuditTrail } from '@/components/AuditTrail';
import { AuditFilterControls } from '@/components/AuditFilterControls';
import { SignatureDialog } from '@/components/SignatureDialog';

interface DocumentDetailProps {
  document: DocumentRecord;
}

export const DocumentDetail = ({ document }: DocumentDetailProps) => {
  const { addSignature, completeWorkflowTask, logAuditEvent, currentUser } = useDocumentContext();
  const [signVersionId, setSignVersionId] = useState<string | null>(null);

  const handleSignature = (payload: { meaning: 'Review' | 'Approval' | 'Execution'; justification: string }) => {
    if (!signVersionId) return;
    addSignature(document.id, signVersionId, {
      signedBy: currentUser.name,
      signerRole: currentUser.role,
      meaning: payload.meaning,
      justification: payload.justification
    });
    logAuditEvent(document.id, {
      actor: currentUser.name,
      role: currentUser.role,
      action: `${payload.meaning} Signature Captured`,
      description: `${currentUser.name} signed version ${document.documentVersion} with justification: ${payload.justification}.`
    });
  };

  const handleCompleteTask = (taskId: string) => {
    completeWorkflowTask(document.id, taskId);
    logAuditEvent(document.id, {
      actor: currentUser.name,
      role: currentUser.role,
      action: 'Workflow Step Completed',
      description: `${currentUser.name} completed workflow task ${taskId}.`
    });
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-slate-800">Controlled Metadata</h2>
        <p className="text-sm text-slate-500">
          Ensure metadata remains consistent with GMP and ISO document control practices.
        </p>
        <div className="mt-4">
          <DocumentMetadataGrid document={document} />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-md font-semibold text-slate-800">Lifecycle Timeline</h3>
          <p className="text-sm text-slate-500">Chronological record of transitions across the controlled lifecycle.</p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <DocumentLifecycleTimeline lifecycle={document.lifecycle} />
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold text-slate-800">Workflow Tasks</h3>
          <p className="text-sm text-slate-500">Automated review and approval workflow aligned with 21 CFR Part 11.</p>
          <div className="mt-4">
            <WorkflowPanel document={document} onTaskComplete={handleCompleteTask} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-md font-semibold text-slate-800">Version & Signatures</h3>
        <p className="text-sm text-slate-500">Maintain an immutable log of revisions with electronic signatures.</p>
        <div className="mt-4">
          <DocumentVersionHistory document={document} onSign={setSignVersionId} />
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-md font-semibold text-slate-800">Audit Trail</h3>
            <p className="text-sm text-slate-500">
              Every interaction is captured with actor, role, timestamp, and contextual metadata.
            </p>
          </div>
          <AuditFilterControls document={document} />
        </div>
        <div className="mt-4">
          <AuditTrail document={document} />
        </div>
      </section>

      {signVersionId && (
        <SignatureDialog
          versionLabel={document.versions.find((version) => version.id === signVersionId)?.version ?? ''}
          onClose={() => setSignVersionId(null)}
          onSigned={handleSignature}
        />
      )}
    </div>
  );
};
