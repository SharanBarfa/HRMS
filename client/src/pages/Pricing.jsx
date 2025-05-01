import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses just getting started',
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      features: [
        'Up to 25 employees',
        'Basic employee profiles',
        'Time & attendance tracking',
        'Leave management',
        'Email support',
        'Mobile app access'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses with advanced needs',
      monthlyPrice: 19.99,
      annualPrice: 15.99,
      features: [
        'Up to 100 employees',
        'Advanced employee profiles',
        'Time & attendance tracking',
        'Leave management',
        'Performance management',
        'Department management',
        'Basic reporting',
        'Priority email support',
        'Mobile app access'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for large organizations',
      monthlyPrice: 39.99,
      annualPrice: 31.99,
      features: [
        'Unlimited employees',
        'Advanced employee profiles',
        'Time & attendance tracking',
        'Leave management',
        'Performance management',
        'Department management',
        'Advanced reporting & analytics',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Phone & email support',
        'Mobile app access'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'Our free trial gives you full access to all features of your selected plan for 14 days. No credit card required. At the end of the trial, you can choose to subscribe or your account will automatically downgrade to a limited free version.'
    },
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be immediately available. When downgrading, the changes will take effect at the start of your next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees for any of our plans. You only pay the subscription fee for your selected plan.'
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer: 'Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I get a demo before deciding?',
      answer: 'Absolutely! You can schedule a personalized demo with our team who will walk you through the platform and answer any questions you may have.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-indigo-700 text-white shadow-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">ERM System</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Home</Link>
              <Link to="/features" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Features</Link>
              <Link to="/pricing" className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-800">Pricing</Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Contact</Link>
              <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-100">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-indigo-800 text-white hover:bg-indigo-900">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-indigo-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Choose the plan that's right for your business. All plans include a 14-day free trial.</p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 text-lg ${!annual ? 'font-semibold' : ''}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)} 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${annual ? 'bg-indigo-200' : 'bg-gray-200'}`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} 
              />
            </button>
            <span className={`ml-3 text-lg ${annual ? 'font-semibold' : ''}`}>Annual <span className="text-indigo-200 text-sm">(Save 20%)</span></span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden border ${plan.popular ? 'border-indigo-500 transform scale-105 md:scale-110' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="bg-indigo-500 text-white text-center py-2 px-4">
                    <p className="text-sm font-semibold">MOST POPULAR</p>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  {annual && (
                    <p className="text-sm text-indigo-600 mt-1">Billed annually (${(plan.annualPrice * 12).toFixed(2)})</p>
                  )}
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      to={plan.cta === 'Contact Sales' ? '/contact' : '/register'}
                      className={`block w-full text-center px-6 py-3 rounded-md shadow font-medium text-white ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 lg:flex lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">Need a custom solution?</h3>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl">
                  We offer tailored solutions for organizations with specific requirements. Our team will work with you to create a custom plan that meets your unique needs.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Contact Our Sales Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600">Have questions? We've got answers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Try our 14-day free trial. No credit card required.</p>
          <Link to="/register" className="px-8 py-4 bg-white text-indigo-600 rounded-md font-medium text-lg hover:bg-gray-100 inline-block">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ERM System</h3>
              <p className="text-gray-400">Simplifying employee management for businesses worldwide.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">info@shantiinfosoft.com</li>
                <li className="text-gray-400">+91 8815531673</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ERM System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
