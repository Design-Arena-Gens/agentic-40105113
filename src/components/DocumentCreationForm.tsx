'use client';

import { FormEvent, useState } from 'react';
import { addDays } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { useDocumentContext } from '@/lib/state';
import type { DocumentRecord } from '@/types/documents';

interface DocumentCreationFormProps {
  onCreated?: (document: DocumentRecord) => void;
}

const documentSecurityOptions = ['Confidential', 'Internal', 'Restricted', 'Public'] as const;

export const DocumentCreationForm = ({ onCreated }: DocumentCreationFormProps) => {
  const { documentTypes, currentUser, addDocument, logAuditEvent } = useDocumentContext();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    documentNumber: '',
    documentVersion: '0.1',
    documentType: documentTypes[0]?.type ?? 'Manual',
    documentCategory: '',
    documentSecurity: 'Confidential' as (typeof documentSecurityOptions)[number],
    dateOfIssue: '',
    issuedBy: currentUser.name,
    issuerRole: currentUser.role,
    effectiveFrom: '',
    nextReviewDate: ''
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const now = new Date();
    const document: DocumentRecord = {
      id: uuid(),
      title: form.title,
      documentNumber: form.documentNumber,
      documentVersion: form.documentVersion,
      dateCreated: now.toISOString(),
      createdBy: currentUser.name,
      dateOfIssue: form.dateOfIssue || now.toISOString(),
      issuedBy: form.issuedBy,
      issuerRole: form.issuerRole,
      effectiveFrom: form.effectiveFrom || addDays(now, 7).toISOString(),
      nextReviewDate: form.nextReviewDate || addDays(now, 180).toISOString(),
      documentType: form.documentType,
      documentCategory: form.documentCategory,
      documentSecurity: form.documentSecurity,
      status: 'Draft',
      workflowConfig: {
        id: uuid(),
        name: 'Ad-hoc document workflow',
        isDefault: false,
        steps: []
      },
      lifecycle: [
        {
          id: uuid(),
          stage: 'Drafting',
          status: 'Draft',
          updatedAt: now.toISOString(),
          actor: currentUser.name,
          role: currentUser.role
        }
      ],
      versions: [
        {
          id: uuid(),
          version: form.documentVersion,
          createdAt: now.toISOString(),
          changeSummary: 'Initial draft created within the DocumentManagement system.',
          signedOffBy: []
        }
      ],
      auditTrail: []
    };

    addDocument(document);
    logAuditEvent(document.id, {
      actor: currentUser.name,
      role: currentUser.role,
      action: 'Document Created',
      description: `${currentUser.name} created ${form.title} with number ${form.documentNumber}.`
    });
    setIsOpen(false);
    setForm({
      title: '',
      documentNumber: '',
      documentVersion: '0.1',
      documentType: documentTypes[0]?.type ?? 'Manual',
      documentCategory: '',
      documentSecurity: 'Confidential',
      dateOfIssue: '',
      issuedBy: currentUser.name,
      issuerRole: currentUser.role,
      effectiveFrom: '',
      nextReviewDate: ''
    });
    if (onCreated) onCreated(document);
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
        onClick={() => setIsOpen(true)}
      >
        Create Controlled Document
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-primary-200 bg-white p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">New Document Metadata</h2>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          Close
        </button>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Capture complete metadata to satisfy GMP, ISO 9001, and 21 CFR Part 11 traceability.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Document Title</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            required
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Document Number</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            required
            value={form.documentNumber}
            onChange={(event) => setForm((prev) => ({ ...prev, documentNumber: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Version</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            required
            value={form.documentVersion}
            onChange={(event) => setForm((prev) => ({ ...prev, documentVersion: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Document Type</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={form.documentType}
            onChange={(event) => setForm((prev) => ({ ...prev, documentType: event.target.value }))}
          >
            {documentTypes.map((type) => (
              <option key={type.id}>{type.type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            required
            value={form.documentCategory}
            onChange={(event) => setForm((prev) => ({ ...prev, documentCategory: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Security</label>
          <select
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={form.documentSecurity}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, documentSecurity: event.target.value as typeof prev.documentSecurity }))
            }
          >
            {documentSecurityOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date of Issue</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={form.dateOfIssue}
            onChange={(event) => setForm((prev) => ({ ...prev, dateOfIssue: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Issued By</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            required
            value={form.issuedBy}
            onChange={(event) => setForm((prev) => ({ ...prev, issuedBy: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Issuer Role</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            required
            value={form.issuerRole}
            onChange={(event) => setForm((prev) => ({ ...prev, issuerRole: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Effective From</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={form.effectiveFrom}
            onChange={(event) => setForm((prev) => ({ ...prev, effectiveFrom: event.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next Review Date</label>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={form.nextReviewDate}
            onChange={(event) => setForm((prev) => ({ ...prev, nextReviewDate: event.target.value }))}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3 text-sm">
        <button
          type="button"
          className="rounded-md border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-primary-700"
        >
          Register Document
        </button>
      </div>
    </form>
  );
};
