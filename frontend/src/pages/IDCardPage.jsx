import React, { useRef, useEffect, useState } from 'react';
import { Download, HeaterIcon as Helicopter, BadgeCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { useAuthStore } from '../store/useAuthStore';

function IDCardPage() {
  const { authUser } = useAuthStore();
  const [volunteerData, setVolunteerData] = useState({
    name: "Loading...",
    id: "VOL-0000-0000",
    role: "Volunteer",
    joinDate: "Loading...",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    qrData: "https://verify.helicooperator.org/vol/VOL-0000-0000"
  });

  useEffect(() => {
    if (authUser) {
      // Format the join date (assuming authUser.createdAt is a timestamp or date string)
      const joinDate = new Date(authUser.createdAt || Date.now());
      const formattedDate = joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      setVolunteerData({
        name: authUser.name || authUser.username || "Volunteer",
        id: `VOL-${new Date().getFullYear()}-${String(authUser.id || '0000').padStart(4, '0')}`,
        role: authUser.role || "Disaster Relief Volunteer",
        joinDate: formattedDate,
        profileImage: authUser.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        qrData: `https://verify.helicooperator.org/vol/${authUser.id || '0000'}`
      });
    }
  }, [authUser]);

  const cardRef = useRef(null);

  const handleDownload = () => {
    const card = cardRef.current;
    if (card) {
      // Use a library like html2canvas to capture the entire card
      html2canvas(card).then(canvas => {
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `${volunteerData.name} ID Card`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }).catch(err => {
        console.error("Error capturing or downloading the ID card:", err);
      });
    } else {
      console.error("Could not find the ID card element");
    }
  };
  
  return (
    <div className="min-h-screen bg-[#000F0B] flex flex-col items-center justify-center p-4">
      {/* ID Card Container */}
      <div ref={cardRef} id="id-card" className="w-full max-w-md bg-[#112221] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#054938] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Helicopter className="w-8 h-8 text-[#00E8CF]" />
            <h1 className="text-[#00E8CF] text-xl font-bold">HeliCooperator</h1>
          </div>
          <BadgeCheck className="w-6 h-6 text-[#22C55E]" />
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <img
              src={volunteerData.profileImage}
              alt={volunteerData.name}
              className="w-24 h-24 rounded-full border-4 border-[#094534] object-cover"
            />
            <div>
              <h2 className="text-[#F0F2F0] text-2xl font-bold">{volunteerData.name}</h2>
              <p className="text-[#3FEBD0] font-medium">{volunteerData.role}</p>
              <p className="text-[#F0F2F0] text-sm mt-1">ID: {volunteerData.id}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#094534] my-6"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-[#3FEBD0] text-sm">Join Date</p>
              <p className="text-[#F0F2F0]">{volunteerData.joinDate}</p>
            </div>
            <div>
              <p className="text-[#3FEBD0] text-sm">Status</p>
              <p className="text-[#22C55E] font-medium">Active</p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={volunteerData.qrData}
              size={128}
              level="H"
              includeMargin={true}
              id="id-card-qrcode"
            />
          </div>
        </div>

        {/* Download Button */}
        <div className="p-4 bg-[#054938] mt-4">
          
        </div>
      </div>
      <div className='flex flex-row gap-5 justify-center'>
      <button
            onClick={handleDownload}
            className="bg-[#22C55E] hover:bg-[#00BC4C] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <Download className="w-5 h-5" />
            Download ID Card
          </button>
          <a 
            href="https://chat.whatsapp.com/EAmJLXl32KwBM9I0kHGnln"
          className="bg-[#22C55E] hover:bg-[#00BC4C] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300">
            Join Whatsapp Community
          </a>
        </div>

      <p className="text-[#3FEBD0] mt-6 text-center max-w-md text-sm">
        This ID card is property of HeliCooperator. If found, please return to the nearest HeliCooperator facility.
      </p>
    </div>
  );
}

export default IDCardPage;