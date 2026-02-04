import { useState, type FormEvent } from 'react';

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    if (!validateForm()) {
      return;
    }

    // Construct mailto link
    const subject = encodeURIComponent('Portfolio E-Mail');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    const mailtoLink = `mailto:arjunnair0404@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Optional: Reset form after sending
    // setFormData({ name: '', email: '', message: '' });
    // setTouched({});
    // setErrors({});
  };

  const hasErrors = Object.keys(errors).length > 0;

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
            disabled={hasErrors && (touched.name || touched.email || touched.message)}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
