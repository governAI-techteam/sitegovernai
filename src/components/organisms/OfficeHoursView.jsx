'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { tokens } from '@/theme/tokens';
import { useIsMobile } from '@/hooks/useIsMobile';
import { OFFICE_HOURS_CONFIG } from '@/config/officeHours';

export function OfficeHoursView() {
  const isMobile = useIsMobile();
  const [selectedPass, setSelectedPass] = useState(OFFICE_HOURS_CONFIG.passes[1]); // default to Quarterly
  const [hoveredPass, setHoveredPass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState('details'); // 'details' | 'payment' | 'confirmed'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [bookingUrl, setBookingUrl] = useState('');
  const [selectedSlots, setSelectedSlots] = useState(['slot-1', 'slot-2', 'slot-3', 'slot-4']);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    query: '',
  });
  const [activeFaq, setActiveFaq] = useState(null);

  const maxSlots = selectedPass.id === 'quarterly' ? 4 : 2;

  const handleToggleSlot = (slotId) => {
    if (selectedSlots.includes(slotId)) {
      if (selectedSlots.length > 1) {
        setSelectedSlots(selectedSlots.filter((id) => id !== slotId));
      }
    } else {
      if (selectedSlots.length < maxSlots) {
        setSelectedSlots([...selectedSlots, slotId]);
      } else {
        setSelectedSlots([...selectedSlots.slice(1), slotId]);
      }
    }
  };

  const getBookingUrl = () => {
    return (
      OFFICE_HOURS_CONFIG.appointmentScheduleUrl ||
      'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2pwkMPc8fF26hw3igimTwQ0cHApf39Z6NHKbRfM02h4fpYmeZnQZnS0rRhvVi4VBcquveOrKhz?gv=true'
    );
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      if (typeof document === 'undefined') {
        resolve(false);
        return;
      }
      const existingScript = document.getElementById('razorpay-checkout-script');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(true));
        existingScript.addEventListener('error', () => resolve(false));
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOpenBooking = (pass) => {
    setSelectedPass(pass);
    setModalStep('details');
    setIsModalOpen(true);
    setCheckoutError(null);
    setIsPaying(false);
    setPaymentResult(null);
    setBookingUrl('');
    if (pass.id === 'quarterly') {
      setSelectedSlots(['slot-1', 'slot-2', 'slot-3', 'slot-4']);
    } else {
      setSelectedSlots(['slot-1', 'slot-3']);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setCheckoutError(null);
    setModalStep('payment');
  };

  const handleRazorpayCheckout = async () => {
    try {
      setCheckoutError(null);
      setIsPaying(true);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof window === 'undefined' || !window.Razorpay) {
        setCheckoutError('Payment gateway script failed to load. Please verify your internet connection and try again.');
        setIsPaying(false);
        return;
      }

      // Step 1: Create Order on backend (minimum 100 paise = ₹1)
      const amountInPaise = Math.round(Number(selectedPass.price) * 100);
      const orderRes = await fetch('/api/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pass_id: selectedPass.id,
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${selectedPass.id}_${Date.now()}`,
          notes: {
            pass_id: selectedPass.id,
            pass_title: selectedPass.title,
            officer_name: formData.name,
            officer_email: formData.email,
            officer_phone: formData.phone,
            department: formData.department || '',
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Failed to initialize payment order with server');
      }

      // Step 2: Open Razorpay modal with order_id
      const razorpayKey =
        orderData.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'GovernAI',
        description: `${selectedPass.title} · UP Govt Workflow Clinic`,
        order_id: orderData.order_id,
        image: 'https://governai.info/favicon.ico',
        prefill: {
          name: formData.name || '',
          email: formData.email || '',
          contact: formData.phone || '',
        },
        notes: {
          pass: selectedPass.title,
          department: formData.department || 'Not specified',
          sessions: selectedPass.sessionsLabel || '',
        },
        theme: {
          color: '#f16a24',
        },
        modal: {
          backdropclose: false,
          escape: true,
          handleback: true,
          ondismiss: function () {
            setIsPaying(false);
          },
        },
        handler: async function (response) {
          try {
            // response: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
            const verifyRes = await fetch('/api/verify-payment/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || verifyData.status !== 'success') {
              setCheckoutError(verifyData.error || 'Payment signature verification failed. Please contact support.');
              setIsPaying(false);
              return;
            }

            // Payment verified and signature matched
            setPaymentResult({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            const finalBookingUrl = getBookingUrl();
            setBookingUrl(finalBookingUrl);

            // Send confirmation email directly to the officer's inbox only after successful payment
            try {
              fetch('/api/send-confirmation/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  department: formData.department,
                  query: formData.query,
                  passTitle: selectedPass.title,
                  price: selectedPass.price,
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  bookingUrl: finalBookingUrl,
                }),
              }).catch(() => {});
            } catch {}

            setIsPaying(false);
            setModalStep('confirmed');
          } catch (verifyErr) {
            console.error('Payment verification error:', verifyErr);
            setCheckoutError(verifyErr.message || 'Payment verification encountered an unexpected error');
            setIsPaying(false);
          }
        },
      };

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on('payment.failed', function (failResponse) {
        console.error('Razorpay payment failed:', failResponse.error);
        const errMsg =
          failResponse.error?.description ||
          failResponse.error?.reason ||
          'Payment could not be completed. Please try again.';
        setCheckoutError(`Payment Failed: ${errMsg}`);
        setIsPaying(false);
      });

      rzpInstance.open();
    } catch (err) {
      console.error('Razorpay checkout error:', err);
      setCheckoutError(err.message || 'Unable to open checkout gateway. Please try again.');
      setIsPaying(false);
    }
  };

  return (
    <div style={{ background: '#fafbfc', minHeight: '100vh', paddingTop: isMobile ? 80 : 100 }}>
      {/* Header Section */}
      <header
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: isMobile ? '32px 20px 40px' : '52px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            opacity: 0.7,
          }}
        />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontFamily: tokens.fonts.display,
              fontSize: isMobile ? '28px' : 'clamp(34px, 4vw, 48px)',
              fontWeight: 800,
              color: tokens.onSurface,
              lineHeight: 1.18,
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
            }}
          >
            GovernAI Workflow Clinic:{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Practical AI Guidance &amp; Task Resolution
            </span>
          </h1>

          <p
            style={{
              fontSize: isMobile ? '14.5px' : '16.5px',
              lineHeight: 1.6,
              color: tokens.secondary,
              fontFamily: tokens.fonts.body,
              maxWidth: 720,
              margin: '0 auto 24px',
            }}
          >
            Direct interactive virtual sessions with our expert to address pre-submitted queries, provide an introduction to Agentic AI and Harness, and assist with institutional task Gen-AI Workflows.
          </p>

          {/* Quick Pillars Micro-Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: isMobile ? 8 : 16,
              fontSize: isMobile ? '12px' : '13px',
              color: '#64748b',
              fontFamily: tokens.fonts.body,
              fontWeight: 500,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              60-Minute Interactive Sessions
            </span>
            <span style={{ opacity: 0.4 }} aria-hidden="true">•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Dedicated Expert Guidance
            </span>
            <span style={{ opacity: 0.4 }} aria-hidden="true">•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Pre-Submitted Operational Agenda
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: 1040, margin: '0 auto', padding: isMobile ? '36px 18px 72px' : '52px 24px 90px' }}>
        
        {/* Pass Options Grid */}
        <section id="passes" aria-label="Available Passes" style={{ marginBottom: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: isMobile ? '24px' : '30px',
                fontWeight: 800,
                color: tokens.onSurface,
                letterSpacing: '-0.025em',
                margin: '0 0 8px',
              }}
            >
              Select Your Clinic Pass
            </h2>
            <p style={{ fontSize: '14.5px', color: tokens.secondary, fontFamily: tokens.fonts.body, margin: 0 }}>
              Structured 60-minute interactive sessions scheduled upon confirmation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '20px' : '28px',
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {OFFICE_HOURS_CONFIG.passes.map((pass) => {
              const isSelected = selectedPass.id === pass.id;
              const isHovered = hoveredPass === pass.id;
              const isActive = isSelected || isHovered;

              return (
                <div
                  key={pass.id}
                  onClick={() => setSelectedPass(pass)}
                  onMouseEnter={() => setHoveredPass(pass.id)}
                  onMouseLeave={() => setHoveredPass(null)}
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    border: isActive ? '2px solid #f16a24' : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: isActive
                      ? '0 16px 36px rgba(241, 106, 36, 0.14), 0 4px 12px rgba(0,0,0,0.04)'
                      : '0 4px 18px rgba(0,0,0,0.03)',
                    transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    padding: isMobile ? '26px 20px' : '34px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {/* Badge */}
                  <div style={{ marginBottom: 16 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 100,
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        background: isActive ? 'rgba(241, 106, 36, 0.12)' : '#f1f5f9',
                        color: isActive ? '#c2410c' : '#475569',
                        border: isActive ? '1px solid rgba(241, 106, 36, 0.25)' : '1px solid #e2e8f0',
                        fontFamily: tokens.fonts.body,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {pass.badge}
                    </span>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <h3
                      style={{
                        fontFamily: tokens.fonts.display,
                        fontSize: '22px',
                        fontWeight: 800,
                        color: tokens.onSurface,
                        margin: '0 0 4px 0',
                      }}
                    >
                      {pass.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: '#64748b', fontFamily: tokens.fonts.body }}>
                      {pass.duration}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                    <span
                      style={{
                        fontSize: '15px',
                        color: '#94a3b8',
                        textDecoration: 'line-through',
                        fontFamily: tokens.fonts.display,
                        fontWeight: 600,
                      }}
                    >
                      ₹{pass.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontFamily: tokens.fonts.display,
                        fontSize: '34px',
                        fontWeight: 800,
                        color: isActive ? '#ea580c' : tokens.onSurface,
                        letterSpacing: '-0.03em',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      ₹{pass.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#15803d',
                        background: '#dcfce7',
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      ₹{Math.round(pass.price / pass.sessionsCount).toLocaleString('en-IN')} / session
                    </span>
                  </div>

                  {/* Session Highlight */}
                  <div
                    style={{
                      background: isActive ? 'rgba(241, 106, 36, 0.08)' : '#f8fafc',
                      border: isActive ? '1px solid rgba(241, 106, 36, 0.25)' : '1px solid #e2e8f0',
                      borderRadius: 10,
                      padding: '10px 14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: isActive ? '#c2410c' : '#1e293b',
                      marginBottom: 18,
                      fontFamily: tokens.fonts.display,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {pass.sessionsLabel}
                  </div>

                  <p
                    style={{
                      fontSize: '13.5px',
                      color: tokens.secondary,
                      lineHeight: 1.55,
                      fontFamily: tokens.fonts.body,
                      marginBottom: 20,
                    }}
                  >
                    {pass.description}
                  </p>

                  {/* Feature Bullets */}
                  <div style={{ flex: 1, marginBottom: 26 }}>
                    <div
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#64748b',
                        marginBottom: 10,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      Session Inclusions:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {pass.features.map((feature, idx) => (
                        <li
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            fontSize: '13px',
                            color: '#334155',
                            lineHeight: 1.45,
                            fontFamily: tokens.fonts.body,
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isActive ? '#ea580c' : '#64748b'}
                            strokeWidth="2.8"
                            style={{ flexShrink: 0, marginTop: 2, transition: 'stroke 0.2s ease' }}
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenBooking(pass);
                    }}
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      borderRadius: 12,
                      background: isActive
                        ? 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)'
                        : '#191c1e',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: tokens.fonts.display,
                      boxShadow: isActive
                        ? '0 4px 16px rgba(241, 106, 36, 0.28)'
                        : '0 2px 10px rgba(0,0,0,0.08)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <span>{pass.ctaText}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Operational Flow: 4 Step Process Cards */}
        <section aria-label="Booking Process" style={{ marginBottom: 64 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: isMobile ? '22px' : '26px',
                fontWeight: 800,
                color: tokens.onSurface,
                letterSpacing: '-0.025em',
                margin: '0 0 6px',
              }}
            >
              How Booking &amp; Coordination Operates
            </h2>
            <p style={{ fontSize: '14px', color: tokens.secondary, fontFamily: tokens.fonts.body, margin: 0 }}>
              Transparent, automated dispatch directly to your official email.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: isMobile ? '14px' : '16px',
            }}
          >
            {[
              {
                step: '01',
                title: 'Pass Selection',
                desc: 'Choose your pass and submit your specific administrative task or query.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Secure Payment',
                desc: 'Complete payment at subsidized UP Govt rates via authorized gateway.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Email Dispatch',
                desc: 'Receive your private scheduling link and session calendar in your inbox.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                step: '04',
                title: 'Live 60-Min Session',
                desc: 'Connect live with our expert to resolve your submitted query and workflows.',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.06)',
                  padding: '22px 18px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(241, 106, 36, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: tokens.fonts.mono,
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#94a3b8',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: tokens.fonts.display,
                    fontSize: '15px',
                    fontWeight: 800,
                    color: tokens.onSurface,
                    margin: '0 0 6px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '12.5px',
                    lineHeight: 1.55,
                    color: tokens.secondary,
                    fontFamily: tokens.fonts.body,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2
              style={{
                fontFamily: tokens.fonts.display,
                fontSize: isMobile ? '22px' : '26px',
                fontWeight: 800,
                color: tokens.onSurface,
                letterSpacing: '-0.025em',
                margin: '0 0 6px',
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '14px', color: tokens.secondary, fontFamily: tokens.fonts.body, margin: 0 }}>
              Clear details on access, eligibility, and coordination.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {OFFICE_HOURS_CONFIG.faq.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: 12,
                    border: '1px solid rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: tokens.onSurface,
                      fontFamily: tokens.fonts.display,
                    }}
                  >
                    <span>{item.q}</span>
                    <span style={{ fontSize: 16, color: tokens.primary, fontWeight: 700 }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 16px',
                        fontSize: '13.5px',
                        lineHeight: 1.6,
                        color: tokens.secondary,
                        fontFamily: tokens.fonts.body,
                        borderTop: '1px solid rgba(0,0,0,0.04)',
                        paddingTop: 10,
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2000,
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                width: '100%',
                maxWidth: modalStep === 'confirmed' ? (isMobile ? '100%' : 780) : (modalStep === 'payment' ? 520 : 480),
                padding: isMobile ? '24px 20px' : '30px 28px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                position: 'relative',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#475569',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* STEP 1: Registration Details */}
              {modalStep === 'details' && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: tokens.primary,
                        marginBottom: 4,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      Step 1 of 2 · Pass Registration
                    </div>
                    <h3
                      style={{
                        fontFamily: tokens.fonts.display,
                        fontSize: '20px',
                        fontWeight: 800,
                        color: tokens.onSurface,
                        margin: '0 0 4px',
                      }}
                    >
                      {selectedPass.title} (UP Govt Revised Rate)
                    </h3>
                    <p style={{ fontSize: '13px', color: tokens.secondary, margin: 0, fontFamily: tokens.fonts.body }}>
                      ₹{selectedPass.price.toLocaleString('en-IN')} for {selectedPass.sessionsLabel}
                    </p>
                  </div>

                  <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 4, fontFamily: tokens.fonts.body }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Official Full Name"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid #cbd5e1',
                          fontSize: '13.5px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: tokens.fonts.body,
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 4, fontFamily: tokens.fonts.body }}>
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@dept.gov.in"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 8,
                            border: '1px solid #cbd5e1',
                            fontSize: '13.5px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontFamily: tokens.fonts.body,
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 4, fontFamily: tokens.fonts.body }}>
                          Mobile / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 8,
                            border: '1px solid #cbd5e1',
                            fontSize: '13.5px',
                            outline: 'none',
                            boxSizing: 'border-box',
                            fontFamily: tokens.fonts.body,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 4, fontFamily: tokens.fonts.body }}>
                        Department / Designation (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. Planning, Municipal Corp, IT Cell, etc."
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid #cbd5e1',
                          fontSize: '13.5px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: tokens.fonts.body,
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: 4, fontFamily: tokens.fonts.body }}>
                        Pre-Submit Task or Operational Query (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        placeholder="Outline the operational task, presentation requirement, or Agentic AI topic you wish to address..."
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid #cbd5e1',
                          fontSize: '13.5px',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    {/* Google Calendar Interactive Scheduling Notice */}
                    <div
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: 10,
                        padding: '12px 14px',
                        marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#0f172a',
                          marginBottom: 4,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontFamily: tokens.fonts.body,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f16a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Interactive Google Calendar Scheduling</span>
                      </div>
                      <p
                        style={{
                          fontSize: '11.5px',
                          color: '#64748b',
                          margin: 0,
                          lineHeight: 1.5,
                          fontFamily: tokens.fonts.body,
                        }}
                      >
                        {selectedPass.id === 'quarterly'
                          ? 'Quarterly Pass includes 12 interactive sessions (4 sessions/month). The live Google Calendar scheduler will open immediately upon payment verification to pick your preferred weekend dates and times.'
                          : 'Monthly Pass includes 2 scheduled 60-minute sessions. The live Google Calendar scheduler will open immediately upon payment verification to pick your preferred weekend dates and times.'}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '12px 18px',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.8 : 1,
                        fontFamily: tokens.fonts.display,
                        marginTop: 4,
                        boxShadow: '0 4px 14px rgba(241, 106, 36, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <span>Proceed to Payment (₹{selectedPass.price.toLocaleString('en-IN')})</span>
                      <span aria-hidden="true">→</span>
                    </button>

                    <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', fontFamily: tokens.fonts.body }}>
                      Registration is secured instantly. You will proceed directly to the payment and calendar access screen.
                    </div>
                  </form>
                </>
              )}

              {/* STEP 2: Secure Payment */}
              {modalStep === 'payment' && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: tokens.primary,
                        marginBottom: 4,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      Step 2 of 2 · Payment
                    </div>
                    <h3
                      style={{
                        fontFamily: tokens.fonts.display,
                        fontSize: '20px',
                        fontWeight: 800,
                        color: tokens.onSurface,
                        margin: '0 0 4px',
                      }}
                    >
                      Pass Payment
                    </h3>
                    <p style={{ fontSize: '13px', color: tokens.secondary, margin: 0, fontFamily: tokens.fonts.body }}>
                      Complete payment to unlock your session scheduling.
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: 12,
                      padding: '14px 16px',
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: tokens.fonts.display }}>
                        {selectedPass.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', fontFamily: tokens.fonts.body }}>
                        {formData.name ? `${formData.name} · ` : ''}{selectedPass.sessionsLabel}
                      </div>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', fontFamily: tokens.fonts.display }}>
                      ₹{selectedPass.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Payment Error Alert Banner */}
                  {checkoutError && (
                    <div
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: 8,
                        padding: '10px 14px',
                        marginBottom: 14,
                        fontSize: '12.5px',
                        color: '#991b1b',
                        lineHeight: 1.45,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      {checkoutError}
                    </div>
                  )}

                  {/* Primary Checkout Button */}
                  <button
                    type="button"
                    onClick={handleRazorpayCheckout}
                    disabled={isPaying}
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      borderRadius: 10,
                      background: isPaying
                        ? '#94a3b8'
                        : 'linear-gradient(135deg, #f16a24 0%, #ff8c42 100%)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: isPaying ? 'wait' : 'pointer',
                      fontFamily: tokens.fonts.display,
                      boxShadow: isPaying ? 'none' : '0 4px 14px rgba(241, 106, 36, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {isPaying ? (
                      <span>Connecting to Gateway...</span>
                    ) : (
                      <>
                        <span>Pay ₹{selectedPass.price.toLocaleString('en-IN')} via Razorpay</span>
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>

                  {/* Security Row without emojis */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      marginTop: 12,
                      fontSize: '11px',
                      color: '#64748b',
                      fontFamily: tokens.fonts.body,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>256-bit SSL encrypted</span>
                    <span>•</span>
                    <span>UPI, Cards &amp; NetBanking</span>
                  </div>

                  <div style={{ marginTop: 20, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
                    <button
                      type="button"
                      onClick={() => setModalStep('details')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '12px',
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: tokens.fonts.body,
                      }}
                    >
                      ← Back to Details
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3: Confirmed & Direct Google Calendar Access */}
              {modalStep === 'confirmed' && (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h3
                    style={{
                      fontFamily: tokens.fonts.display,
                      fontSize: '20px',
                      fontWeight: 800,
                      color: tokens.onSurface,
                      margin: '0 0 6px',
                    }}
                  >
                    Payment Verified &amp; Pass Activated
                  </h3>

                  {paymentResult?.paymentId && (
                    <div
                      style={{
                        display: 'inline-block',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#475569',
                        padding: '3px 10px',
                        borderRadius: 6,
                        fontSize: '11.5px',
                        fontFamily: tokens.fonts.mono,
                        marginBottom: 10,
                      }}
                    >
                      Transaction ID: {paymentResult.paymentId}
                    </div>
                  )}

                  <p style={{ fontSize: '13px', color: tokens.secondary, lineHeight: 1.5, marginBottom: 14, fontFamily: tokens.fonts.body }}>
                    Thank you, <strong>{formData.name || 'Officer'}</strong>. Your <strong>{selectedPass.title}</strong> is active. Please select your preferred session dates and times below directly on the official Google Calendar scheduler.
                  </p>

                  {/* Interactive Google Calendar Appointment Scheduler Embedded */}
                  <div
                    style={{
                      width: '100%',
                      height: isMobile ? 500 : 580,
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      overflow: 'hidden',
                      background: '#ffffff',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      marginBottom: 14,
                    }}
                  >
                    <iframe
                      src={OFFICE_HOURS_CONFIG.appointmentScheduleUrl}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      title="Google Calendar Appointment Scheduling"
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 16,
                      flexWrap: 'wrap',
                      marginBottom: 16,
                    }}
                  >
                    <a
                      href={OFFICE_HOURS_CONFIG.appointmentScheduleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '12.5px',
                        fontWeight: 700,
                        color: tokens.primary,
                        textDecoration: 'none',
                        fontFamily: tokens.fonts.display,
                      }}
                    >
                      <span>Open Calendar in Full Window</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                    <span style={{ color: '#cbd5e1' }}>•</span>
                    <span style={{ fontSize: '12px', color: '#64748b', fontFamily: tokens.fonts.body }}>
                      A private scheduling link has also been sent to <strong>{formData.email}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '8px 24px',
                      borderRadius: 8,
                      background: '#191c1e',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: tokens.fonts.body,
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
