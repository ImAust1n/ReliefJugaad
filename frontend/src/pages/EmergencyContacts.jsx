import React from 'react';

export default function EmergencyContacts() {
  const contacts = [
    { category: "Police", number: "100" },
    { category: "Fire Brigade", number: "101" },
    { category: "Ambulance", number: "108" },
    { category: "Disaster Helpline", number: "1070" },
    { category: "NDMA Helpline", number: "011-26701728" },
    { category: "Child Helpline", number: "1098" },
    { category: "NGO Support", number: "+91-9876543210" },
  ];

  return (
    <div className="min-h-screen bg-[#000F0B] text-white flex flex-col items-center p-6 pt-18 xl:pt-22">
      <h1 className="text-3xl font-bold text-[#054938] mb-6">Emergency Contacts</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <a
            key={index}
            style={{ textDecoration: 'none', color: 'white' }}
            href={`tel:${contact.number}`}
            className="p-4 bg-[#054938] rounded-lg shadow-lg flex justify-between items-center hover:bg-green-700 transition duration-300"
          >
            <span className="text-lg font-semibold">{contact.category}</span>
            <span className="text-xl font-bold">{contact.number}</span>
          </a>
          ))}
      </div>
    </div>
  );
}
