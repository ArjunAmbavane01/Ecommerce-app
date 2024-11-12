import { React, useState } from 'react';
import PlatformSelector from './PlatformSelector';
import ComponentSelector from './ComponentSelector';
import BuildSummary from './BuildSummary';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePCParts } from '../../contexts/PCPartsContext';
import CustomAlert from '../CustomAlert';

const PCCustomizer = () => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const { areAllComponentsSelected } = usePCParts();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handlePurchaseBuild = () => {
    if (!user) {
      setAlertMessage('Please log in to purchase a build.');
      setShowAlert(true);
      return;
    }

    if (!areAllComponentsSelected()) {
      setAlertMessage('Please select all components before purchasing.');
      setShowAlert(true);
      return;
    }

    navigate('/purchase-build');
  };

  return (
    <div className="bg-[#f7f48a] min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">BUILD A PC</h1>
        <p className="mb-8 text-lg text-gray-800">
          Build your dream PC at the best price possible with the MVP configurator, our custom PC builder. Choose every part of your computer, experiment with different configurations and budgets, and download an instant quote. Assemble your perfect desktop PC in just a few clicks and get a tailored basic, gaming, or professional rig.
        </p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <div className="w-1/3 bg-white flex items-center justify-center p-8">
              <img
                src="/images/pcBuild.jpeg"
                alt="Custom PC Build"
                className="max-w-full max-h-[400px] object-contain scale-150"
                style={{ transform: "scale(1.0)" }}
              />
            </div>
            <div className="w-2/3 bg-gradient-to-b from-red-600 to-purple-800 p-8">
              <div className="bg-yellow-400 text-black font-semibold py-2 px-4 mb-4 inline-block">
                PLATFORM
              </div>
              <PlatformSelector />
              <ComponentSelector />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-4xl font-bold mb-6 text-[#2c3e50]">YOUR BUILD</h1>
          <BuildSummary />
        </div>
        <button
          onClick={handlePurchaseBuild}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Purchase Build
        </button>
      </div>
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default PCCustomizer;