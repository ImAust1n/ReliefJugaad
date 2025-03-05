import React from 'react';

const HomeSection3 = () => {
    return (
        <section className="bg-[#112221] py-12">
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Donate?
            </h2>
            <p className="text-lg text-white mb-8">
              Your donation can make a significant impact. Here are some brief impact stories:
            </p>
            <div className="flex flex-wrap justify-center gap-6 xl:gap-36">
              {/* Story Card 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs transform hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-blue-600 mb-2">Story 1</h3>
                <p className="text-gray-700 mb-4">
                After the Nepal Earthquake in 2015, 14-year-old Aarti lost her school and home. Relief organizations set up 
                temporary learning centers and provided essentials like food and blankets. With donor support, earthquake-resistant 
                schools were built, allowing Aarti and her community to rebuild stronger. </p>
                <footer className="text-gray-500 text-sm">
                  Posted by: <span className="font-semibold">Unknown</span>
                </footer>
              </div>
              {/* Story Card 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs transform hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-green-600 mb-2">Story 2</h3>
                <p className="text-gray-700 mb-4">
                During the Assam Floods of 2022, the Das family, including a newborn, was trapped on their rooftop for 48 
                hours without food or water. Just as their home was about to collapse, a donor-funded rescue boat saved them. 
                Donations also provided food, medical aid, and shelter, proving how timely help can save lives.</p>
                <footer className="text-gray-500 text-sm">
                  Posted by: <span className="font-semibold">Unknown</span>
                </footer>
              </div>
              {/* Story Card 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs transform hover:scale-105 transition-transform">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-2">Story 3</h3>
                <p className="text-gray-700 mb-4">
                During Cyclone Fani in 2019, Kamala, an elderly woman, had no food for days. Volunteers set up a community 
                kitchen, feeding over 500 people daily. With support from donors, Kamala not only survived but became a 
                volunteer herself, helping others rebuild their lives </p>
                <footer className="text-gray-500 text-sm">
                  Posted by: <span className="font-semibold">Unknown</span>
                </footer>
              </div>
            </div>
          </div>
        </section>
      );
    };

export default HomeSection3;
