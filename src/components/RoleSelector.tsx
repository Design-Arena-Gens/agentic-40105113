'use client';

import { useMemo } from 'react';
import { useDocumentContext } from '@/lib/state';

export const RoleSelector = () => {
  const { users, currentUser, setCurrentUser } = useDocumentContext();

  const groupedByRole = useMemo(() => {
    return users.reduce<Record<string, typeof users>>((acc, user) => {
      acc[user.role] = acc[user.role] ? [...acc[user.role], user] : [user];
      return acc;
    }, {});
  }, [users]);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Acting as
      </label>
      <select
        className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        value={currentUser.name}
        onChange={(event) => {
          const profile = users.find((user) => user.name === event.target.value);
          if (!profile) return;
          setCurrentUser({ id: profile.id, name: profile.name, role: profile.role });
        }}
      >
        {Object.entries(groupedByRole).map(([role, members]) => (
          <optgroup key={role} label={role}>
            {members.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
