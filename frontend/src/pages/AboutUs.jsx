import React from 'react';
import '../aboutus.css';

const AboutUs = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About ResQnow</h1>
            <span className="head-style">🌍 Introduction to ResQnow</span>
            <p className="about-description">
                Disasters strike without warning, causing widespread devastation and putting lives at risk. ResQnow is a Real-time Disaster Alert and Relief Coordination Platform designed to enhance disaster response efficiency by integrating real-time alerts, emergency coordination, and resource management into a single, user-friendly system.

                By leveraging data from multiple sources, including government agencies, weather satellites, and local reports, ResQNOW provides instant alerts for earthquakes, floods, hurricanes, and other natural disasters. Additionally, it enables governments, NGOs, and volunteers to coordinate relief efforts effectively, ensuring that aid reaches those in need as quickly as possible.
            </p>
            <span className="head-style">🎯 Purpose of ResQnow</span>
            <p className="about-description">
                The primary objective of ResQnow is to minimize disaster-related losses by improving communication and resource allocation during emergencies. Our platform ensures that affected individuals receive timely alerts, while response teams can efficiently track damage, request aid, and manage essential supplies like food, medical kits, and shelter.

                By combining real-time disaster tracking with streamlined relief efforts, RESqure empowers communities and organizations to respond faster, smarter, and more effectively.
            </p>
            <span className="head-style">🛠️ Services Provided by ResQnow</span>
            <div className="about-description">
                <p>✅ A built-in SOS button enables users to send urgent distress signals, helping responders locate those in need.</p>
                <p>✅ Live Weather Forecasts Stay informed about real-time weather updates across India to prepare for upcoming threats.</p>
                <p>✅ Relief Coordination & Resource Management Aid organizations and local governments can track affected areas, request supplies, and distribute aid efficiently.</p>
                <p>✅ Volunteer & NGO Integration Connect with relief teams and volunteers to mobilize on-ground assistance effectively.</p>
                <p>✅ Damage Assessment & Reporting Authorities can assess damage levels through community reports, helping them allocate resources where they’re needed most.</p>
            </div>
            <div className="about-image-container">
                <img src="https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/4/2020/08/live-rescue-2020-2048x1152-primary-16x9-1.jpg" alt="About ResQNOW" className="about-image" />
            </div>
        </div>
    );
};

export default AboutUs;