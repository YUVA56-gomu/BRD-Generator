'use client';

import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export default function Tabs({ tabs, activeTab, onTabChange, children }: TabsProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-secondary-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              'px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 -mb-px',
              activeTab === tab.id
                ? 'text-primary-600 border-primary-600'
                : 'text-secondary-600 border-transparent hover:text-secondary-900'
            )}
          >
            {tab.icon && <span className="inline-block mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
