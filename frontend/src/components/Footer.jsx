import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-primary py-6 text-center">
      <div className="flex justify-center gap-6 mb-6">
        <a href="#" className="footer-link">Twitter</a>
        <a href="#" className="footer-link">Facebook</a>
        <a href="#" className="footer-link">LinkedIn</a>
        <a href="#" className="footer-link">Instagram</a>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Contact us: support@resqnow.org | Emergency: +91 11-26701700
      </p>
      <p className="text-gray-500 text-xs">
        © 2025 Disaster Relief Platform. All data is verified through official sources and partner organizations.
      </p>
    </footer>
  );
};

export default Footer;
