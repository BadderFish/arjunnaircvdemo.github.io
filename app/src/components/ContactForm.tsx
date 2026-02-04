import { useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });

    // Clear error for this field when user starts typing
    if (touched[field] && errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    if (!validateForm()) {
      return;
    }

    setStatus('sending');
    setStatusMessage('');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your .env file.');
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'arjunnair0404@gmail.com',
        },
        publicKey
      );

      setStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setStatusMessage('Failed to send message. Please try emailing me directly at arjunnair0404@gmail.com');

      // Clear error message after 7 seconds
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 7000);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isSubmitting = status === 'sending';

  return (
    <div className="contact-form-section">
      <div className="contact-form">
        <h3>Send me a message</h3>
        <p className="form-description">
          Fill out the form below to send me an email directly.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`form-group ${touched.name && errors.name ? 'has-error' : ''}`}>
            <label htmlFor="contact-name">
              Name <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder="Your full name"
              aria-invalid={touched.name && errors.name ? 'true' : 'false'}
              aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
            />
            {touched.name && errors.name && (
              <span className="form-error" id="name-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className={`form-group ${touched.email && errors.email ? 'has-error' : ''}`}>
            <label htmlFor="contact-email">
              Email <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="your.email@example.com"
              aria-invalid={touched.email && errors.email ? 'true' : 'false'}
              aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
            />
            {touched.email && errors.email && (
              <span className="form-error" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className={`form-group ${touched.message && errors.message ? 'has-error' : ''}`}>
            <label htmlFor="contact-message">
              Message <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              placeholder="Tell me about your project, collaboration idea, or just say hello..."
              aria-invalid={touched.message && errors.message ? 'true' : 'false'}
              aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
            />
            {touched.message && errors.message && (
              <span className="form-error" id="message-error" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={isSubmitting || (hasErrors && (touched.name || touched.email || touched.message))}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {statusMessage && (
            <div
              className={`status-message ${status}`}
              role="alert"
              style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '14px',
                textAlign: 'center',
                backgroundColor: status === 'success' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 107, 107, 0.15)',
                border: `1px solid ${status === 'success' ? 'rgba(46, 213, 115, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`,
                color: status === 'success' ? '#2ed573' : '#ff6b6b'
              }}
            >
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
