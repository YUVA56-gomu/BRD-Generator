'use client';

import MainLayout from '@/components/Layout/MainLayout';
import Card from '@/components/Common/Card';
import Button from '@/components/Common/Button';
import { Mail, MessageSquare, CheckCircle } from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      name: 'Gmail',
      description: 'Connect your Gmail account to automatically ingest emails',
      icon: Mail,
      connected: false,
    },
    {
      name: 'Slack',
      description: 'Connect your Slack workspace to import messages and threads',
      icon: MessageSquare,
      connected: false,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Integrations</h1>
          <p className="text-secondary-600 mt-1">Connect your tools to BRD Generator</p>
        </div>

        {/* Integrations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.name} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Icon size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {integration.name}
                      </h3>
                      <p className="text-sm text-secondary-500 mt-1">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  {integration.connected && (
                    <CheckCircle size={24} className="text-green-600" />
                  )}
                </div>

                <div className="pt-4 border-t border-secondary-200">
                  <Button
                    variant={integration.connected ? 'secondary' : 'primary'}
                    className="w-full"
                  >
                    {integration.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Coming Soon */}
        <Card className="p-8 bg-primary-50 border-primary-200">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">More Integrations Coming Soon</h3>
          <p className="text-secondary-600">
            We're working on integrations with Microsoft Teams, Google Drive, Notion, and more.
          </p>
        </Card>
      </div>
    </MainLayout>
  );
}
