import React, { useState } from 'react';
import { AlertTriangle, Waves, Thermometer, Cloud, Wind, Mountain, Brain, ArrowLeft, Flame, CloudLightning, CloudRain, Sun } from 'lucide-react';

interface DisasterGuide {
  type: string;
  icon: React.ReactNode;
  dos: string[];
  donts: string[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

function SurvivalGuide() {
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const disasterGuides: DisasterGuide[] = [
    {
      type: "Floods",
      icon: <Waves className="w-8 h-8" />,
      dos: [
        "Move to higher ground immediately",
        "Keep emergency kit ready",
        "Listen to weather updates",
        "Keep important documents in waterproof containers",
        "Follow evacuation orders promptly",
        "Store drinking water and non-perishable food",
        "Keep first-aid supplies handy"
      ],
      donts: [
        "Don't walk through flowing water",
        "Don't drive through flooded areas",
        "Don't touch electrical equipment if wet",
        "Don't ignore evacuation orders",
        "Don't drink flood water",
        "Don't use contaminated water",
        "Don't return home until authorities declare it safe"
      ],
      quiz: [
        {
          question: "What should you do first when a flood warning is issued?",
          options: [
            "Take pictures for social media",
            "Move to higher ground immediately",
            "Wait and watch",
            "Call all your friends"
          ],
          correctAnswer: 1
        },
        {
          question: "Which of these items should be in your flood emergency kit?",
          options: [
            "Video games",
            "Heavy furniture",
            "Waterproof torch and batteries",
            "Glass items"
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      type: "Heat Waves",
      icon: <Sun className="w-8 h-8" />,
      dos: [
        "Stay hydrated",
        "Stay indoors during peak hours",
        "Wear light-colored, loose clothing",
        "Use ORS solution",
        "Check on elderly neighbors",
        "Keep curtains closed during day",
        "Use fans and air conditioning if available"
      ],
      donts: [
        "Don't go out between 12-3 PM",
        "Don't leave children in parked cars",
        "Don't exercise during peak heat",
        "Don't drink alcohol",
        "Don't eat heavy meals",
        "Don't wear dark, tight clothing",
        "Don't ignore heat exhaustion symptoms"
      ],
      quiz: [
        {
          question: "What is the best time to stay indoors during a heat wave?",
          options: [
            "6 AM - 9 AM",
            "9 AM - 12 PM",
            "12 PM - 3 PM",
            "3 PM - 6 PM"
          ],
          correctAnswer: 2
        },
        {
          question: "Which type of clothing is best during a heat wave?",
          options: [
            "Dark and tight",
            "Light-colored and loose",
            "Waterproof",
            "Thick and warm"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      type: "Cyclones",
      icon: <Wind className="w-8 h-8" />,
      dos: [
        "Keep emergency kit ready",
        "Store drinking water",
        "Keep mobile phones charged",
        "Listen to weather updates",
        "Board up windows",
        "Keep important documents safe",
        "Follow evacuation instructions"
      ],
      donts: [
        "Don't go outside during storm",
        "Don't spread rumors",
        "Don't ignore warnings",
        "Don't use electrical appliances",
        "Don't venture into sea",
        "Don't stay near windows",
        "Don't park vehicles under trees"
      ],
      quiz: [
        {
          question: "What should you do when a cyclone warning is issued?",
          options: [
            "Go to the beach",
            "Open all windows",
            "Store drinking water",
            "Use electrical appliances"
          ],
          correctAnswer: 2
        },
        {
          question: "Which of these should you avoid during a cyclone?",
          options: [
            "Charging your phone",
            "Listening to weather updates",
            "Staying indoors",
            "Venturing into the sea"
          ],
          correctAnswer: 3
        }
      ]
    },
    {
      type: "Earthquakes",
      icon: <Mountain className="w-8 h-8" />,
      dos: [
        "Drop, Cover, and Hold On",
        "Stay away from windows",
        "Keep emergency kit ready",
        "Know safe spots in each room",
        "Have a family emergency plan",
        "Keep heavy objects on lower shelves",
        "Identify building exits"
      ],
      donts: [
        "Don't use elevators",
        "Don't run outside immediately",
        "Don't stand near buildings",
        "Don't use matches/lighters",
        "Don't spread rumors",
        "Don't stand near glass windows",
        "Don't use landline phones"
      ],
      quiz: [
        {
          question: "What is the correct immediate response during an earthquake?",
          options: [
            "Run outside",
            "Use elevator to evacuate",
            "Drop, Cover, and Hold On",
            "Stand near windows"
          ],
          correctAnswer: 2
        },
        {
          question: "Which is the safest place during an earthquake?",
          options: [
            "Under a sturdy table",
            "Near windows",
            "In an elevator",
            "Outside the building"
          ],
          correctAnswer: 0
        }
      ]
    },
    {
      type: "Landslides",
      icon: <Mountain className="w-8 h-8" />,
      dos: [
        "Listen for unusual sounds",
        "Watch for changes in water patterns",
        "Keep emergency supplies ready",
        "Know evacuation routes",
        "Monitor local news",
        "Plant ground cover on slopes",
        "Have an emergency communication plan"
      ],
      donts: [
        "Don't build near steep slopes",
        "Don't ignore evacuation orders",
        "Don't return to affected area immediately",
        "Don't remove plants from hillsides",
        "Don't block natural drainage ways",
        "Don't stay in vulnerable buildings",
        "Don't ignore unusual sounds or movement"
      ],
      quiz: [
        {
          question: "What should you watch for as a warning sign of landslides?",
          options: [
            "Birds flying away",
            "Changes in water patterns",
            "Strong winds",
            "Lightning"
          ],
          correctAnswer: 1
        },
        {
          question: "What should you do during a landslide warning?",
          options: [
            "Stay in your house",
            "Go to higher ground quickly",
            "Start digging trenches",
            "Call all neighbors"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      type: "Thunderstorms",
      icon: <CloudLightning className="w-8 h-8" />,
      dos: [
        "Stay indoors",
        "Unplug electrical appliances",
        "Close windows and doors",
        "Keep emergency lights ready",
        "Stay away from tall objects",
        "Listen to weather updates",
        "Have emergency contacts ready"
      ],
      donts: [
        "Don't use electrical equipment",
        "Don't take shelter under trees",
        "Don't use corded phones",
        "Don't touch metal objects",
        "Don't stay in open areas",
        "Don't swim or bathe",
        "Don't ignore weather warnings"
      ],
      quiz: [
        {
          question: "Where is the safest place during a thunderstorm?",
          options: [
            "Under a tall tree",
            "Inside a building",
            "In an open field",
            "Near a metal pole"
          ],
          correctAnswer: 1
        },
        {
          question: "What should you do with electrical appliances during a thunderstorm?",
          options: [
            "Keep them running",
            "Unplug them",
            "Use them normally",
            "Cover them with plastic"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      type: "Drought",
      icon: <Sun className="w-8 h-8" />,
      dos: [
        "Conserve water",
        "Install water-efficient fixtures",
        "Harvest rainwater",
        "Maintain food storage",
        "Plant drought-resistant crops",
        "Follow water restrictions",
        "Fix water leaks promptly"
      ],
      donts: [
        "Don't waste water",
        "Don't ignore water restrictions",
        "Don't leave taps running",
        "Don't wash vehicles frequently",
        "Don't overwater plants",
        "Don't use drinking water for cleaning",
        "Don't ignore government advisories"
      ],
      quiz: [
        {
          question: "What is the most important resource to conserve during a drought?",
          options: [
            "Electricity",
            "Water",
            "Food",
            "Fuel"
          ],
          correctAnswer: 1
        },
        {
          question: "Which practice helps conserve water during drought?",
          options: [
            "Daily car washing",
            "Installing water-efficient fixtures",
            "Watering lawn daily",
            "Taking long showers"
          ],
          correctAnswer: 1
        }
      ]
    },
    {
      type: "Forest Fires",
      icon: <Flame className="w-8 h-8" />,
      dos: [
        "Create defensible space around home",
        "Keep emergency supplies ready",
        "Follow evacuation orders immediately",
        "Keep important documents accessible",
        "Have an evacuation plan",
        "Monitor local news",
        "Keep water sources available"
      ],
      donts: [
        "Don't throw burning objects in forests",
        "Don't ignore evacuation orders",
        "Don't leave campfires unattended",
        "Don't burn waste in dry season",
        "Don't block access routes",
        "Don't return until declared safe",
        "Don't spread unverified information"
      ],
      quiz: [
        {
          question: "What should you do first when a forest fire approaches?",
          options: [
            "Take photos",
            "Follow evacuation orders",
            "Water the garden",
            "Call friends"
          ],
          correctAnswer: 1
        },
        {
          question: "How can you help prevent forest fires?",
          options: [
            "Burning trash in forest",
            "Following fire safety guidelines",
            "Leaving campfires unattended",
            "Smoking in forest areas"
          ],
          correctAnswer: 1
        }
      ]
    }
  ];

  const handleAnswerSubmit = (selectedAnswer: number) => {
    const currentQuiz = disasterGuides.find(d => d.type === selectedDisaster)?.quiz;
    if (currentQuiz && selectedAnswer === currentQuiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuiz && currentQuestion < currentQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setShowQuiz(false);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen bg-[#000F0B] text-[#F0F2F0] p-6  pt-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-[#00E8CF] text-4xl font-bold mb-4">
            Indian Disaster Preparedness Guide
          </h1>
          <p className="text-[#F0F2F0] text-lg">
            Essential dos and don'ts for common disasters in India
          </p>
          <a href="https://cms.bhubaneswarone.in/uploadDocuments/content/Disaster_Safety_Tips.pdf" download>
          <button
            className="mt-4 bg-[#22C55E] hover:bg-[#00BC4C] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Download Survival Guide
          </button>
          </a>
        </header>

        {!showQuiz ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {disasterGuides.map((disaster) => (
                <button
                  key={disaster.type}
                  onClick={() => setSelectedDisaster(disaster.type)}
                  className={`p-6 rounded-lg transition-all duration-300 ${
                    selectedDisaster === disaster.type
                      ? 'bg-[#112221] border-2 border-[#00BC4C]'
                      : 'bg-[#054938] hover:bg-[#112221] border-2 border-[#094534]'
                  }`}
                >
                  <div className="flex items-center justify-center mb-4">
                    {disaster.icon}
                  </div>
                  <h2 className="text-[#00E8CF] text-xl font-semibold mb-2">
                    {disaster.type}
                  </h2>
                </button>
              ))}
            </div>

            {selectedDisaster && (
              <div className="mt-12 bg-[#112221] rounded-lg p-8 border-2 border-[#094534]">
                <h3 className="text-[#00E8CF] text-2xl font-bold mb-6">
                  {selectedDisaster} Safety Guide
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[#00E8CF] text-xl font-semibold mb-4 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-[#22C55E]" />
                      Do's
                    </h4>
                    <ul className="space-y-3">
                      {disasterGuides
                        .find((d) => d.type === selectedDisaster)
                        ?.dos.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-[#F0F2F0]"
                          >
                            <span className="w-2 h-2 bg-[#22C55E] rounded-full mr-3" />
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#00E8CF] text-xl font-semibold mb-4 flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-[#00BC4C]" />
                      Don'ts
                    </h4>
                    <ul className="space-y-3">
                      {disasterGuides
                        .find((d) => d.type === selectedDisaster)
                        ?.donts.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-[#F0F2F0]"
                          >
                            <span className="w-2 h-2 bg-[#00BC4C] rounded-full mr-3" />
                            {item}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button
                    onClick={startQuiz}
                    className="bg-[#22C55E] hover:bg-[#00BC4C] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center mx-auto"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Take the Quiz
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 bg-[#112221] rounded-lg p-8 border-2 border-[#094534] max-w-2xl mx-auto">
            <button
              onClick={resetQuiz}
              className="text-[#00E8CF] hover:text-[#3FEBD0] mb-6 flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Guide
            </button>
            
            {!quizCompleted ? (
              <>
                <h3 className="text-[#00E8CF] text-2xl font-bold mb-6">
                  {selectedDisaster} Safety Quiz
                </h3>
                <div className="mb-8">
                  <p className="text-lg mb-4">
                    Question {currentQuestion + 1} of {disasterGuides.find(d => d.type === selectedDisaster)?.quiz.length}
                  </p>
                  <p className="text-xl mb-6">
                    {disasterGuides.find(d => d.type === selectedDisaster)?.quiz[currentQuestion].question}
                  </p>
                  <div className="space-y-4">
                    {disasterGuides
                      .find(d => d.type === selectedDisaster)
                      ?.quiz[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSubmit(index)}
                          className="w-full text-left p-4 rounded-lg bg-[#054938] hover:bg-[#00BC4C] transition-colors duration-300"
                        >
                          {option}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-[#00E8CF] text-2xl font-bold mb-6">Quiz Complete!</h3>
                <p className="text-xl mb-6">
                  Your score: {score} out of {disasterGuides.find(d => d.type === selectedDisaster)?.quiz.length}
                </p>
                <button
                  onClick={resetQuiz}
                  className="bg-[#22C55E] hover:bg-[#00BC4C] text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        <footer className="mt-12 text-center text-[#F0F2F0] opacity-75">
          <p>Stay prepared, stay safe. Keep this guide handy during emergencies.</p>
          <p className="mt-2">
            <a
              href="https://ndma.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3FEBD0] hover:text-[#00E8CF]"
            >
              Visit NDMA website for more information
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SurvivalGuide;
