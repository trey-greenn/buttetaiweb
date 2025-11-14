import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Support</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">
            If you have any questions, feedback, or need assistance with BuffetAI, our team is here to help.
          </p>
          <p className="mb-4">
            Email: <a href="mailto:support@buffetai.com" className="text-blue-600 hover:underline">support@buffetai.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">What is BuffetAI?</h3>
              <p>
                BuffetAI is a personalized AI newsletter tool that helps you curate, summarize, and learn from content that matters to you.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">How do I get started?</h3>
              <p>
                Sign up for an account, set up your preferences, and BuffetAI will start delivering personalized content directly to your inbox.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">How do I manage my subscription?</h3>
              <p>
                You can manage your subscription settings from your dashboard. Visit the <Link href="/dashboard" className="text-blue-600 hover:underline">dashboard</Link> to change your preferences or billing information.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">How do I cancel my subscription?</h3>
              <p>
                You can cancel your subscription at any time from your account settings in the dashboard. If you need assistance, please contact our support team.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="mb-2">
            We take your privacy seriously. To learn more about how we collect, use, and protect your personal information, please review our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
          <p className="mb-2">
            By using BuffetAI, you agree to our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}