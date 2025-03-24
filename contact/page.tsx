'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../lib/ThemeContext'; 

// Definisikan tipe untuk form state
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { theme } = useTheme(); // Gunakan theme dari context
  const isDarkMode = theme === 'dark';
  
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Setup intersection observer
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Animasi untuk komponen-komponen
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Data kontak
  const contactInfo = [
    { label: "Email", value: "saputroibnu300@gmail.com", icon: "📧" },
    { label: "WhatsApp", value: "+62 8562 4854 162", icon: "📱" },
    { label: "Alamat", value: "Kencana, Indonesia", icon: "📍" },
  ];

  // Perbaikan tipe untuk event handler
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // Perbaikan tipe untuk event submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form setelah beberapa detik
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  // Animasi untuk input fields
  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
      borderColor: '#3b82f6',
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.01,
      boxShadow: '0 0 10px rgba(124, 58, 237, 0.3)',
      transition: { duration: 0.2 }
    }
  };

  // Animasi untuk tombol submit
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
      transition: { duration: 0.3, yoyo: Infinity, ease: "easeInOut" }
    },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    success: {
      scale: 1.1,
      backgroundColor: '#10B981',
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="contact" 
      className={`py-20 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-800 to-gray-900 opacity-50'
          : 'bg-gradient-to-b from-blue-50 to-purple-50 opacity-70'
      }`}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r ${
          isDarkMode 
            ? 'from-blue-400 to-purple-500'
            : 'from-blue-600 to-purple-700'
        }`}>
          Hubungi Saya
        </h2>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto"
        >
          {/* Informasi Kontak */}
          <motion.div
            variants={itemVariants}
            className="md:w-2/5"
          >
            <div className={`rounded-2xl p-8 border backdrop-filter backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800 bg-opacity-50 border-gray-700'
                : 'bg-white bg-opacity-80 border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>Informasi Kontak</h3>
              
              <p className={`mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Mau kerja sama? Atau cuma mau say hi biar kelihatan sibuk? Jangan malu-malu, hubungi saya aja lewat form atau kontak di bawah. Saya janji nggak gigit! 😆📩
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ 
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-2xl">
                      {info.icon}
                    </div>
                    <div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{info.label}</p>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Animated decorative elements */}
              <div className="relative h-16 mt-8">
                <motion.div
                  className="absolute bottom-0 left-0 w-10 h-10 bg-blue-500 rounded-full opacity-20"
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-1/3 w-8 h-8 bg-purple-500 rounded-full opacity-20"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.div
                  className="absolute bottom-0 left-2/3 w-6 h-6 bg-pink-500 rounded-full opacity-20"
                  animate={{ 
                    y: [0, -8, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Form Kontak */}
          <motion.div
            variants={itemVariants}
            className="md:w-3/5"
          >
            <div className={`rounded-2xl p-8 border backdrop-filter backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800 bg-opacity-50 border-gray-700'
                : 'bg-white bg-opacity-80 border-gray-200 shadow-lg'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>Kirim Pesan</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Nama Lengkap
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                        isDarkMode
                          ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } border`}
                      whileFocus="focus"
                      whileHover="hover"
                      variants={inputVariants}
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={itemVariants}
                  >
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Email
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                        isDarkMode
                          ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } border`}
                      whileFocus="focus"
                      whileHover="hover"
                      variants={inputVariants}
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  variants={itemVariants}
                >
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Subjek
                  </label>
                  <motion.input
                    type="text"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none ${
                      isDarkMode
                        ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border`}
                    whileFocus="focus"
                    whileHover="hover"
                    variants={inputVariants}
                  />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                >
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Pesan
                  </label>
                  <motion.textarea
                    name="message"
                    rows={5}
                    required
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg focus:outline-none resize-none ${
                      isDarkMode
                        ? 'bg-gray-700 bg-opacity-50 border-gray-600 text-white'
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    } border`}
                    whileFocus="focus"
                    whileHover="hover"
                    variants={inputVariants}
                  />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="text-right"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`px-6 py-3 rounded-full font-medium text-white ${
                      isSubmitted 
                        ? 'bg-green-500' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }`}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover={!isSubmitting && !isSubmitted ? "hover" : ""}
                    whileTap={!isSubmitting && !isSubmitted ? "tap" : ""}
                    animate={isSubmitting ? "loading" : isSubmitted ? "success" : "initial"}
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <motion.span 
                            className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Mengirim...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mr-2"
                          >
                            ✓
                          </motion.span>
                          Terkirim!
                        </>
                      ) : (
                        'Kirim Pesan'
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorative elements */}
      <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl ${
        isDarkMode ? 'bg-blue-500 opacity-10' : 'bg-blue-300 opacity-30'
      }`}></div>
      <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl ${
        isDarkMode ? 'bg-purple-500 opacity-10' : 'bg-purple-300 opacity-30'
      }`}></div>
    </section>
  );
};

export default Contact;