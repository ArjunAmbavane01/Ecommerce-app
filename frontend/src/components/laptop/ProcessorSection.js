import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProcessorCard = ({ name, description, onClick }) => (
    <div
        onClick={onClick}
        className="relative h-48 md:h-52 rounded-lg overflow-hidden group cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center p-3 transition-all duration-300 hover:shadow-lg "
    >
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-sm text-gray-300 text-center">{description}</p>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
    </div>
);

const ProcessorSection = () => {
    const navigate = useNavigate();

    const handleProcessorClick = (processor) => {
        processor = processor.startsWith('Apple') ? processor.split(' ')[1] : processor;
        navigate('/laptops/store', { state: { filters: { processor,os: '', brand: '', price: '', ram: '', rating: '' } } });
    };

    const intelProcessors = [
        { name: 'Intel Core i3', description: 'Ideal for Casual Use' },
        { name: 'Intel Core i5', description: 'Ideal for Professional Use' },
        { name: 'Intel Core i7', description: 'Ideal for Business Use' },
        { name: 'Intel Core i9', description: 'Ideal for Pros' },
    ];

    const amdProcessors = [
        { name: 'AMD Ryzen 3', description: 'Ideal for Personal Use' },
        { name: 'AMD Ryzen 5', description: 'Ideal for Students' },
        { name: 'AMD Ryzen 7', description: 'Ideal for Creators' },
        { name: 'AMD Ryzen 9', description: 'Ideal for Gamers' },
    ];

    const appleProcessors = [
        { name: 'Apple M1', description: 'Ideal for Personal And Professional use' },
        { name: 'Apple M2', description: 'Ideal for Students And Creators' },
        { name: 'Apple M2 Pro', description: 'Ideal for Students And Creators' },
    ];

    return (
        <section className="mb-12">
        <h2 className="text-4xl font-bold mb-10 text-center text-white">Choose Your Preferred Processor</h2>

        {/* Intel Processors Section */}
        <div
            className="w-full bg-cover bg-center py-5 mb-8"
            style={{ backgroundImage: "url('/images/intel-logo.webp')" }}
        >
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {intelProcessors.map((processor) => (
                        <ProcessorCard
                            key={processor.name}
                            {...processor}
                            onClick={() => handleProcessorClick(processor.name)}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* AMD Processors Section */}
        <div
            className="w-full bg-cover bg-center py-5 mb-8"
            style={{ backgroundImage: "url('/images/amd-logo.webp')" }} 
        >
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {amdProcessors.map((processor) => (
                        <ProcessorCard
                            key={processor.name}
                            {...processor}
                            onClick={() => handleProcessorClick(processor.name)}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Apple Processors Section */}
        <div
            className="w-full bg-cover bg-center py-5 mb-8"
            style={{ backgroundImage: "url('/images/mac-logo.jpeg')" }}
        >
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {appleProcessors.map((processor) => (
                        <ProcessorCard
                            key={processor.name}
                            {...processor}
                            onClick={() => handleProcessorClick(processor.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    </section>
    );
};

export default ProcessorSection;
