import AllCamps from '@/Hooks/AllCamps';
import Loader from '@/User/Common/Loader';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AllCampsDetails = () => {
    const { camps, loading } = AllCamps();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [gridColumns, setGridColumns] = useState(3); // Default 3-column layout

    if (loading) {
        return <Loader />;
    }

    // Filter camps based on search input
    const filteredCamps = camps.filter(camp =>
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.healthcareName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic
    const sortedCamps = [...filteredCamps].sort((a, b) => {
        if (sortOption === 'most-registered') {
            return b.participantCount - a.participantCount; // Most registered first
        }
        if (sortOption === 'camp-fees') {
            return a.fees - b.fees; // Lowest fee first
        }
        if (sortOption === 'alphabetical') {
            return a.campName.localeCompare(b.campName); // A-Z order
        }
        return 0;
    });

    return (
        <div className="container mx-auto p-4">
            {/* Search Bar & Sort Options */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search camps..."
                    className="p-2 border bg-transparent border-gray-300 rounded w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="p-2 border bg-transparent text-blue-400 border-gray-300 rounded"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="most-registered">Most Registered</option>
                    <option value="camp-fees">Camp Fees</option>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>

                <button
                    className="p-2 bg-blue-500 text-white rounded"
                    onClick={() => setGridColumns(gridColumns === 3 ? 2 : 3)}
                >
                    {gridColumns === 3 ? 'Switch to 2 Columns' : 'Switch to 3 Columns'}
                </button>
            </div>

            {/* Camps Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-${gridColumns} gap-4`}>
                {sortedCamps.map((camp) => (
                    <div key={camp._id} className="border flex flex-col justify-between items-center p-4 rounded backdrop-blur-md shadow-md">
                        <img src={camp.image} alt={camp.campName} className="w-full h-[250px] object-fill rounded" />
                        <h2 className="text-2xl font-bold mt-2">{camp.campName}</h2>
                        <p className="text-gray-600"><strong className='font-semibold text-white'>Date & Time:</strong> {camp.dateTime}</p>
                        <p className="text-gray-600"><strong className='font-semibold text-white'>Location:</strong> {camp.location}</p>
                        <p className="text-gray-600"><strong className='font-semibold text-white'>Healthcare Professional:</strong> {camp.healthcareName}</p>
                        <p className="text-gray-600"><strong className='font-semibold text-white'>Participants:</strong> {camp.participantCount}</p>
                        <p className="text-gray-600"><strong className='font-semibold text-white'>Fees:</strong> ${camp.fees}</p>
                        <p className="text-gray-700 mt-2">{camp.description.slice(0, 100)}...</p>
                        <Link
                            to={`/user/allcamps/${camp._id}`}
                            className="block text-center bg-blue-600 text-white py-2 px-3 mt-3 rounded"
                        >
                            Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCampsDetails;
