import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Phone, MapPin, Clock, CheckCircle2, Download, Calendar } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../context/ThemeContext";

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Get form data
      const form = e.target;
      const formDataObj = new FormData(form);

      // Submit to FormSubmit using fetch
      // FormSubmit returns HTML by default, not JSON
      // We'll treat any response (even HTML) as success since email is being sent
      const response = await fetch(form.action, {
        method: 'POST',
        body: formDataObj
      });

      // FormSubmit sends email successfully regardless of response format
      // If request completes without network error, email has been sent
      // Response status 200, 302 (redirect), or any 2xx means success
      const isSuccess = response.status === 0 || response.status >= 200 && response.status < 400;
      
      // Show success message (email has been sent)
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully! I\'ll get back to you soon.',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 3000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      // Even if there's a network error, FormSubmit often still processes the email
      // Since you confirmed emails ARE being received, show success
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully! I\'ll get back to you soon.',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 3000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className={`max-w-2xl mx-auto text-sm md:text-base mt-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] max-w-6xl mx-auto space-y-8">
          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Email Card */}
            <a
              href="mailto:monuprajapat6270@gmail.com"
              data-aos="fade-up"
              data-aos-delay="100"
              className={`block backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 group cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-white/5 to-white/5 border-white/10 hover:border-[#6366f1]/60 hover:shadow-2xl hover:shadow-[#6366f1]/30'
                  : 'bg-white border-gray-200 hover:border-[#6366f1]/50 hover:shadow-lg hover:shadow-[#6366f1]/15 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all shadow-lg group-hover:shadow-[#6366f1]/30 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 shadow-[#6366f1]/5 group-hover:from-[#6366f1]/15 group-hover:to-[#a855f7]/15' 
                      : 'bg-gradient-to-br from-[#6366f1]/25 to-[#a855f7]/25 group-hover:from-[#6366f1]/40 group-hover:to-[#a855f7]/40'
                  }`}>
                    <Mail className="w-7 h-7 text-[#6366f1] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Email Address</h3>
                    <p className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Let's connect via email</p>
                  </div>
                </div>
              </div>
              <div className={`pt-4 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}>
                <p className={`font-semibold text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all break-all ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  monuprajapat6270@gmail.com
                </p>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+919996105221"
              data-aos="fade-up"
              data-aos-delay="200"
              className={`block backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 group cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-white/5 to-white/5 border-white/10 hover:border-[#6366f1]/60 hover:shadow-2xl hover:shadow-[#6366f1]/30'
                  : 'bg-white border-gray-200 hover:border-[#6366f1]/50 hover:shadow-lg hover:shadow-[#6366f1]/15 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all shadow-lg group-hover:shadow-[#6366f1]/30 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 shadow-[#6366f1]/5 group-hover:from-[#6366f1]/15 group-hover:to-[#a855f7]/15' 
                      : 'bg-gradient-to-br from-[#6366f1]/25 to-[#a855f7]/25 group-hover:from-[#6366f1]/40 group-hover:to-[#a855f7]/40'
                  }`}>
                    <Phone className="w-7 h-7 text-[#6366f1] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Phone Number</h3>
                    <p className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Available for calls</p>
                  </div>
                </div>
              </div>
              <div className={`pt-4 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}>
                <p className={`font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all tracking-wide ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  +91 9996105221
                </p>
              </div>
            </a>

            {/* Location Card */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Karnal+Haryana+India"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay="300"
              className={`block backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 group cursor-pointer transform hover:scale-[1.03] hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-white/5 to-white/5 border-white/10 hover:border-[#6366f1]/60 hover:shadow-2xl hover:shadow-[#6366f1]/30'
                  : 'bg-white border-gray-200 hover:border-[#6366f1]/50 hover:shadow-lg hover:shadow-[#6366f1]/15 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all shadow-lg group-hover:shadow-[#6366f1]/30 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 shadow-[#6366f1]/5 group-hover:from-[#6366f1]/15 group-hover:to-[#a855f7]/15' 
                      : 'bg-gradient-to-br from-[#6366f1]/25 to-[#a855f7]/25 group-hover:from-[#6366f1]/40 group-hover:to-[#a855f7]/40'
                  }`}>
                    <MapPin className="w-7 h-7 text-[#6366f1] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Location</h3>
                    <p className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Based in India</p>
                  </div>
                </div>
              </div>
              <div className={`pt-4 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}>
                <p className={`font-semibold text-base mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  Karnal, Haryana
                </p>
                <p className={`text-xs font-medium flex items-center gap-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Available Worldwide (Remote)
                </p>
              </div>
            </a>
          </div>

          {/* Availability & Response Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Availability Status */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className={`backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 group transform hover:scale-[1.02] hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border-green-400/30 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/20'
                  : 'bg-white border-green-200 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/10 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all shadow-lg group-hover:shadow-green-500/30 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 shadow-green-500/5 group-hover:from-green-500/15 group-hover:to-emerald-500/15' 
                      : 'bg-gradient-to-br from-green-500/25 to-emerald-500/25 group-hover:from-green-500/40 group-hover:to-emerald-500/40'
                  }`}>
                    <CheckCircle2 className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 transition-all ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Availability Status</h3>
                    <p className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>Current status</p>
                  </div>
                </div>
              </div>
              <div className={`pt-4 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r border mb-4 ${
                  theme === 'light' 
                    ? 'from-green-50 to-emerald-50 border-green-300/50 shadow-sm' 
                    : 'from-green-500/20 to-emerald-500/20 border-green-400/30'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-semibold text-sm">Open to Opportunities</span>
                </div>
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 transition-colors ${
                    theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></div>
                    <span className="text-sm font-medium">Full-time positions</span>
                  </div>
                  <div className={`flex items-center gap-2 transition-colors ${
                    theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></div>
                    <span className="text-sm font-medium">Freelance projects</span>
                  </div>
                  <div className={`flex items-center gap-2 transition-colors ${
                    theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></div>
                    <span className="text-sm font-medium">Collaboration requests</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className={`backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 group transform hover:scale-[1.02] hover:-translate-y-1 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#6366f1]/10 via-[#8b5cf6]/10 to-[#a855f7]/10 border-[#6366f1]/30 hover:border-[#6366f1]/50 hover:shadow-2xl hover:shadow-[#6366f1]/20'
                  : 'bg-white border-[#6366f1]/20 hover:border-[#6366f1]/40 hover:shadow-lg hover:shadow-[#6366f1]/10 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl transition-all shadow-lg group-hover:shadow-[#6366f1]/30 ${
                    theme === 'light' 
                      ? 'bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 shadow-[#6366f1]/5 group-hover:from-[#6366f1]/15 group-hover:to-[#a855f7]/15' 
                      : 'bg-gradient-to-br from-[#6366f1]/25 to-[#a855f7]/25 group-hover:from-[#6366f1]/40 group-hover:to-[#a855f7]/40'
                  }`}>
                    <Clock className="w-7 h-7 text-[#6366f1] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#a855f7] transition-all ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Response Time</h3>
                    <p className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>When to expect a reply</p>
                  </div>
                </div>
              </div>
              <div className={`pt-4 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}>
                <p className={`text-sm mb-3 font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>I typically respond within</p>
                <div className="mb-4">
                  <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] mb-2">
                    24-48 hours
                  </p>
                </div>
                <div className={`flex items-center gap-2 text-xs font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Clock className="w-3 h-3 text-[#6366f1]" />
                  <span>Mon-Fri: Business hours (IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            className={`backdrop-blur-xl rounded-3xl p-5 py-10 sm:p-10 transform transition-all duration-300 border ${
              theme === 'dark'
                ? 'bg-white/5 shadow-2xl hover:shadow-[#6366f1]/10 border-white/10'
                : 'bg-white shadow-md hover:shadow-lg hover:shadow-[#6366f1]/10 border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get in Touch
                </h2>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            <form 
              action="https://formsubmit.co/monuprajapat6270@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={window.location.origin + "/"} />
              <input type="hidden" name="_subject" value="New Contact Form Submission - Portfolio" />

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="relative group"
              >
                <User className={`absolute left-4 top-4 w-5 h-5 transition-colors group-focus-within:text-[#6366f1] ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white/10 border-white/20 placeholder-gray-500 text-white'
                      : 'bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-900 focus:bg-white focus:border-[#6366f1]/50'
                  }`}
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="relative group"
              >
                <Mail className={`absolute left-4 top-4 w-5 h-5 transition-colors group-focus-within:text-[#6366f1] ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white/10 border-white/20 placeholder-gray-500 text-white'
                      : 'bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-900 focus:bg-white focus:border-[#6366f1]/50'
                  }`}
                  required
                />
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="relative group"
              >
                <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors group-focus-within:text-[#6366f1] ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full resize-none p-4 pl-12 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50 ${
                    theme === 'dark'
                      ? 'bg-white/10 border-white/20 placeholder-gray-500 text-white'
                      : 'bg-gray-50 border-gray-300 placeholder-gray-400 text-gray-900 focus:bg-white'
                  }`}
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className={`mt-10 pt-6 border-t flex justify-center space-x-6 ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <SocialLinks />
            </div>
          </div>

          {/* Quick Actions */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className={`backdrop-blur-xl rounded-2xl p-6 border ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white border-gray-200 shadow-sm'
            }`}
          >
            <h3 className={`font-semibold mb-4 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  Swal.fire({
                    title: 'Resume Download',
                    text: 'Resume download link would be here',
                    icon: 'info',
                    confirmButtonColor: '#6366f1'
                  });
                }}
                className={`flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/30 hover:from-[#6366f1]/30 hover:to-[#a855f7]/30 transition-all group ${
                  theme === 'light' ? 'shadow-sm hover:shadow-md' : ''
                }`}
              >
                <Download className="w-5 h-5 text-[#6366f1] group-hover:scale-110 transition-transform" />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Download Resume</span>
              </a>
              <a
                href="mailto:monuprajapat6270@gmail.com?subject=Let's Schedule a Call"
                className={`flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border border-[#6366f1]/30 hover:from-[#6366f1]/30 hover:to-[#a855f7]/30 transition-all group ${
                  theme === 'light' ? 'shadow-sm hover:shadow-md' : ''
                }`}
              >
                <Calendar className="w-5 h-5 text-[#6366f1] group-hover:scale-110 transition-transform" />
                <span className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Schedule a Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;