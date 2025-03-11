import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Wallet, Building2, Gift, Link } from 'lucide-react';
import { clsx } from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DonationType = 'one-time' | 'monthly' | 'in-kind' | 'corporate';

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const amounts = [500, 1000, 5000];

  const tabs = [
    { id: 'one-time', label: 'One-Time', icon: CreditCard },
    { id: 'monthly', label: 'Monthly', icon: Wallet },
    { id: 'in-kind', label: 'In-Kind', icon: Gift },
    { id: 'corporate', label: 'Corporate', icon: Building2 },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setDonationType(id)}
                    className={clsx(
                      'flex items-center justify-center px-4 py-2 rounded-md flex-1 gap-2 transition-colors',
                      donationType === id
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {donationType === 'in-kind' ? (
                <div className="text-center py-8">
                  <Gift size={48} className="mx-auto text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">In-Kind Donations</h3>
                  <p className="text-gray-600 mb-6">
                    For in-kind donations, we'll need to collect additional information about your items.
                    Please click below to proceed to our detailed in-kind donation form.
                  </p>
                  <RouterLink to='/drop-points'>
                  <button
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue to In-Kind Donation
                  </button>
                </RouterLink></div>
              ) : (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                      placeholder="Street Address"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Amount
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {amounts.map((amount) => (
                        <button
                          key={amount}
                          className="py-3 px-4 border rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Tax Benefits */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Card Number (for tax benefits)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter PAN"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;