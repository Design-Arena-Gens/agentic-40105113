'use client';

import { FormEvent, useState } from 'react';
import { useDocumentContext } from '@/lib/state';

interface SignatureDialogProps {
  versionLabel: string;
  onClose: () => void;
  onSigned: (payload: { meaning: 'Review' | 'Approval' | 'Execution'; justification: string }) => void;
}

export const SignatureDialog = ({ versionLabel, onClose, onSigned }: SignatureDialogProps) => {
  const { currentUser, users } = useDocumentContext();
  const [meaning, setMeaning] = useState<'Review' | 'Approval' | 'Execution'>('Approval');
  const [justification, setJustification] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const verifyPin = () => {
    const record = users.find((user) => user.name === currentUser.name);
    if (!record) {
      setError('Current user not registered for e-signature.');
      return false;
    }
    if (record.pin !== pin) {
      setError('Invalid PIN. Electronic signatures require correct two-factor credentials.');
      return false;
    }
    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!justification.trim()) {
      setError('Provide justification for the signature to maintain traceability.');
      return;
    }
    if (!verifyPin()) {
      return;
    }
    onSigned({ meaning, justification });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 className="text-lg font-semibold text-slate-800">Apply Electronic Signature</h2>
        <p className="mt-1 text-sm text-slate-500">
          21 CFR Part 11 requires authentication and justification for each electronic signature.
        </p>
        <dl className="mt-4 space-y-1 text-sm text-slate-600">
          <div className="flex justify-between">
            <dt className="font-medium text-slate-700">Signer</dt>
            <dd>{currentUser.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-slate-700">Role</dt>
            <dd>{currentUser.role}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="font-medium text-slate-700">Version</dt>
            <dd>{versionLabel}</dd>
          </div>
        </dl>
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Signature Meaning</label>
            <select
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              value={meaning}
              onChange={(event) => setMeaning(event.target.value as typeof meaning)}
            >
              <option value="Review">Review</option>
              <option value="Approval">Approval</option>
              <option value="Execution">Execution</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Justification</label>
            <textarea
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              rows={3}
              value={justification}
              onChange={(event) => setJustification(event.target.value)}
              placeholder="Summarize the review decision, approvals, or reason for execution."
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">PIN</label>
            <input
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="Enter assigned 4-digit PIN"
            />
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-critical">{error}</p>}
        <div className="mt-6 flex justify-end gap-3 text-sm">
          <button
            type="button"
            className="rounded-md border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Sign and Commit
          </button>
        </div>
      </form>
    </div>
  );
};
