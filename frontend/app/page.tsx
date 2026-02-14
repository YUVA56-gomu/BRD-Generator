import Link from 'next/link';
import Button from '@/components/Common/Button';
import { ArrowRight, Zap, FileText, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">BRD Gen</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold text-secondary-900">
            AI-Powered Business Requirements
          </h2>
          <p className="text-xl text-secondary-600">
            Transform your communication into structured, professional BRDs in minutes
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg">
                Start Free Trial
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center text-secondary-900 mb-12">
          Powerful Features
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-secondary-200">
            <Zap className="text-primary-600 mb-4" size={32} />
            <h4 className="text-lg font-semibold text-secondary-900 mb-2">
              Multi-Source Ingestion
            </h4>
            <p className="text-secondary-600">
              Upload documents, paste emails, Slack messages, and meeting transcripts
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-secondary-200">
            <Brain className="text-primary-600 mb-4" size={32} />
            <h4 className="text-lg font-semibold text-secondary-900 mb-2">
              AI Extraction
            </h4>
            <p className="text-secondary-600">
              Automatically extract requirements, stakeholders, risks, and timelines
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-secondary-200">
            <FileText className="text-primary-600 mb-4" size={32} />
            <h4 className="text-lg font-semibold text-secondary-900 mb-2">
              BRD Generation
            </h4>
            <p className="text-secondary-600">
              Generate professional, structured BRDs with natural language editing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
