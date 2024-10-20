import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProcessorCard = ({ name, description, onClick, image }) => (
    <div onClick={onClick} className="relative h-40 rounded-lg overflow-hidden cursor-pointer">
        <div className="absolute inset-0">
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className={`absolute inset-0 bg-black ${name.startsWith('Intel') ? "bg-opacity-75" : "bg-opacity-50" } flex flex-col items-center justify-center z-10`}>
            <span className="text-white text-2xl font-semibold mb-2 z-20 shadow-lg">{name}</span>
            <span className="text-white text-md text-center px-2 z-20 shadow-lg">{description}</span>
        </div>
    </div>
);

const ProcessorSection = () => {
    const navigate = useNavigate();

    const handleProcessorClick = (processor) => {
        const existingFilters = JSON.parse(localStorage.getItem('laptopFilters') || '{}');
        processor = processor.startsWith('Apple') ? processor.split(' ')[1] : processor;
        const newFilters = { ...existingFilters, processor, os: '', brand: '', price: '', ram: '', rating: '' };
        localStorage.setItem('laptopFilters', JSON.stringify(newFilters));
        navigate('/laptops/store', { state: { filters: newFilters } });
    };

    const processors = [
        { name: 'Intel Core i5', description: 'Ideal for Professional Use', image: '/images/intel.webp' },
        { name: 'Intel Core i7', description: 'Ideal for Business Use', image: '/images/intel.webp' },
        { name: 'AMD Ryzen 7', description: 'Ideal for Creators', image: '/images/amd.jpg' },
        { name: 'AMD Ryzen 9', description: 'Ideal for Gamers', image: '/images/amd.jpg' },
        { name: 'Apple M1', description: 'Ideal for Personal And Professional use', image: '/images/mac-logo.jpeg' },
        { name: 'Apple M2', description: 'Ideal for Students And Creators', image: '/images/mac-logo.jpeg' },
    ];

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Choose Your Preferred Processor</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {processors.map((processor) => (
                    <ProcessorCard
                        key={processor.name}
                        {...processor}
                        onClick={() => handleProcessorClick(processor.name)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProcessorSection;