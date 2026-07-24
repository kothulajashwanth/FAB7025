import React, { useState } from 'react';
import { CreditCard, DollarSign, ArrowUpRight, CheckCircle2, ShieldCheck, Download, Sparkles, QrCode, FileText, Printer } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Finance() {
  const { openPaymentModal, workspaceProfile, userRole, invitedTeammates } = useApp();
  const [downloadToast, setDownloadToast] = useState(null);

  // Dynamic cost calculation based on active team seats
  const activeSeatCount = Math.max(invitedTeammates ? invitedTeammates.length + 1 : 4, 12);
  const perSeatRateINR = 1499;
  const monthlyCostINR = activeSeatCount * perSeatRateINR;
  const annualCostINR = monthlyCostINR * 12;

  const invoices = [
    { id: 'INV-2026-001', client: workspaceProfile?.name || 'Acme Corporation', amount: `₹${monthlyCostINR.toLocaleString('en-IN')}.00`, status: 'Paid', date: 'Jul 15, 2026', seats: activeSeatCount, plan: 'Pro Enterprise Tier', txnId: 'TXN-984210547192' },
    { id: 'INV-2026-002', client: workspaceProfile?.name || 'Acme Corporation', amount: `₹${monthlyCostINR.toLocaleString('en-IN')}.00`, status: 'Paid', date: 'Jun 15, 2026', seats: activeSeatCount, plan: 'Pro Enterprise Tier', txnId: 'TXN-873104928104' },
    { id: 'INV-2026-003', client: workspaceProfile?.name || 'Acme Corporation', amount: '₹1,499.00', status: 'Pending', date: 'Jul 23, 2026', seats: 1, plan: 'Voice AI Addon', txnId: 'PENDING' }
  ];

  const handlePrintPDFInvoice = (inv) => {
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      alert('Please allow popups to download and print PDF receipts.');
      return;
    }

    const subtotal = (inv.seats * perSeatRateINR * 0.82).toFixed(2);
    const gstAmount = (inv.seats * perSeatRateINR * 0.18).toFixed(2);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${inv.id} - TeamOS Tax Invoice Receipt</title>
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
              <div class="badge">PAID TAX INVOICE</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 6px;">Receipt #: ${inv.id}</div>
            </div>
          </div>

          <div class="grid">
            <div>
              <div class="label">Billed To</div>
              <div class="val">${inv.client}</div>
              <div style="font-size: 12px; color: #475569;">Contact: ${userRole || 'VP of Product'}</div>
              <div style="font-size: 12px; color: #475569;">GSTIN: 29AAAAA0000A1Z5</div>
            </div>
            <div style="text-align: right;">
              <div class="label">Payment Details</div>
              <div class="val">Date: ${inv.date}</div>
              <div style="font-size: 12px; color: #475569;">Txn ID: ${inv.txnId}</div>
              <div style="font-size: 12px; color: #475569;">Method: UPI QR / Stripe Auto-Debit</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Seats</th>
                <th>Rate / Seat</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>${inv.plan}</strong><br/><span style="font-size: 11px; color: #64748b;">Includes 1080p LiveKit Video Studio, DMs & GPT-4o RAG Vector Search</span></td>
                <td>${inv.seats}</td>
                <td>₹${perSeatRateINR.toLocaleString('en-IN')} / mo</td>
                <td style="text-align: right;">${inv.amount}</td>
              </tr>
            </tbody>
          </table>

          <div class="total-box">
            <div class="total-row"><span>Subtotal:</span> <span>₹${subtotal}</span></div>
            <div class="total-row"><span>IGST (18%):</span> <span>₹${gstAmount}</span></div>
            <div class="total-row grand-total"><span>Total Paid:</span> <span>${inv.amount}</span></div>
          </div>

          <div class="footer">
            TeamOS Inc. • SOC2 Type II Certified • GST Reg: 29AAAAA0000A1Z5<br/>
            This is a computer-generated tax invoice receipt requiring no signature.
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

    setDownloadToast(`Opened PDF Print receipt for ${inv.id}!`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '26px', fontWeight: 800 }}>Finance, Invoices & Subscriptions</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Stripe, UPI & Razorpay Billing Reconciliation Engine</p>
        </div>
        <button onClick={() => openPaymentModal({ name: `${workspaceProfile?.name || 'Acme'} Pro Subscription`, priceNum: monthlyCostINR })} className="btn btn-ai">
          <QrCode size={16} /> Pay via UPI / QR Scanner (₹{monthlyCostINR.toLocaleString('en-IN')})
        </button>
      </div>

      {downloadToast && (
        <div className="badge badge-success" style={{ padding: '12px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} /> {downloadToast}
        </div>
      )}

      {/* Dynamic Metric Cards reflecting exact active costs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Monthly Subscription</div>
          <div className="font-mono" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>
            ₹{monthlyCostINR.toLocaleString('en-IN')} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>/ mo</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--success)' }}>
            {activeSeatCount} seats @ ₹{perSeatRateINR.toLocaleString('en-IN')}/seat (Pro Enterprise)
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Annual Run Rate (ARR)</div>
          <div className="font-mono" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
            ₹{annualCostINR.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Synced with Stripe & UPI Auto-Debit</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Provisioned Workspace Seats</div>
          <div className="font-mono" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--tertiary-gold)', margin: '4px 0' }}>
            {activeSeatCount} Seats
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{workspaceProfile?.name || 'Acme Corporation'} Tier</div>
        </div>
      </div>

      {/* Subscription Breakdown Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Current Plan & Seat Allocation</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px' }}>Pro Enterprise Tier (Per-Seat Billing)</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Includes 1080p HD LiveKit Video Studio, Unlimited DMs, Voice AI Agents & GPT-4o RAG Search.
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Rate per Seat</div>
            <div className="font-mono" style={{ fontWeight: 700, fontSize: '14px', color: 'var(--primary)' }}>₹1,499 / mo</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Monthly Total</div>
            <div className="font-mono" style={{ fontWeight: 700, fontSize: '16px', color: 'var(--success)' }}>₹{monthlyCostINR.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table with PDF Print Triggers */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Recent Invoices & PDF Receipts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {invoices.map((inv) => (
            <div key={inv.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>{inv.id}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {inv.client} — {inv.plan} ({inv.seats} seats) • {inv.date}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{inv.amount}</span>
                <span className={`badge ${inv.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>{inv.status}</span>
                
                {inv.status === 'Pending' ? (
                  <button onClick={() => openPaymentModal({ name: inv.id, priceNum: 1499 })} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                    <QrCode size={12} /> Pay Pending
                  </button>
                ) : (
                  <button
                    onClick={() => handlePrintPDFInvoice(inv)}
                    className="btn btn-ai"
                    style={{ padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Printer size={14} /> Print / Save PDF
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
