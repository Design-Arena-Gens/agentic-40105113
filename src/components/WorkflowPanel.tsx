'use client';

import { format } from 'date-fns';
import clsx from 'clsx';
import type { DocumentRecord, WorkflowTask } from '@/types/documents';
import { useDocumentContext } from '@/lib/state';
import { useCurrentPermissions } from '@/lib/permissions';

interface WorkflowPanelProps {
  document: DocumentRecord;
  onTaskComplete: (taskId: string) => void;
}

const statusColors: Record<WorkflowTask['status'], string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Completed: 'bg-emerald-100 text-emerald-700'
};

export const WorkflowPanel = ({ document, onTaskComplete }: WorkflowPanelProps) => {
  const { workflowTasks } = useDocumentContext();
  const permissions = useCurrentPermissions();
  const tasks = workflowTasks[document.id] ?? [];
  const canManageWorkflow = permissions.includes('manage:workflow');

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">{task.stage}</p>
              <p className="text-xs text-slate-500">
                {task.role} · {task.assignedTo}
              </p>
            </div>
            <span className={clsx('rounded-full px-2 py-1 text-xs font-semibold', statusColors[task.status])}>
              {task.status}
            </span>
          </div>
          <div className="mt-2 flex flex-col gap-2 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <span>Due {format(new Date(task.dueDate), 'dd MMM yyyy')}</span>
            {task.signatureId && <span>Signed · {task.signatureId}</span>}
            {canManageWorkflow && task.status === 'Pending' && (
              <button
                className="rounded-md border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-100"
                onClick={() => onTaskComplete(task.id)}
                type="button"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
          Workflow not configured. Configure workflow templates to automate review cycles.
        </p>
      )}
    </div>
  );
};
