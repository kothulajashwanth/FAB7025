import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Download,
  Copy,
  Check,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PaymentModal({ isOpen, onClose, planData }) {
  const { theme, workspaceProfile, userRole } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('qr'); // 'qr' | 'card' | 'netbanking'
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [paymentState, setPaymentState] = useState('checkout'); // 'checkout' | 'verifying' | 'success'

  if (!isOpen) return null;

  const planName = planData?.name || 'Pro Enterprise';
  const rawPrice = planData?.priceNum || (planName === 'Starter' ? 499 : planName === 'Pro Enterprise' ? 1499 : 4999);
  const gstAmount = Math.round(rawPrice * 0.18);
  const totalAmountINR = rawPrice + gstAmount;

  const upiId = `teamos.ai@okaxis`;
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}%26pn=TeamOS%20AI%20Inc%26am=${totalAmountINR}%26cu=INR%26tn=TeamOS%20${encodeURIComponent(planName)}%20Subscription`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSimulatePayment = (method = paymentMethod, bankName = selectedBank) => {
    if (method) setPaymentMethod(method);
    if (bankName) setSelectedBank(bankName);
    setPaymentState('verifying');
    setTimeout(() => {
      setPaymentState('success');
    }, 1500);
  };

  const handlePrintPDFReceipt = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('Please allow popups to download and print PDF receipts.');
      return;
    }

    const txnId = paymentMethod === 'qr' ? `UPI-${Date.now()}` : paymentMethod === 'card' ? `STRIPE-${Date.now()}` : `RZR-${Date.now()}`;
    const channelName = paymentMethod === 'qr' ? 'UPI QR Scanner (GPay / PhonePe / Paytm)' : paymentMethod === 'card' ? 'Stripe Card (Visa •••• 4242)' : `Razorpay Net Banking (${selectedBank})`;
    const subtotal = (rawPrice).toFixed(2);
    const gst = (gstAmount).toFixed(2);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${planName} - TeamOS Tax Invoice Receipt</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .brand { font-size: 24px; font-weight: 800; color: #0f172a; }
            .brand span { color: #2563eb; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 99px; background: #dcfce7; color: #166534; font-size: 12px; font-weight: 700; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600; }
            .val { font-size: 14px; font-weight: 700; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
            th { background: #f8fafc; font-weight: 700; color: #475569; }
            .total-box { margin-left: auto; width: 280px; border-top: 2px solid #0f172a; padding-top: 10px; font-size: 14px; }
            .total-row { display: flex; justify-content: space-between; padding: 4px 0; }
            .grand-total { font-size: 18px; font-weight: 800; color: #2563eb; }
            .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">Team<span>OS</span> Enterprise</div>
              <div style="font-size: 12px; color: #64748b;">Unified Operating System for High-Velocity Teams</div>
            </div>
            <div style="text-align: right;">
              <div class="badge">PAYMENT CONFIRMED (PAID)</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 6px;">Receipt #: INV-${Date.now()}</div>
            </div>
          </div>

          <div class="grid">
            <div>
              <div class="label">Billed To</div>
              <div class="val">${workspaceProfile?.name || 'Acme Corporation'}</div>
              <div style="font-size: 12px; color: #475569;">Contact: ${userRole || 'VP of Product'}</div>
            </div>
            <div style="text-align: right;">
              <div class="label">Payment Details</div>
              <div class="val">Date: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              <div style="font-size: 12px; color: #475569;">Txn ID: ${txnId}</div>
              <div style="font-size: 12px; color: #475569;">Method: ${channelName}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Seats</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${planName} Subscription</strong><br/><span style="font-size: 11px; color: #64748b;">Full AI Suite, LiveKit WebRTC HD Studio & Document Vector RAG</span></td>
                <td>Active Workspace</td>
                <td style="text-align: right;">₹${subtotal}</td>
              </tr>
            </tbody>
          </table>

          <div class="total-box">
            <div class="total-row"><span>Base Plan:</span> <span>₹${subtotal}</span></div>
            <div class="total-row"><span>IGST (18%):</span> <span>₹${gst}</span></div>
            <div class="total-row grand-total"><span>Total Paid:</span> <span>₹${totalAmountINR.toLocaleString('en-IN')}</span></div>
          </div>

          <div class="footer">
            TeamOS Inc. • SOC2 Type II Certified • GST Reg: 29AAAAA0000A1Z5<br/>
            This is an official computer-generated tax invoice receipt.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '16px'
    }}>
      <div className="glass-card ai-glow-border" style={{
        width: '560px',
        maxWidth: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color-strong)'
      }}>
        {/* Header Bar */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.15))'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed, #c5a059)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>TeamOS Checkout</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Secure 256-Bit Encrypted Payment</div>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {paymentState === 'success' ? (
          /* Payment Method Specific Success Screen */
          <div style={{ padding: '36px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-light)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: 800, marginBottom: '6px' }}>
              {paymentMethod === 'qr' && 'UPI Payment Verified via QR Code! 📲'}
              {paymentMethod === 'card' && 'Card Payment Authorized via Stripe! 💳'}
              {paymentMethod === 'netbanking' && `Net Banking Complete via ${selectedBank}! 🏦`}
            </h2>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Your workspace has been upgraded to <strong>{planName}</strong>. Official tax receipt generated below.
            </p>

            <div style={{ padding: '18px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', marginBottom: '24px', fontSize: '13px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Transaction Reference:</span>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {paymentMethod === 'qr' ? 'UTR-620491820491' : paymentMethod === 'card' ? 'AUTH-STRIPE-884210' : `RZR-${selectedBank.replace(/\s+/g, '')}-994182`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Settled:</span>
                <span style={{ fontWeight: 700, color: 'var(--success)' }}>₹{totalAmountINR.toLocaleString('en-IN')} (Incl 18% GST)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Verified Payment Method:</span>
                <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                  {paymentMethod === 'qr' && 'UPI Scanner (GPay / PhonePe / Paytm)'}
                  {paymentMethod === 'card' && 'Stripe Credit Card (Visa •••• 4242)'}
                  {paymentMethod === 'netbanking' && `${selectedBank} Net Banking`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={handlePrintPDFReceipt} className="btn btn-secondary" style={{ flex: 1 }}>
                <Printer size={14} /> Print / Save PDF Receipt
              </button>
              <button onClick={onClose} className="btn btn-primary" style={{ flex: 1 }}>
                Enter Upgraded Workspace
              </button>
            </div>
          </div>
        ) : (
          /* Main Checkout State */
          <div style={{ padding: '24px' }}>
            {/* Order Summary Box */}
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>{planName} Subscription</span>
                <span className="badge badge-gold">Annual Billing</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Includes Unlimited Video Meetings, Voice AI, Linear Kanban, & Document AI RAG
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Base Plan Fee</span>
                  <span>₹{rawPrice.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>GST (18%)</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                  <span>Total Payable</span>
                  <span style={{ color: 'var(--tertiary-gold)' }}>₹{totalAmountINR.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '4px',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '20px'
            }}>
              {[
                { id: 'qr', label: 'UPI / QR Scanner', icon: QrCode },
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking / Razorpay', icon: Building2 }
              ].map((m) => {
                const Icon = m.icon;
                const isSel = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isSel ? 'var(--bg-surface)' : 'transparent',
                      border: 'none',
                      color: isSel ? 'var(--primary)' : 'var(--text-muted)',
                      fontWeight: isSel ? 600 : 400,
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={14} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Dynamic UPI QR Scanner */}
            {paymentMethod === 'qr' && (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: '#ffffff',
                  border: '2px solid var(--tertiary-gold)',
                  boxShadow: 'var(--shadow-glow)'
                }}>
                  <img src={upiQrUrl} alt="UPI Payment QR Code" style={{ width: '160px', height: '160px', display: 'block' }} />
                </div>

                <div style={{ fontSize: '14px', fontWeight: 700 }}>
                  Scan & Pay <span style={{ color: 'var(--tertiary-gold)' }}>₹{totalAmountINR.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>UPI ID:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{upiId}</span>
                  <button onClick={handleCopyUpi} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                    {copiedUpi ? <Check size={12} color="var(--success)" /> : <Copy size={12} />}
                    {copiedUpi ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Direct App Launchers */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '11px' }}>
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map((app, idx) => (
                    <span key={idx} style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {app}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleSimulatePayment('qr')}
                  disabled={paymentState === 'verifying'}
                  className="btn btn-ai"
                  style={{ width: '100%', padding: '12px', marginTop: '10px', fontSize: '14px' }}
                >
                  {paymentState === 'verifying' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} className="animate-spin" /> Verifying Bank Payment...
                    </span>
                  ) : (
                    <span>I Have Paid ₹{totalAmountINR.toLocaleString('en-IN')} via UPI</span>
                  )}
                </button>
              </div>
            )}

            {/* Tab 2: Credit / Debit Card (Stripe) */}
            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Card Number</label>
                  <input type="text" className="input-field" defaultValue="4242 •••• •••• 4242" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Expiry</label>
                    <input type="text" className="input-field" defaultValue="08 / 28" />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>CVC</label>
                    <input type="text" className="input-field" defaultValue="•••" />
                  </div>
                </div>

                <button onClick={() => handleSimulatePayment('card')} className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '8px' }}>
                  Pay ₹{totalAmountINR.toLocaleString('en-IN')} with Stripe Card
                </button>
              </div>
            )}

            {/* Tab 3: Net Banking / Razorpay */}
            {paymentMethod === 'netbanking' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Select Popular Indian Bank</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank, idx) => (
                    <button key={idx} onClick={() => handleSimulatePayment('netbanking', bank)} className="btn btn-secondary" style={{ fontSize: '12px', justifyContent: 'flex-start', padding: '10px' }}>
                      <Building2 size={14} color="var(--primary)" /> {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
