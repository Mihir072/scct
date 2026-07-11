import React from 'react';
import { Mail, MapPin, Clock, ShieldAlert } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center md:text-left border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-black font-serif text-academic-navy mb-2">Connect With SCCT</h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Get in touch with our admissions wing, administrative offices, or plan a campus visit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info Cards */}
        <div className="flex flex-col gap-6">

          {/* College Identity */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex items-center gap-4">
            <img
              src="/images/scct-logo.jpg"
              alt="SCCT Logo"
              className="h-16 w-16 rounded-full object-cover border-2 border-academic-gold/30 shadow-sm shrink-0"
            />
            <div>
              <h2 className="text-base font-black text-academic-navy leading-tight">
                Sanpada College of Commerce &amp; Technology
              </h2>
              <p className="text-[10px] text-academic-gold font-bold uppercase tracking-widest mt-0.5">SCCT — Knowledge • Character • Integrity</p>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex items-start gap-4">
            <div className="bg-academic-navy/5 text-academic-navy p-3 rounded-lg shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-academic-navy mb-1 uppercase tracking-wider">Campus Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Sanpada College of Commerce &amp; Technology (SCCT)<br />
                Plot No. 3, 4, 5, Sector 2, Sanpada (W),<br />
                Behind Sanpada Railway Station,<br />
                Sanpada, Navi-Mumbai – 400705
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex items-start gap-4">
            <div className="bg-academic-gold/10 text-[#b08b26] p-3 rounded-lg shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-academic-navy mb-1 uppercase tracking-wider">Email</h3>
              <div className="flex flex-col gap-1 text-xs text-slate-600 font-medium">
                <a href="mailto:supportscct@gmail.com" className="hover:text-academic-maroon transition">
                  supportscct@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Visiting Hours */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex items-start gap-4">
            <div className="bg-slate-50 text-slate-600 p-3 rounded-lg shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-academic-navy mb-1 uppercase tracking-wider">Visiting Hours</h3>
              <p className="text-xs text-slate-600 leading-normal font-medium">
                Monday to Saturday: 9:00 AM to 5:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Map & Notice */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col gap-6">
          <div>
            <h3 className="text-base font-bold text-academic-navy mb-1">Locate Campus</h3>
            <p className="text-xs text-slate-400">Behind Sanpada Railway Station, Sector 2, Sanpada (W), Navi-Mumbai.</p>
          </div>

          {/* Live Google Maps Embed */}
          <div className="h-64 rounded overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              title="SCCT Campus Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.834!2d73.0076!3d19.0626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c16b4c03e921%3A0x3c4a6ecf72e2a4c1!2sSanpada%2C%20Navi%20Mumbai%2C%20Maharashtra%20400705!5e0!3m2!1sen!2sin!4v1689000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded border border-slate-100 flex items-start gap-3">
            <ShieldAlert className="text-academic-gold shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-0.5">Important Notice</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                Visitors must carry a valid photo identification card and sign-in at the security desk upon arrival. Prior appointments are recommended for course counselor briefings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

