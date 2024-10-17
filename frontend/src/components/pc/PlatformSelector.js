import React from 'react';

const PlatformSelector = ({ platform, setPlatform }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">CHOOSE PLATFORM</h2>
      <div className="flex items-center space-x-4 mb-4">
        <label className="relative flex items-center text-white cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="intel"
            checked={platform === 'intel'}
            onChange={() => setPlatform('intel')}
            className="sr-only"
          />
          <span className="w-5 h-5 border-2 border-white rounded-full mr-2 flex items-center justify-center">
            {platform === 'intel' && <span className="w-3 h-3 bg-white rounded-full"></span>}
          </span>
          Intel
        </label>
        <label className="relative flex items-center text-white cursor-pointer">
          <input
            type="radio"
            name="platform"
            value="amd"
            checked={platform === 'amd'}
            onChange={() => setPlatform('amd')}
            className="sr-only"
          />
          <span className="w-5 h-5 border-2 border-white rounded-full mr-2 flex items-center justify-center">
            {platform === 'amd' && <span className="w-3 h-3 bg-white rounded-full"></span>}
          </span>
          AMD
        </label>
      </div>
      <button
        className="bg-white text-black font-semibold py-2 px-4 rounded"
        onClick={() => console.log('Add platform')}
      >
        ADD
      </button>
    </div>
  );
};

export default PlatformSelector;