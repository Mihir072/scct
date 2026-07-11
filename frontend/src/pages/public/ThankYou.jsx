import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Home, BookOpen, ArrowRight } from 'lucide-react';
import Button from '../../components/shared/Button';

const ThankYou = () => {
  const location = useLocation();
  const leadId = location.state?.leadId || null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-6">
      <div className="bg-emerald-50 text-emerald-500 p-4 rounded-full shadow-inner animate-bounce">
        <CheckCircle2 size={56} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black font-serif text-academic-navy">Thank You for Your Enquiry!</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Your enquiry has been successfully logged on the SCCT Admissions platform. Our team will review your application parameters and get in touch with you shortly.
        </p>
      </div>

      {leadId && (
        <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-lg text-xs font-mono text-slate-600 max-w-sm w-full shadow-sm">
          <span className="font-bold text-[10px] text-slate-400 block uppercase mb-1 tracking-wider">Enquiry Tracking ID</span>
          <span className="select-all block font-semibold text-slate-800">{leadId}</span>
        </div>
      )}

      <div className="border-t border-slate-100 w-full pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
        <Link to="/">
          <Button variant="outline" size="md">
            <Home size={16} className="mr-2" />
            Return Home
          </Button>
        </Link>
        <Link to="/courses">
          <Button variant="primary" size="md">
            Browse Other Programs
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
