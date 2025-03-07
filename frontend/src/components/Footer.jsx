import React from 'react';

const Footer = () => {
  return (
    <footer className="section-container" style={{ borderTop: '1px solid var(--color-primary)'}}>
        <div className="section-content text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="footer-link">Twitter</a>
            <a href="#" className="footer-link">Facebook</a>
            <a href="#" className="footer-link">LinkedIn</a>
            <a href="#" className="footer-link">Instagram</a>
          </div>
          <p style={{ color: 'var(--color-gray-400)' }} className="text-sm mb-4">
            Contact us: support@disasterrelief.org | Emergency: +1 (555) 0123-4567
          </p>
          <p style={{ color: 'var(--color-gray-500)' }} className="text-xs">
            © 2025 Disaster Relief Platform. All data is verified through official sources and partner organizations.
          </p>
        </div>
      </footer>
  );
};

export default Footer;