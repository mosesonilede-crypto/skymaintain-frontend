"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function BecomePartnerPage() {
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        companyWebsite: "",
        industryFocus: "",
        partnershipType: "",
        companyDescription: "",
        relevantExperience: "",
        partnershipsInterest: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                companyName: "",
                contactName: "",
                email: "",
                phone: "",
                companyWebsite: "",
                industryFocus: "",
                partnershipType: "",
                companyDescription: "",
                relevantExperience: "",
                partnershipsInterest: "",
            });
        }, 3000);
    };

    const faqs = [
        {
            question: "What types of partnerships does SkyMaintain offer?",
            answer: "SkyMaintain partners with aviation industry vendors, service providers, and technology companies that can add value to our maintenance community. We evaluate partnerships based on industry relevance, quality standards, and alignment with our mission to support safe, compliant aircraft maintenance.",
        },
        {
            question: "How long does the partnership review process take?",
            answer: "After submitting your application, our partnership team will review your information within 2-3 business weeks. If we see a good fit, we'll contact you to discuss partnership opportunities and terms.",
        },
        {
            question: "Are there sponsorship or advertising options?",
            answer: "Yes. We offer sponsored content opportunities, product integrations, and co-marketing initiatives. The specific options depend on your company profile and partnership goals. Our team will discuss available options after your application review.",
        },
        {
            question: "Does partnership influence SkyMaintain's AI recommendations?",
            answer: "No. Partnership status has no influence on SkyMaintain's AI responses, maintenance recommendations, or compliance assessments. All partnerships are clearly disclosed as sponsored content, and our core platform functionality remains unaffected.",
        },
        {
            question: "What industries do you partner with?",
            answer: "We partner with companies in aviation maintenance, aircraft parts and components, maintenance software and tools, training and certification, regulatory consulting, and related aviation support services.",
        },
    ];

    return (
        <div className="w-full bg-white">
            {/* Header */}
            <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 bg-white border-b border-gray-200" style={{ height: "80.8px" }}>
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-lg" style={{
                        width: "48px",
                        height: "48px",
                        background: "linear-gradient(135deg, #155dfc 0%, #1447e6 100%)",
                    }}>
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div>
                        <p className="font-bold text-[#101828]">SkyMaintain</p>
                        <p className="text-xs text-[#4a5565]">Regulatory-Compliant AI Platform</p>
                    </div>
                </Link>
                <Link href="/" className="text-[#155dfc] hover:text-[#1447e6] font-medium">
                    Back to Home
                </Link>
            </header>

            {/* Hero Section */}
            <section className="pt-[80.8px] px-6 py-20 bg-gradient-to-b from-[#eff6ff] to-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#101828] mb-6">
                        Become a SkyMaintain Partner
                    </h1>
                    <p className="text-xl text-[#364153] mb-8">
                        Join our network of industry leaders and reach aviation maintenance professionals worldwide. We partner with companies that share our commitment to safe, compliant, and efficient aircraft maintenance.
                    </p>
                </div>
            </section>

            {/* Application Form Section */}
            <section className="px-6 py-16">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-[#101828] mb-8">Partnership Application</h2>

                        {submitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                <h3 className="text-lg font-bold text-green-900 mb-2">Thank You!</h3>
                                <p className="text-green-700">
                                    Your partnership application has been submitted successfully. Our team will review your information and contact you within 2-3 business weeks.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Row 1: Company Name & Contact Name */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#101828] mb-2">
                                            Company Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your company name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#101828] mb-2">
                                            Contact Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your full name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Email & Phone */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#101828] mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your@email.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#101828] mb-2">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                        />
                                    </div>
                                </div>

                                {/* Company Website */}
                                <div>
                                    <label className="block text-sm font-medium text-[#101828] mb-2">
                                        Company Website
                                    </label>
                                    <input
                                        type="url"
                                        name="companyWebsite"
                                        value={formData.companyWebsite}
                                        onChange={handleInputChange}
                                        placeholder="https://yourcompany.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                    />
                                </div>

                                {/* Partnership Type */}
                                <div>
                                    <label className="block text-sm font-medium text-[#101828] mb-2">
                                        Partnership Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="partnershipType"
                                        value={formData.partnershipType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                    >
                                        <option value="">Select partnership type</option>
                                        <option value="technology">Technology Integration</option>
                                        <option value="content">Content/Knowledge Partner</option>
                                        <option value="services">Services/Solutions</option>
                                        <option value="training">Training & Certification</option>
                                        <option value="reseller">Reseller/Distribution</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Industry Focus */}
                                <div>
                                    <label className="block text-sm font-medium text-[#101828] mb-2">
                                        Industry Focus <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="industryFocus"
                                        value={formData.industryFocus}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g., Aircraft Parts, Maintenance Software, Training Services"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                    />
                                </div>

                                {/* Company Description */}
                                <div>
                                    <label className="block text-sm font-medium text-[#101828] mb-2">
                                        Company Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="companyDescription"
                                        value={formData.companyDescription}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Tell us about your company and what you do"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                    />
                                </div>

                                {/* Relevant Experience */}
                                <div>
                                    <label className="block text-sm font-medium text-[#101828] mb-2">
                                        Relevant Aviation Industry Experience <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="relevantExperience"
                                        value={formData.relevantExperience}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Describe your experience in aviation maintenance, compliance, or related fields"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                    />
                                </div>

                                {/* Partnership Interest */}
                                <div>
                                    <label className="block text-sm font-medium text-[#101828] mb-2">
                                        How would you like to partner with SkyMaintain?
                                    </label>
                                    <textarea
                                        name="partnershipsInterest"
                                        value={formData.partnershipsInterest}
                                        onChange={handleInputChange}
                                        placeholder="Describe your partnership goals and vision"
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#155dfc]"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#155dfc] text-white font-medium py-3 rounded-lg hover:bg-[#1447e6] transition-colors"
                                >
                                    Submit Application
                                </button>

                                <p className="text-xs text-[#6a7282] text-center">
                                    By submitting this form, you agree to be contacted regarding partnership opportunities.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Partnership Benefits Section */}
            <section className="px-6 py-16 bg-[#f9fafb]">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#101828] mb-12 text-center">Why Partner With SkyMaintain?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Reach", description: "Access to a growing community of aviation maintenance professionals" },
                            { title: "Trust", description: "Association with a regulatory-compliant, industry-trusted platform" },
                            { title: "Integration", description: "Opportunities to integrate your solutions into the SkyMaintain platform" },
                            { title: "Co-Marketing", description: "Joint marketing and promotional opportunities" },
                            { title: "Support", description: "Dedicated partnership support and strategic planning" },
                            { title: "Growth", description: "Scale your business with access to a targeted aviation audience" },
                        ].map((benefit, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200">
                                <h3 className="font-bold text-[#101828] mb-2">{benefit.title}</h3>
                                <p className="text-[#364153]">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-[#101828] mb-12 text-center">Partnership FAQs</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <h3 className="font-medium text-[#101828] text-left">{faq.question}</h3>
                                    {expandedFaq === idx ? (
                                        <ChevronUp className="h-5 w-5 text-[#155dfc] flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-[#155dfc] flex-shrink-0" />
                                    )}
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-6 py-4 bg-[#f9fafb] border-t border-gray-200">
                                        <p className="text-[#364153]">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 py-16 bg-gradient-to-r from-[#155dfc] to-[#1447e6] text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to explore partnership opportunities?
                    </h2>
                    <p className="text-white/90 mb-8">
                        Fill out the form above, and our partnership team will be in touch soon.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#101828] text-white px-6 py-12">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
                    <p className="text-sm text-gray-400">
                        © 2026 SkyMaintain. All rights reserved. | SkyMaintain is a product of EncycloAMTs LLC.
                    </p>
                </div>
            </footer>
        </div>
    );
}
