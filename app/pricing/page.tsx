import React from 'react';
import Link from 'next/link';
import CheckoutButton from '@/app/components/pricing/CheckoutButton';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      features: [
        'Basic AI letter generation',
        'Up to 3 topics per letter',
        '7 Day Tools Trial ',
        'Standard templates',
      ],
      cta: 'Get Started',
      ctaLink: '/signup',
      popular: false
    },
    {
      name: 'Pro',
      price: '8.99',
      features: [
        'Advanced AI letter generation',
        'Unlimited topics per letter',
        'Email Optionality',
        'Daily delivery',
        'Premium templates',
        'Priority email support',
        'AI Assitant Agent Tool',
        'AI Image Generation'
      ],
      cta: 'Subscribe Now',
      ctaLink: '/signup?plan=pro',
      popular: true
    },
    {
      name: 'Plus',
      price: '18.99',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom AI training',
        'API access',
        'Customized SSO integration',
        'Customized Dashboard',
        'SLA guarantees',
        "Full Access to Apps"
      ],
      cta: 'Subscribe Now',
      ctaLink: '/signup?plan=plus',
      popular: false
    }
  ];

  return (
    <div className="bg-[#f5f0e1] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#5e503f] mb-4">
            Choose Your Plan
          </h1>
          <p className="text-[#403d39] max-w-3xl mx-auto text-lg">
            BuffettAI offers flexible plans to meet your needs. All plans include our core newsletter generation capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 relative ${
                plan.popular ? 'ring-2 ring-[#7e6551] transform scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#7e6551] text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#5e503f] mb-4">{plan.name}</h2>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#5e503f]">
                    {plan.price === 'Contact Sales' ? '' : '$'}
                  </span>
                  <span className="text-4xl font-bold text-[#5e503f]">
                    {plan.price}
                  </span>
                  {plan.price !== 'Contact Sales' && (
                    <span className="text-[#403d39] ml-1">/year</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-[#7e6551] mr-2 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-[#403d39]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.name === 'Free' ? (
                  <Link
                    href={plan.ctaLink}
                    className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                      plan.popular
                        ? 'bg-[#5e503f] text-white hover:bg-[#403d39]'
                        : 'bg-[#ccc5b9] text-[#5e503f] hover:bg-[#bebab3]'
                    } transition`}
                  >
                    {plan.cta}
                  </Link>
                ) : plan.name === 'Pro' ? (
                  <CheckoutButton label={plan.cta} plan="pro" />
                ) : plan.name === 'Plus' ? (
                  <CheckoutButton label={plan.cta} plan="plus" />
                ) : (
                  <Link
                    href={plan.ctaLink}
                    className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
                      plan.popular
                        ? 'bg-[#5e503f] text-white hover:bg-[#403d39]'
                        : 'bg-[#ccc5b9] text-[#5e503f] hover:bg-[#bebab3]'
                    } transition`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#5e503f] mb-4">
            Need Something Different?
          </h2>
          <p className="text-[#403d39] mb-6">
            We offer custom solutions for teams and businesses with specific needs. 
            Contact our sales team to discuss your requirements.
          </p>
          <Link
            href="/contact"
            className="inline-block py-3 px-6 rounded-md font-medium bg-[#5e503f] text-white hover:bg-[#403d39] transition"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}