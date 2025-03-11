import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    text: "Hello! I'm Chatney, your Disaster Response Assistant. How can I help you today? Spill the Chutney!!!",
    isBot: true,
    timestamp: new Date(),
  },
];

const PREDEFINED_RESPONSES = {
  "earthquake": "⚠️ Earthquake Alert! A magnitude 5.2 earthquake was reported in Gujarat. 🚨 Emergency Actions:\n1️⃣ Move to open areas, away from buildings and power lines.\n2️⃣ If indoors, take cover under sturdy furniture.\n3️⃣ Follow official evacuation routes & emergency updates.\n📞 Call 1070 for urgent assistance.",

  "flood": "🌊 Flood Emergency in Kerala! Water levels have exceeded safety thresholds in multiple districts. 🚨 Immediate Actions:\n🏠 Seek higher ground immediately.\n📍 Relief camps set up in: Wayanad, Idukki, Alappuzha.\n📞 For rescue assistance, call 1070.\n🔔 Stay updated via official alerts.",

  "cyclone": "🌀 Severe Cyclone Alert for Odisha! Landfall expected in 24 hours. 🚨 Evacuation in Progress:\n🏠 Coastal areas must evacuate NOW.\n🏕️ Emergency shelters active in: Puri, Bhubaneswar, Cuttack.\n📞 Call 1070 for evacuation help.\n⚠️ Stay indoors if unable to evacuate & secure all doors/windows.",

  "wildfire": "🔥 Wildfire Emergency! Uncontrolled fires detected in Maharashtra. 🚨 What to Do:\n1️⃣ Evacuate immediately if in a high-risk area.\n2️⃣ Close all doors/windows to prevent smoke inhalation.\n3️⃣ Stay low to the ground if trapped in smoke.\n📞 Call 1070 or local fire services for help.",

  "tsunami": "🌊 Tsunami Warning Issued! Coastal areas at risk. 🚨 Immediate Actions:\n🏃 Move to higher ground NOW – do not wait!\n📻 Stay tuned for emergency broadcasts.\n🚫 Avoid beaches & low-lying areas.\n📞 Call 1070 for assistance.",

  "landslide": "⛰️ Landslide Alert! Heavy rainfall has triggered landslides in Himachal Pradesh. 🚨 Safety Instructions:\n🚷 Avoid traveling through hilly or unstable terrain.\n📍 Relief camps set up in affected areas.\n📞 Call 1070 if trapped or injured.",

  "tornado": "🌪️ Tornado Warning! High-speed winds detected in Uttar Pradesh. 🚨 Immediate Actions:\n🏠 Take shelter in a basement or an interior room.\n🚫 Stay away from windows and doors.\n📞 Call 1070 for urgent help.",

  "extreme heat": "☀️ Extreme Heatwave Alert! High temperatures expected in Rajasthan. 🚨 How to Stay Safe:\n🥤 Drink plenty of water, avoid caffeine/alcohol.\n🏡 Stay indoors between 12 PM - 4 PM.\n❄️ Use cooling shelters if needed.\n📞 Call 1070 for heat-related emergencies.",

  "help": "🆘 Need Immediate Help? Call 1070 (24/7 emergency hotline).\n📍 Provide your exact location.\n📞 Stay on the line for instructions.\n🚨 Follow evacuation orders if issued.\n🔔 Stay tuned for real-time updates.",

  "resources": "📦 Disaster Relief Resources Available:\n🚑 Emergency Medical Teams: 15 units\n⛵ Rescue Boats: 25 available\n🏕️ Relief Camps: 8 operational\n🍲 Food & Water Supply: Enough for 5,000 people\n💊 Medical Supplies: Fully stocked\n📞 For urgent needs, dial 1070.",  

  "power outage": "🔦 Major Power Outage Reported! Authorities are working to restore electricity. 🚨 What to Do:\n💡 Use battery-powered lights instead of candles.\n📱 Conserve phone battery – emergency use only.\n🚰 Store drinking water in case of extended outage.\n📞 Report outages to your local power provider.",

  "chemical_spill": "☣️ Chemical Spill Emergency! Toxic leak reported in industrial area. 🚨 Stay Safe:\n🛑 Evacuate the area immediately if advised.\n😷 Cover nose & mouth with a damp cloth.\n🚫 Avoid direct contact with contaminated surfaces.\n📞 Call 1070 for emergency guidance.",

  "pandemic": "🦠 Pandemic Safety Advisory! Stay vigilant against infectious diseases. 🚨 Health Guidelines:\n😷 Wear a mask in crowded areas.\n🧴 Sanitize hands frequently.\n🤒 If feeling sick, isolate & seek medical help.\n📞 Call 1070 for health-related assistance.",

  "road accident": "🚗 Major Road Accident Reported! Emergency teams are on-site. 🚨 What to Do:\n📍 If nearby, avoid the area for emergency access.\n🚑 If injured, call 1070 or emergency medical services.\n👀 Report reckless driving to authorities.",

  "save me": "🚨 Emergency Mode Activated! Please share your *location or nearest landmark* to receive personalized safety guidance.",
  
  "what should I do": "⚠️ Stay calm! We need your location to provide the best safety advice. Reply with your *city or district*.",
  
  "im in danger": "🆘 Help is on the way! Share your *exact location* or enable GPS so we can guide you to the nearest safe zone.",
};



const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    const lowercaseInput = input.toLowerCase();
    let botResponse = "I apologize, but I don't have specific information about that. For immediate assistance, please contact our emergency hotline at 1070.";

    // Check for keywords in the input
    Object.entries(PREDEFINED_RESPONSES).forEach(([keyword, response]) => {
      if (lowercaseInput.includes(keyword)) {
        botResponse = response;
      }
    });

    // Add bot response with a slight delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div id="chatbot" className="flex flex-col h-[600px] bg-bangladesh-green rounded-lg overflow-hidden mx-auto p-4 m-8">
      <div className="bg-forest p-4 m-8 flex items-center space-x-2 max-w-[80%]">
        <Bot className="text-caribbean-green" size={24} />
        <h2 className="text-xl font-semibold text-caribbean-green">Chatney Bot</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-[#112221] text-anti-flash-white'
                  : 'bg-[#112221] text-anti-flash-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-forest">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-dark-green text-anti-flash-white placeholder-gray-400 border border-basil focus:outline-none focus:border-caribbean-green"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-bangladesh-green text-anti-flash-white rounded-lg hover:bg-mountain-meadow transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;