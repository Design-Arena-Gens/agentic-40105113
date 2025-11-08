'use client';

import { FormEvent, useState } from 'react';
import { useDocumentContext } from '@/lib/state';

export const DocumentTypeManager = () => {
  const { documentTypes, addDocumentType } = useDocumentContext();
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!type.trim()) return;
    addDocumentType({ type, description });
    setType('');
    setDescription('');
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Document Types</h2>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {documentTypes.length} types
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Maintain controlled vocabularies for manuals, SOPs, policies, and templates to meet ISO 9001.
      </p>

      <div className="mt-4 space-y-3">
        {documentTypes.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-sm font-semibold text-slate-700">{item.type}</p>
            <p className="text-xs text-slate-500">{item.description}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-sm">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Type</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            value={type}
            onChange={(event) => setType(event.target.value)}
            placeholder="e.g., Batch Record"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="How this document type is used in GMP operations"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-primary-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Add Type
          </button>
        </div>
      </form>
    </div>
  );
};
