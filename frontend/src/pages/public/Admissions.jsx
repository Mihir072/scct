import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCourses } from '../../api/courses';
import { createLead } from '../../api/leads';
import { getCapturedUtms } from '../../utils/utmCapture';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import Select from '../../components/shared/Select';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { ArrowLeft, ArrowRight, CheckCircle2, Edit2 } from 'lucide-react';

// Zod validation schemas matching backend LeadCreateRequest DTO validation
const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be 100 characters or less'),
  email: z.string().email('Please enter a valid email address').transform((val) => val.toLowerCase()),
  phone: z
    .string()
    .regex(/^(\+91)?[6-9]\d{9}$/, 'Phone must match Indian format (10 digits, optional +91 prefix)'),
  courseId: z.string().min(1, 'Please select a valid course program'),
  message: z.string().optional().or(z.literal('')),
});

const Admissions = () => {
  const [courses, setCourses] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});

  // Get courseId from URL query param if deep-linking from CourseDetail
  const defaultCourseId = searchParams.get('courseId') || '';

  // Single form instance to hold values across steps
  const methods = useForm({
    resolver: zodResolver(enquirySchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      courseId: defaultCourseId,
      message: '',
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    // Populate course dropdown from backend
    const loadCoursesList = async () => {
      try {
        const data = await getCourses();
        setCourses(data.map((c) => ({ value: c.id, label: c.name })));
        if (defaultCourseId) {
          setValue('courseId', defaultCourseId);
        }
      } catch (err) {
        console.error('Failed to load courses for form selection:', err);
      } finally {
        setLoadingCourses(false);
      }
    };
    loadCoursesList();
  }, [defaultCourseId, setValue]);

  // Navigate forward in the multi-step form after validation
  const handleNext = async () => {
    const fieldsToValidate = step === 1
      ? ['fullName', 'email', 'phone', 'courseId']
      : ['message'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleEditStep = (stepNum) => {
    setStep(stepNum);
  };

  const onFormSubmit = async (formData) => {
    setSubmitting(false);
    setBackendErrors({});

    // Read UTM params stored in sessionStorage
    const utms = getCapturedUtms();

    // Map fields exactly to backend DTO request payload
    const submissionPayload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      courseId: formData.courseId,
      message: formData.message?.trim() || null,
      source: 'WEBSITE_FORM', // Default public source
      ...utms,
    };

    setSubmitting(true);
    try {
      const response = await createLead(submissionPayload);

      // Even if response.isDuplicate is true, we still redirect to Thank You page silently.
      // Duplicate handling is a backend/staff concern, not user-facing.
      navigate('/thank-you', { state: { leadId: response.leadId } });
    } catch (err) {
      console.error('Lead submission failure:', err);
      if (err.response && err.response.data && err.response.data.errors) {
        // Map backend validation field errors back to UI steps
        const apiErrors = {};
        Object.keys(err.response.data.errors).forEach((key) => {
          apiErrors[key] = err.response.data.errors[key];
        });
        setBackendErrors(apiErrors);
        // Jump back to step 1 if the error is on Step 1 fields
        const step1Keys = ['fullName', 'email', 'phone', 'courseId'];
        const hasStep1Error = Object.keys(apiErrors).some((k) => step1Keys.includes(k));
        if (hasStep1Error) {
          setStep(1);
        }
      } else {
        alert(err.response?.data?.message || 'An error occurred during submission. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Get selected course label for review screen
  const getSelectedCourseLabel = () => {
    const courseId = getValues('courseId');
    const selected = courses.find((c) => c.value === courseId);
    return selected ? selected.label : 'None';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black font-serif text-academic-navy mb-2">SCCT Admission Enquiry Form</h1>
        <p className="text-sm text-slate-500">
          Begin your journey with SCCT by submitting this official admissions enquiry.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
          <span>Step {step} of 3</span>
          <span>{step === 1 ? 'Contact Details' : step === 2 ? 'Message & Notes' : 'Review & Submit'}</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-academic-maroon h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Backend Global Errors Notification */}
      {Object.keys(backendErrors).length > 0 && (
        <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-600 rounded text-rose-800 text-xs">
          <p className="font-bold mb-1">Please correct the following errors highlighted by the admissions server:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            {Object.values(backendErrors).map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Content Block */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 shadow-sm">
        {loadingCourses ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-6">
            {/* STEP 1: Basic Info & Course Selection */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <Select
                  label="Select Desired Program / Course *"
                  id="courseId"
                  options={courses}
                  placeholder="Choose degree course..."
                  error={errors.courseId || backendErrors.courseId}
                  {...register('courseId')}
                />

                <Input
                  label="Candidate Full Name *"
                  id="fullName"
                  placeholder="e.g. Rahul Sharma"
                  error={errors.fullName || backendErrors.fullName}
                  {...register('fullName')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Email Address *"
                    id="email"
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    error={errors.email || backendErrors.email}
                    {...register('email')}
                  />
                  <Input
                    label="Mobile Phone *"
                    id="phone"
                    placeholder="e.g. 9876543210 (Indian format)"
                    error={errors.phone || backendErrors.phone}
                    {...register('phone')}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Optional message details */}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="message" className="text-sm font-medium text-academic-slate block">
                    Message / Special Requests (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Provide details on educational history, specific questions about fees, housing, or eligibility..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm transition-all focus:outline-none focus:border-academic-navy focus:ring-2 focus:ring-academic-navy/20 bg-white text-academic-slate"
                    {...register('message')}
                  ></textarea>
                </div>
              </div>
            )}

            {/* STEP 3: Review Details */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <h3 className="text-base font-bold text-academic-navy">Confirm Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-slate-50 p-6 rounded-lg border border-slate-200/50">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400 font-bold uppercase">Candidate Name</span>
                    <span className="font-semibold text-slate-800 text-sm">{getValues('fullName')}</span>
                    <button
                      type="button"
                      onClick={() => handleEditStep(1)}
                      className="text-academic-maroon hover:underline font-bold flex items-center gap-1 mt-1 text-[10px]"
                    >
                      <Edit2 size={10} /> Edit Name
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400 font-bold uppercase">Selected Program</span>
                    <span className="font-semibold text-slate-800 text-sm">{getSelectedCourseLabel()}</span>
                    <button
                      type="button"
                      onClick={() => handleEditStep(1)}
                      className="text-academic-maroon hover:underline font-bold flex items-center gap-1 mt-1 text-[10px]"
                    >
                      <Edit2 size={10} /> Edit Program
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400 font-bold uppercase">Email Address</span>
                    <span className="font-semibold text-slate-800">{getValues('email')}</span>
                    <button
                      type="button"
                      onClick={() => handleEditStep(1)}
                      className="text-academic-maroon hover:underline font-bold flex items-center gap-1 mt-1 text-[10px]"
                    >
                      <Edit2 size={10} /> Edit Email
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400 font-bold uppercase">Mobile Number</span>
                    <span className="font-semibold text-slate-800 font-mono">{getValues('phone')}</span>
                    <button
                      type="button"
                      onClick={() => handleEditStep(1)}
                      className="text-academic-maroon hover:underline font-bold flex items-center gap-1 mt-1 text-[10px]"
                    >
                      <Edit2 size={10} /> Edit Phone
                    </button>
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-1 border-t border-slate-200 pt-4">
                    <span className="text-slate-400 font-bold uppercase">Additional Message</span>
                    <p className="text-slate-700 italic leading-relaxed whitespace-pre-line bg-white p-3 border border-slate-100 rounded">
                      {getValues('message') || 'No additional details provided.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleEditStep(2)}
                      className="text-academic-maroon hover:underline font-bold flex items-center gap-1 mt-1 text-[10px]"
                    >
                      <Edit2 size={10} /> Edit Message
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form Nav Buttons */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-4">
              {step > 1 ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleBack}
                  disabled={submitting}
                >
                  <ArrowLeft size={14} className="mr-2" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                >
                  Continue
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="md"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Official Enquiry'
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admissions;
