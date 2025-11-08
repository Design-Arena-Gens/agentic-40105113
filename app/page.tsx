'use client';

import { useEffect, useMemo, useState } from 'react';
import { DocumentProvider, useDocumentContext } from '@/lib/state';
import { RoleSelector } from '@/components/RoleSelector';
import { ComplianceSummary } from '@/components/ComplianceSummary';
import { DocumentFilters } from '@/components/DocumentFilters';
import { DocumentTable } from '@/components/DocumentTable';
import { DocumentDetail } from '@/components/DocumentDetail';
import { DocumentCreationForm } from '@/components/DocumentCreationForm';
import { DocumentTypeManager } from '@/components/DocumentTypeManager';
import type { DocumentRecord } from '@/types/documents';

const PageContent = () => {
  const { documents } = useDocumentContext();
  const [filters, setFilters] = useState({ search: '', type: 'All', security: 'All', status: 'All' });
  const [selectedDocument, setSelectedDocument] = useState<DocumentRecord | null>(documents[0] ?? null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch =
        !filters.search ||
        document.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        document.documentNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        document.createdBy.toLowerCase().includes(filters.search.toLowerCase()) ||
        document.documentCategory.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'All' || document.documentType === filters.type;
      const matchesSecurity = filters.security === 'All' || document.documentSecurity === filters.security;
      const matchesStatus = filters.status === 'All' || document.status === filters.status;
      return matchesSearch && matchesType && matchesSecurity && matchesStatus;
    });
  }, [documents, filters]);

  useEffect(() => {
    if (selectedDocument && documents.some((doc) => doc.id === selectedDocument.id)) return;
    setSelectedDocument(documents[0] ?? null);
  }, [documents, selectedDocument]);

  const handleSelect = (doc: DocumentRecord) => {
    setSelectedDocument(doc);
  };

  const handleCreated = (doc: DocumentRecord) => {
    setSelectedDocument(doc);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-12">
      <header className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-primary-50 via-white to-emerald-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">DocumentManagement</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Pharmaceutical-grade document management with electronic signatures, audit trails, and GMP aligned
              workflows to support global regulations (21 CFR Part 11, ISO 9001, ICH Q7, GMP).
            </p>
          </div>
          <RoleSelector />
        </div>
        <ComplianceSummary />
      </header>

      <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Controlled Document Register</h2>
            <p className="text-sm text-slate-500">
              Centralized register with version control, lifecycle visibility, and role-based access safeguards.
            </p>
          </div>
          <DocumentCreationForm onCreated={handleCreated} />
        </div>
        <DocumentFilters onFilterChange={setFilters} />
        <DocumentTable
          documents={filteredDocuments}
          selectedId={selectedDocument?.id}
          onSelect={handleSelect}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {selectedDocument ? (
            <DocumentDetail document={selectedDocument} />
          ) : (
            <p className="text-sm text-slate-500">
              Select a document to inspect lifecycle events, workflow progression, and audit trail information.
            </p>
          )}
        </div>
        <DocumentTypeManager />
      </section>
    </div>
  );
};

export default function HomePage() {
  return (
    <DocumentProvider>
      <PageContent />
    </DocumentProvider>
  );
}
