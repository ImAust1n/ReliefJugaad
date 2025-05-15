import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const HomeSection3 = () => {
  const activeDisasters = [
    {
      id: 1,
      name: "Support Urgent Needs",
      passage:"Your donation provides immediate relief during disasters and crises—helping deliver food, water, shelter, and medical aid to those who need it most.",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Empower Communities",
      passage:"By donating, you help communities rebuild and recover, supporting long-term development, education, and self-sufficiency for affected families.",
      image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Be a Part of Change",
      passage:"Every contribution, big or small, creates a ripple effect of hope and humanity.Your support fuels the mission to build a better.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
  ];

    return (
      <section className="relative py-12 xl:pt-20 bg-gradient-to-br from-[#112221] via-[#16352c] to-[#1f4236] min-h-[100vh]">
        {/* Banner image */}
        <div className="w-full flex justify-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80"
            alt="Donate Banner"
            className="rounded-xl shadow-lg max-h-64 w-full object-cover object-center mx-auto"
            style={{maxWidth: '900px'}}
          />
        </div>
        <div className="text-center">
          <section className="container mx-auto px-4 md:px-6 py-10">
            <span className="text-3xl md:text-4xl font-extrabold text-antiflash mb-8 block">
              How You Can <span className="text-darkgreen">Donate?</span>
            </span>
            <p className="text-lg text-antiflash/80 mb-8 max-w-2xl mx-auto">
              Your donation, big or small, makes a real difference in the lives of those affected by disaster. Here’s how your support helps:
            </p>

            {/* How to Donate Steps */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
              <div className="flex flex-col items-center">
                <img src="https://img.icons8.com/ios-filled/100/21c87a/money-bag.png" alt="Choose Amount" className="mb-3 w-20 h-20" />
                <span className="text-antiflash font-semibold">Choose Amount</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://img.icons8.com/ios-filled/100/21c87a/edit-user-male.png" alt="Fill Details" className="mb-3 w-20 h-20" />
                <span className="text-antiflash font-semibold">Fill Details</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://img.icons8.com/ios-filled/100/21c87a/bank-cards.png" alt="Make Payment" className="mb-3 w-20 h-20" />
                <span className="text-antiflash font-semibold">Make Payment</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://img.icons8.com/ios-filled/100/21c87a/ok.png" alt="Get Confirmation" className="mb-3 w-20 h-20" />
                <span className="text-antiflash font-semibold">Get Confirmation</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
              {activeDisasters.map((disaster) => (
                <Card key={disaster.id} className="bg-darkgreen border-basil overflow-hidden group shadow-lg rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="relative h-52 flex items-center">
                    <img 
                      src={disaster.image} 
                      alt={disaster.name}
                      className="w-full h-full object-cover bg-white/50 transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-richblack/40 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h2 className="text-xl font-semibold text-antiflash drop-shadow">{disaster.name}</h2>
                      <p className="text-base font-normal text-antiflash mt-2 drop-shadow">
                        {disaster.passage}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {/* Call to Action Button */}
            <div className="mt-12 flex justify-center">
              <Button className="bg-[#21c87a] hover:bg-[#1da463] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-colors duration-200">
                Donate Now
              </Button>
            </div>
          </section>
        </div>
      </section>
    );
};

export default HomeSection3;
