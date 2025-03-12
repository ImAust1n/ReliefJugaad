import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Save, AlertTriangle, Home, Users, Car, Heart, Package } from 'lucide-react';

// Define data types
interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface UserProfile {
  id: string;
  name: string;
  location: {
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  household: {
    totalMembers: number;
    children: number;
    elderly: number;
    pets: number;
  };
  specialNeeds: string[];
  transportation: {
    hasVehicle: boolean;
    vehicleType?: string;
    fuelRange?: number;
    needsAssistance?: boolean;
  };
  medicalInfo: string[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  contactInfo: {
    phone: string;
    email: string;
  };
}

interface DisasterData {
  type: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  evacuationRoutes: {
    primary: string;
    alternative: string[];
  };
  shelters: {
    name: string;
    address: string;
    capacity: number;
    petFriendly: boolean;
    accessibilityFeatures: string[];
    currentStatus: 'open' | 'full' | 'closed';
  }[];
  timeToEvacuate: string;
  alertMessage: string;
}

// Mock disaster data - in a real application, this would come from an API or database
const DISASTER_DATABASE: Record<string, DisasterData[]> = {
  "hurricane": [
    {
      type: "hurricane",
      location: "Florida Coast",
      severity: "high",
      evacuationRoutes: {
        primary: "I-95 North",
        alternative: ["US-1 North", "Florida Turnpike"]
      },
      shelters: [
        {
          name: "Miami-Dade County Fair Expo Center",
          address: "10901 SW 24th St, Miami, FL 33165",
          capacity: 500,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "medical staff"],
          currentStatus: "open"
        },
        {
          name: "North Miami Senior High School",
          address: "13110 NE 8th Ave, North Miami, FL 33161",
          capacity: 350,
          petFriendly: false,
          accessibilityFeatures: ["wheelchair access"],
          currentStatus: "open"
        }
      ],
      timeToEvacuate: "24-72 hours when warning is issued",
      alertMessage: "Hurricane warning in effect. Prepare to evacuate low-lying areas."
    }
  ],
  "flood": [
    {
      type: "flood",
      location: "Kerala",
      severity: "extreme",
      evacuationRoutes: {
        primary: "NH-66 to higher elevation",
        alternative: ["NH-544", "NH-85"]
      },
      shelters: [
        {
          name: "Wayanad Relief Camp",
          address: "Government College, Wayanad",
          capacity: 300,
          petFriendly: true,
          accessibilityFeatures: ["medical staff"],
          currentStatus: "open"
        },
        {
          name: "Idukki Relief Center",
          address: "Municipal Building, Idukki",
          capacity: 250,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "medical staff"],
          currentStatus: "open"
        },
        {
          name: "Alappuzha Emergency Shelter",
          address: "Government School, Alappuzha",
          capacity: 400,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access"],
          currentStatus: "open"
        }
      ],
      timeToEvacuate: "Immediate",
      alertMessage: "Severe flood alert. Current water levels exceeding safety thresholds in multiple districts."
    }
  ],
  "wildfire": [
    {
      type: "wildfire",
      location: "California Coast",
      severity: "high",
      evacuationRoutes: {
        primary: "Highway 101 South",
        alternative: ["Pacific Coast Highway", "State Route 154"]
      },
      shelters: [
        {
          name: "Santa Monica High School",
          address: "601 Pico Blvd, Santa Monica, CA 90405",
          capacity: 450,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "medical staff"],
          currentStatus: "open"
        },
        {
          name: "Ventura County Fairgrounds",
          address: "10 W Harbor Blvd, Ventura, CA 93001",
          capacity: 800,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access"],
          currentStatus: "open"
        }
      ],
      timeToEvacuate: "2-6 hours depending on fire progression",
      alertMessage: "Wildfire evacuation order in effect. Pack N95 masks for smoke, keep vehicle fueled, and monitor wind direction."
    }
  ],
  "earthquake": [
    {
      type: "earthquake",
      location: "Gujarat",
      severity: "high",
      evacuationRoutes: {
        primary: "NH-48 to open areas",
        alternative: ["NH-64", "State Highway 41"]
      },
      shelters: [
        {
          name: "Gujarat Emergency Relief Center",
          address: "Civil Lines, Ahmedabad",
          capacity: 500,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "medical staff"],
          currentStatus: "open"
        },
        {
          name: "Bhuj Relief Camp",
          address: "Stadium Road, Bhuj",
          capacity: 400,
          petFriendly: true,
          accessibilityFeatures: ["medical staff"],
          currentStatus: "open"
        }
      ],
      timeToEvacuate: "Post-earthquake evacuation only if building unsafe",
      alertMessage: "Magnitude 5.2 earthquake reported. Stay away from buildings, move to open areas, follow official evacuation routes."
    }
  ],
  "tornado": [
    {
      type: "tornado",
      location: "Oklahoma",
      severity: "extreme",
      evacuationRoutes: {
        primary: "Highway 35 East",
        alternative: ["Highway 40", "State Road 77"]
      },
      shelters: [
        {
          name: "Central High School",
          address: "500 N Broadway, Moore, OK 73160",
          capacity: 350,
          petFriendly: false,
          accessibilityFeatures: ["wheelchair access", "storm shelter"],
          currentStatus: "open"
        },
        {
          name: "Community Center Shelter",
          address: "200 S Jones Ave, Norman, OK 73069",
          capacity: 200,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "storm shelter", "medical staff"],
          currentStatus: "open"
        }
      ],
      timeToEvacuate: "Shelter in place preferred; evacuate post-tornado if needed",
      alertMessage: "Tornado warning active. Seek immediate shelter in basement or interior room away from windows."
    }
  ],
  "cyclone": [
    {
      type: "cyclone",
      location: "Odisha Coast",
      severity: "extreme",
      evacuationRoutes: {
        primary: "NH-16 inland",
        alternative: ["NH-55", "State Highway 60"]
      },
      shelters: [
        {
          name: "Puri Cyclone Shelter",
          address: "Beach Road, Puri",
          capacity: 500,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "medical staff"],
          currentStatus: "open"
        },
        {
          name: "Bhubaneswar Relief Center",
          address: "Janpath, Bhubaneswar",
          capacity: 600,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access", "medical staff"],
          currentStatus: "open"
        },
        {
          name: "Cuttack Emergency Shelter",
          address: "College Square, Cuttack",
          capacity: 400,
          petFriendly: true,
          accessibilityFeatures: ["wheelchair access"],
          currentStatus: "open"
        }
      ],
      timeToEvacuate: "24 hours before expected landfall",
      alertMessage: "Severe cyclonic storm approaching. Expected landfall in 24 hours. Evacuation orders in place for coastal districts."
    }
  ]
};

// Mock emergency resources
const EMERGENCY_RESOURCES = {
  "medicalTeams": 15,
  "rescueBoats": 25,
  "reliefCamps": 8,
  "foodSupply": "5000 people",
  "medicalSupplies": "Well-stocked",
  "emergencyHotline": "1070"
};

// Define conversation flow states
type ConversationState = 
  | 'greeting' 
  | 'disaster_type' 
  | 'location' 
  | 'household_info' 
  | 'special_needs' 
  | 'transportation' 
  | 'contact_info' 
  | 'plan_ready' 
  | 'emergency_kit' 
  | 'general';

const INITIAL_MESSAGES: Message[] = [
  {
    text: "Hello! I'm SaamBot, your Disaster Response Assistant. I can help create a personalized evacuation plan for your household. What type of disaster are you most concerned about (hurricane, flood, wildfire, earthquake, tornado, cyclone)? Spill some Sambar",
    isBot: true,
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [conversationState, setConversationState] = useState<ConversationState>('disaster_type');
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({
    household: {
      totalMembers: 0,
      children: 0,
      elderly: 0,
      pets: 0
    },
    specialNeeds: [],
    transportation: {
      hasVehicle: false
    },
    medicalInfo: [],
    emergencyContacts: []
  });
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to process user input and determine next steps in conversation flow
  const processUserInput = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    // Check for general help commands that override normal flow
    if (lowercaseInput.includes('help') || lowercaseInput.includes('emergency')) {
      addBotMessage(`For immediate emergency assistance:
1. Call our 24/7 hotline: ${EMERGENCY_RESOURCES.emergencyHotline}
2. Share your exact location
3. Stay on the line for further instructions
4. Follow evacuation guidance if provided`);
      return;
    }
    
    if (lowercaseInput.includes('resources') || lowercaseInput.includes('available help')) {
      addBotMessage(`Available disaster relief resources:
- Emergency Medical Teams: ${EMERGENCY_RESOURCES.medicalTeams} units deployed
- Rescue Boats: ${EMERGENCY_RESOURCES.rescueBoats} available
- Relief Camps: ${EMERGENCY_RESOURCES.reliefCamps} operational
- Food & Water Supply: Sufficient for ${EMERGENCY_RESOURCES.foodSupply}
- Medical Supplies: ${EMERGENCY_RESOURCES.medicalSupplies}`);
      return;
    }
    
    // Handle conversation based on current state
    switch(conversationState) {
      case 'disaster_type':
        handleDisasterTypeInput(lowercaseInput);
        break;
      case 'location':
        handleLocationInput(input);
        break;
      case 'household_info':
        handleHouseholdInput(input);
        break;
      case 'special_needs':
        handleSpecialNeedsInput(input);
        break;
      case 'transportation':
        handleTransportationInput(lowercaseInput);
        break;
      case 'contact_info':
        handleContactInfoInput(input);
        break;
      case 'general':
      default:
        // Default response if we can't categorize the input
        addBotMessage("I'm not sure how to respond to that. If you need immediate assistance, please contact our emergency hotline at 1070.");
    }
  };
  
  // Handler for disaster type selection
  const handleDisasterTypeInput = (input: string) => {
    const disasterTypes = ["hurricane", "flood", "wildfire", "earthquake", "tornado", "cyclone"];
    let matchedDisaster = '';
    
    for (const disaster of disasterTypes) {
      if (input.includes(disaster)) {
        matchedDisaster = disaster;
        break;
      }
    }
    
    if (matchedDisaster) {
      setSelectedDisaster(matchedDisaster);
      setUserProfile(prev => ({...prev, disasterType: matchedDisaster}));
      
      addBotMessage(`You've selected ${matchedDisaster} as your primary concern. To provide you with a personalized evacuation plan, I need to know your location. Please share your city and state/province.`);
      setConversationState('location');
    } else {
      addBotMessage("I didn't recognize the disaster type. Please specify if you're concerned about a hurricane, flood, wildfire, earthquake, tornado, or cyclone.");
    }
  };
  
  // Handler for location input
  const handleLocationInput = (input: string) => {
    setUserProfile(prev => ({
      ...prev, 
      location: {
        address: input,
      }
    }));
    
    addBotMessage("Thank you for providing your location. Now I need information about your household. How many people are in your household? Do you have children under 12, elderly family members, or pets? Please provide details.");
    setConversationState('household_info');
  };
  
  // Handler for household information
  const handleHouseholdInput = (input: string) => {
    // Simple parsing logic for demonstration
    const totalMembersMatch = input.match(/(\d+) people|person|members|member/i);
    const childrenMatch = input.match(/(\d+) child|children/i);
    const elderlyMatch = input.match(/(\d+) elder|elderly|seniors/i);
    const petsMatch = input.match(/(\d+) pet|pets|dog|cat|dogs|cats/i);
    
    const household = {
      totalMembers: totalMembersMatch ? parseInt(totalMembersMatch[1]) : userProfile.household?.totalMembers || 0,
      children: childrenMatch ? parseInt(childrenMatch[1]) : userProfile.household?.children || 0,
      elderly: elderlyMatch ? parseInt(elderlyMatch[1]) : userProfile.household?.elderly || 0,
      pets: petsMatch ? parseInt(petsMatch[1]) : userProfile.household?.pets || 0
    };
    
    setUserProfile(prev => ({...prev, household}));
    
    addBotMessage("Do you or anyone in your household have special medical needs, mobility requirements, or other considerations that would affect evacuation?");
    setConversationState('special_needs');
  };
  
  // Handler for special needs input
  const handleSpecialNeedsInput = (input: string) => {
    const specialNeeds = input.toLowerCase().includes('yes') || input.toLowerCase().includes('have') 
      ? [input.replace(/^yes[,.]?\s*/i, '')] 
      : [];
    
    setUserProfile(prev => ({...prev, specialNeeds}));
    
    addBotMessage("Do you have access to a personal vehicle for evacuation? If yes, what type and approximately how far can you travel on a full tank? If no, would you need assistance with transportation?");
    setConversationState('transportation');
  };
  
  // Handler for transportation input
  const handleTransportationInput = (input: string) => {
    const hasVehicle = !input.includes('no') && !input.includes("don't") && !input.includes("dont");
    
    let transportation = {
      hasVehicle,
      needsAssistance: !hasVehicle
    };
    
    if (hasVehicle) {
      const carTypeMatch = input.match(/(car|sedan|suv|truck|van|jeep|vehicle)/i);
      transportation.vehicleType = carTypeMatch ? carTypeMatch[1] : 'vehicle';
      
      const rangeMatch = input.match(/(\d+)\s*(km|miles|kilometers)/i);
      if (rangeMatch) {
        transportation.fuelRange = parseInt(rangeMatch[1]);
      }
    }
    
    setUserProfile(prev => ({...prev, transportation}));
    
    addBotMessage("To complete your personalized evacuation plan and to send you emergency alerts, please provide your email address and/or phone number. This information will only be used for emergency notifications.");
    setConversationState('contact_info');
  };
  
  // Handler for contact information
  const handleContactInfoInput = (input: string) => {
    // Simple regex to extract email and phone
    const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = input.match(/(\+\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    
    const contactInfo = {
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : ''
    };
    
    setUserProfile(prev => ({...prev, contactInfo}));
    
    // Generate and present evacuation plan
    generateEvacuationPlan();
    setConversationState('plan_ready');
  };
  
  // Function to generate the evacuation plan based on user profile
  const generateEvacuationPlan = () => {
    if (!selectedDisaster || !DISASTER_DATABASE[selectedDisaster]) {
      addBotMessage("I'm sorry, but I couldn't generate an evacuation plan due to missing information. Please try again or contact emergency services directly at 1070.");
      return;
    }
    
    const disasterData = DISASTER_DATABASE[selectedDisaster][0]; // Use first entry for simplicity
    const profile = userProfile;
    
    // Find appropriate shelter based on user needs
    let recommendedShelter = disasterData.shelters[0];
    if (profile.household?.pets && profile.household.pets > 0) {
      const petFriendlyShelters = disasterData.shelters.filter(s => s.petFriendly);
      if (petFriendlyShelters.length > 0) {
        recommendedShelter = petFriendlyShelters[0];
      }
    }
    
    if (profile.specialNeeds && profile.specialNeeds.length > 0) {
      const accessibleShelters = disasterData.shelters.filter(
        s => s.accessibilityFeatures.includes("medical staff") || s.accessibilityFeatures.includes("wheelchair access")
      );
      if (accessibleShelters.length > 0) {
        recommendedShelter = accessibleShelters[0];
      }
    }
    
    // Generate personalized plan
    const plan = `
📋 PERSONALIZED EVACUATION PLAN FOR ${selectedDisaster.toUpperCase()} 📋

🚨 ALERT: ${disasterData.alertMessage}

🚗 EVACUATION ROUTES:
► Primary: ${disasterData.evacuationRoutes.primary}
► Alternatives: ${disasterData.evacuationRoutes.alternative.join(', ')}

🏫 RECOMMENDED SHELTER:
► ${recommendedShelter.name}
► Address: ${recommendedShelter.address}
► Pet-friendly: ${recommendedShelter.petFriendly ? 'Yes' : 'No'}
► Accessibility: ${recommendedShelter.accessibilityFeatures.join(', ')}

⏱️ TIMING: ${disasterData.timeToEvacuate}

👨‍👩‍👧‍👦 HOUSEHOLD CONSIDERATIONS:
${profile.household?.totalMembers ? `► Total members: ${profile.household.totalMembers}` : ''}
${profile.household?.children ? `► Children: ${profile.household.children} (bring comfort items, documentation)` : ''}
${profile.household?.elderly ? `► Elderly: ${profile.household.elderly} (ensure medications, mobility aids)` : ''}
${profile.household?.pets ? `► Pets: ${profile.household.pets} (bring carriers, food, water, documentation)` : ''}
${profile.specialNeeds && profile.specialNeeds.length > 0 ? `► Special needs: ${profile.specialNeeds.join(', ')}` : ''}

🚙 TRANSPORTATION:
${profile.transportation?.hasVehicle 
  ? `► Using your ${profile.transportation.vehicleType || 'vehicle'}
► Ensure full fuel tank before evacuation
${profile.transportation.fuelRange ? `► Range on full tank: ~${profile.transportation.fuelRange} miles/km` : ''}` 
  : `► Public transportation assistance needed
► Contact emergency services at 1070 for evacuation assistance`}

🆘 EMERGENCY CONTACTS:
► Emergency Hotline: ${EMERGENCY_RESOURCES.emergencyHotline}
► Updates will be sent to: ${profile.contactInfo?.phone || 'your phone'} and ${profile.contactInfo?.email || 'your email'}

🎒 EMERGENCY KIT CHECKLIST:
► Water (1 gallon per person daily for 3 days)
► Non-perishable food
► Medications and first aid supplies
► Flashlight and batteries
► Important documents in waterproof container
► Cash
► Change of clothing
► Battery-powered radio
${profile.household?.pets ? '► Pet food, water, and supplies' : ''}
${profile.specialNeeds && profile.specialNeeds.length > 0 ? '► Special medical supplies and equipment' : ''}

This plan has been customized based on your information. Stay safe and follow official instructions during an emergency.
`;
    
    addBotMessage(plan);
    addBotMessage("Your personalized evacuation plan is ready! I've also sent this information to your provided contact details. Do you need any additional information about emergency kits or evacuation procedures?");
  };
  
  // Helper to add bot message
  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      text,
      isBot: true,
      timestamp: new Date()
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    
    // Process user input with slight delay to simulate thinking
    setTimeout(() => {
      processUserInput(currentInput);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper function to get icon for profile info
  const getStateIcon = () => {
    switch(conversationState) {
      case 'disaster_type': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'location': return <Home className="text-blue-500" size={20} />;
      case 'household_info': return <Users className="text-green-500" size={20} />;
      case 'special_needs': return <Heart className="text-red-500" size={20} />;
      case 'transportation': return <Car className="text-purple-500" size={20} />;
      case 'contact_info': return <Save className="text-teal-500" size={20} />;
      case 'plan_ready': return <Package className="text-orange-500" size={20} />;
      default: return <Bot className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="flex flex-col h-[600px] p-20 bg-[#112221] rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="text-green-500" size={24} />
          <h2 className="text-xl font-semibold text-green-500">SaamBot</h2>
        </div>
        <div className="flex items-center space-x-2 text-gray-300">
          {getStateIcon()}
          <span className="text-sm">
            {conversationState === 'disaster_type' && 'Select disaster type'}
            {conversationState === 'location' && 'Share your location'}
            {conversationState === 'household_info' && 'Household information'}
            {conversationState === 'special_needs' && 'Special needs'}
            {conversationState === 'transportation' && 'Transportation info'}
            {conversationState === 'contact_info' && 'Contact details'}
            {conversationState === 'plan_ready' && 'Plan generated'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-green-800 text-gray-100'
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

      <div className="p-4 bg-gray-800">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-green-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-green-700 text-gray-100 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;