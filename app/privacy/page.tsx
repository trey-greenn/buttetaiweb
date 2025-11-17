'use client';

import React from 'react';
import Link from 'next/link';

function PrivacyPolicy() {
  return (
    <div className="bg-[#f9f7f1] text-[#2f2f2f] font-serif min-h-screen p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair font-black text-5xl md:text-6xl uppercase text-center mb-8">Privacy Policy</h1>
        <div className="uppercase border-b-2 border-t-2 border-[#2f2f2f] text-2xl md:text-3xl py-3 text-center mb-10">
          Last Updated: November 17, 2025
        </div>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">1. Introduction</h2>
          <p className="mb-4">Welcome to BuffetAI ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
          <p className="mb-4">Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">2. Information We Collect</h2>
          
          <h3 className="font-playfair font-bold text-xl mb-3">2.1 Personal Information</h3>
          <p className="mb-4">We may collect personal information that you voluntarily provide to us when you register for an account, subscribe to our services, or otherwise contact us. This information may include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Payment information</li>
            <li>Account preferences</li>
            <li>Content preferences for newsletter curation</li>
          </ul>
          
          <h3 className="font-playfair font-bold text-xl mb-3">2.2 Usage Data</h3>
          <p className="mb-4">We automatically collect certain information when you visit, use, or navigate our website. This information may include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Device and browser information</li>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Referring website</li>
            <li>Interactions with our services</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process payments and manage your account</li>
            <li>Personalize your experience with our AI tools</li>
            <li>Communicate with you about updates, promotions, and support</li>
            <li>Analyze usage patterns to enhance our offerings</li>
            <li>Protect against fraud and unauthorized access</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">4. Sharing Your Information</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Service Providers:</strong> Third parties that help us deliver our services (payment processors, hosting providers, etc.)</li>
            <li><strong>Business Partners:</strong> With your consent, we may share information with our business partners</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
          <p className="mb-4">We do not sell your personal information to third parties.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">5. Data Security</h2>
          <p className="mb-4">We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">6. Cookies and Tracking Technologies</h2>
          <p className="mb-4">We use cookies and similar tracking technologies to enhance your experience on our website. You can set your browser to refuse all or some browser cookies, but this may affect certain features of our site.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">7. Your Privacy Rights</h2>
          <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Right to access your personal data</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to request deletion of your data</li>
            <li>Right to restrict processing of your data</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p className="mb-4">To exercise these rights, please contact us using the information provided below.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">8. Children's Privacy</h2>
          <p className="mb-4">Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
        </section>
        
        <section className="mb-8">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">9. Changes to This Privacy Policy</h2>
          <p className="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        </section>
        
        <section className="mb-12">
          <h2 className="font-playfair font-bold text-2xl md:text-3xl mb-4">10. Contact Us</h2>
          <p className="mb-4">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
          <p className="font-bold mb-1">Email: info@williamtreygreen.com</p>
          <p className="font-bold">Address: [Your Company Address]</p>
        </section>
        
        <div className="border-t-2 border-[#2f2f2f] pt-6 text-center">
          <Link href="/" className="inline-block border-2 border-double border-[#2f2f2f] px-4 py-2 text-sm font-bold hover:bg-[#2f2f2f] hover:text-[#f9f7f1] transition-colors">
            RETURN TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;