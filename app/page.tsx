'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, ClipboardList, LockKeyhole, RotateCcw, ShieldCheck, Utensils } from 'lucide-react'

type Intake = {
  service: 'corporate' | 'large-party'
  contact: string
  organization: string
  email: string
  phone: string
  date: string
  guests: string
  venue: string
  budget: string
  serviceStyle: string
  menu: string
  notes: string
}

const initialIntake: Intake = {
  service: 'corporate', contact: '', organization: '', email: '', phone: '', date: '', guests: '', venue: '', budget: '', serviceStyle: 'Plated service', menu: '', notes: '',
}

const flow = [
  ['01', 'Identity', 'Client + event profile'],
  ['02', 'Parameters', 'Service requirements'],
  ['03', 'Dispatch', 'Secure packet review'],
]

export default function Page() {
  const [intake, setIntake] = useState<Intake>(initialIntake)
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [packetId, setPacketId] = useState('')

  useEffect(() => {
    const saved = sessionStorage.getItem('infinity-intake')
    if (saved) setIntake({ ...initialIntake, ...JSON.parse(saved) })
  }, [])

  useEffect(() => {
    sessionStorage.setItem('infinity-intake', JSON.stringify(intake))
  }, [intake])

  const update = (field: keyof Intake, value: string) => setIntake((current) => ({ ...current, [field]: value }))
  const progress = useMemo(() => Math.round((step / 3) * 100), [step])

  const reset = () => {
    setIntake(initialIntake)
    setStep(1)
    setSubmitted(false)
    setPacketId('')
    sessionStorage.removeItem('infinity-intake')
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const id = `INF-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    setPacketId(id)
    setSubmitted(true)
  }

  return (
    <main className="matrix-shell">
      <div className="matrix-frame">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark"><span>∞</span></div>
            <div>
              <p className="eyebrow">INFINITY / CATERING &amp; DINING</p>
              <h1>INTAKE MATRIX</h1>
            </div>
          </div>
          <div className="security-stamp"><ShieldCheck /> <span>SECURED BY SERPENT<br />INTELLIGENCE SYSTEMS</span></div>
        </header>

        <section className="hero-grid">
          <div className="hero-copy">
            <p className="kicker"><span className="signal-dot" /> QUOTE INTAKE / CHANNEL 07</p>
            <h2>Engineer the<br /><em>perfect table.</em></h2>
            <p className="hero-description">A tactical intake funnel for corporate catering briefs and large-party dining operations. Configure the brief. Secure the packet. We&apos;ll handle the rest.</p>
          </div>
          <div className="status-panel">
            <div className="status-line"><span>SESSION STATUS</span><strong>ACTIVE / LOCAL</strong></div>
            <div className="status-line"><span>PACKET ENCRYPTION</span><strong><LockKeyhole /> AES-256</strong></div>
            <div className="status-line"><span>RESPONSE WINDOW</span><strong>01—02 BUSINESS DAYS</strong></div>
            <div className="radar"><div className="radar-ring" /><div className="radar-sweep" /><span>∞</span></div>
          </div>
        </section>

        <nav className="flow-nav" aria-label="Intake progress">
          {flow.map(([number, label, detail], index) => (
            <button key={number} className={`flow-step ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'complete' : ''}`} onClick={() => setStep(index + 1)} type="button">
              <span className="flow-number">{step > index + 1 ? <Check /> : number}</span><span><b>{label}</b><small>{detail}</small></span>
            </button>
          ))}
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <span className="progress-value">{String(progress).padStart(2, '0')}%</span>
        </nav>

        <form onSubmit={submit}>
          {!submitted ? <>
            {step === 1 && <section className="form-section">
              <div className="section-heading"><span className="section-index">01</span><div><p className="kicker">CLIENT PROFILE</p><h3>Who are we feeding?</h3></div><p className="section-note">Establish the command contact for this dining operation.</p></div>
              <div className="service-switch" role="group" aria-label="Service type">
                <button type="button" className={intake.service === 'corporate' ? 'selected' : ''} onClick={() => update('service', 'corporate')}><ClipboardList /> CORPORATE CATERING <small>Meetings / launches / boardrooms</small></button>
                <button type="button" className={intake.service === 'large-party' ? 'selected' : ''} onClick={() => update('service', 'large-party')}><Utensils /> LARGE-PARTY DINING <small>Celebrations / milestones / groups</small></button>
              </div>
              <div className="field-grid two"><Field label="COMMAND CONTACT" value={intake.contact} onChange={(v) => update('contact', v)} placeholder="Full name" required /><Field label="ORGANIZATION / HOST" value={intake.organization} onChange={(v) => update('organization', v)} placeholder="Company or host name" required /></div>
              <div className="field-grid two"><Field label="SECURE EMAIL" type="email" value={intake.email} onChange={(v) => update('email', v)} placeholder="name@organization.com" required /><Field label="DIRECT LINE" type="tel" value={intake.phone} onChange={(v) => update('phone', v)} placeholder="(000) 000-0000" /></div>
            </section>}
            {step === 2 && <section className="form-section">
              <div className="section-heading"><span className="section-index">02</span><div><p className="kicker">OPERATIONAL PARAMETERS</p><h3>Map the mission.</h3></div><p className="section-note">Give our culinary team the coordinates and scale.</p></div>
              <div className="field-grid three"><Field label="EVENT DATE" type="date" value={intake.date} onChange={(v) => update('date', v)} required /><Field label="HEADCOUNT" type="number" value={intake.guests} onChange={(v) => update('guests', v)} placeholder="e.g. 120" required /><Field label="BUDGET / GUEST" value={intake.budget} onChange={(v) => update('budget', v)} placeholder="$ — optional" /></div>
              <div className="field-grid two"><Field label="VENUE / DROP POINT" value={intake.venue} onChange={(v) => update('venue', v)} placeholder="Address or venue name" required /><label className="field"><span>SERVICE ARCHITECTURE</span><select value={intake.serviceStyle} onChange={(e) => update('serviceStyle', e.target.value)}><option>Plated service</option><option>Buffet / stations</option><option>Passed reception</option><option>Drop-off / boxed</option></select></label></div>
              <label className="field"><span>MENU INTENT <i>OPTIONAL</i></span><textarea value={intake.menu} onChange={(e) => update('menu', e.target.value)} placeholder="Cuisine direction, dietary considerations, signature requests..." rows={4} /></label>
            </section>}
            {step === 3 && <section className="form-section">
              <div className="section-heading"><span className="section-index">03</span><div><p className="kicker">PACKET REVIEW</p><h3>Anything we should know?</h3></div><p className="section-note">Final context before your brief is routed to the right table.</p></div>
              <div className="review-strip"><span>ROUTING TO</span><strong>{intake.service === 'corporate' ? 'CORPORATE CATERING DESK' : 'LARGE-PARTY DINING DESK'}</strong><span className="review-dot" /><span>SESSION SAVED</span></div>
              <label className="field"><span>MISSION NOTES <i>OPTIONAL</i></span><textarea value={intake.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Timeline, access notes, ambiance, must-haves, or questions for our team..." rows={7} /></label>
              <div className="privacy-note"><LockKeyhole /> <span>Your packet is held in this browser&apos;s local session memory until you reset or close the session. Nothing is transmitted until you dispatch the brief.</span></div>
            </section>}
            <div className="form-actions"><button className="reset-button" type="button" onClick={reset}><RotateCcw /> RESET SESSION</button><button className="primary-button" type={step === 3 ? 'submit' : 'button'} onClick={() => step < 3 && setStep(step + 1)}>{step === 3 ? 'DISPATCH SECURE BRIEF' : 'CONTINUE TO PARAMETERS'} <ArrowRight /></button></div>
          </> : <section className="success-state"><div className="success-icon"><Check /></div><p className="kicker">PACKET DISPATCHED / ACKNOWLEDGED</p><h3>Your brief is in the matrix.</h3><p>We&apos;ve received your dining inquiry and routed it to the {intake.service === 'corporate' ? 'corporate catering' : 'large-party dining'} desk.</p><div className="packet-code"><span>PACKET ID</span><strong>{packetId}</strong></div><button className="primary-button" type="button" onClick={reset}>START NEW BRIEF <ArrowRight /></button></section>}
          </form>

        <footer className="footer"><span>INFINITY CATERING &amp; DINING / NEW YORK · LONDON · EVERYWHERE</span><span>LOCAL SESSION MEMORY <i className="footer-dot" /> NO THIRD-PARTY TRACKING</span></footer>
      </div>
    </main>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="field"><span>{label} {required && <i>REQUIRED</i>}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required} /></label>
}


