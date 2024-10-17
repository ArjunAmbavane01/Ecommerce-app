import React, { useState } from 'react';
import PlatformSelector from './PlatformSelector';
import ComponentSelector from './ComponentSelector';
import BuildSummary from './BuildSummary';

const PCCustomizer = () => {
  const [platform, setPlatform] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState({});

  return (
    <div className="bg-[#f7f48a] min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">BUILD A PC</h1>
        <p className="mb-8 text-gray-700">
          Build your dream PC at the best price possible with theMVP configurator, our custom PC builder. Choose every part of your computer, experiment with different configurations and budgets, and download an instant quote. Assemble your perfect desktop PC in just a few clicks and get a tailored basic, gaming, or professional rig.
        </p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <div className="w-1/2 bg-white flex items-center justify-center p-8">
              <img
                src="/images/pc-build.jpeg"
                alt="Custom PC Build"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
            <div className="w-1/2 bg-gradient-to-b from-red-600 to-purple-800 p-8">
              <div className="bg-yellow-400 text-black font-semibold py-2 px-4 mb-4 inline-block">
                PLATFORM
              </div>
              <PlatformSelector platform={platform} setPlatform={setPlatform} />
              {platform && (
                <ComponentSelector
                  platform={platform}
                  selectedComponents={selectedComponents}
                  setSelectedComponents={setSelectedComponents}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">YOUR BUILD</h2>
          <BuildSummary selectedComponents={selectedComponents} />
        </div>
      </div>
    </div>
  );
};

export default PCCustomizer;