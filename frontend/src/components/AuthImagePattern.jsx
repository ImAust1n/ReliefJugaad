import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`aspect-[1] bg-primary/5 ${
                  i % 2 === 0 ? "animate-bounce" : "animate-ping"
                }`}
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  animationDelay: `${i%2 * 0.5}s`
                }}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
};
  
export default AuthImagePattern;