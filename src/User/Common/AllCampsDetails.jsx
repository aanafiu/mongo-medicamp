import { Button } from "@/components/ui/button";
import AllCamps from "@/Hooks/AllCamps";
import Loader from "@/User/Common/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";

const AllCampsDetails = () => {
    const { camps, loading } = AllCamps();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [gridColumns, setGridColumns] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const campsPerPage = 6; // Number of camps per page

    if (loading) {
        return <Loader />;
    }

    // Filter camps based on search input
    const filteredCamps = camps.filter((camp) =>
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.healthcareName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic
    const sortedCamps = [...filteredCamps].sort((a, b) => {
        if (sortOption === "most-registered") {
            return b.participantCount - a.participantCount;
        }
        if (sortOption === "camp-fees") {
            return a.fees - b.fees;
        }
        if (sortOption === "alphabetical") {
            return a.campName.localeCompare(b.campName);
        }
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedCamps.length / campsPerPage);
    const startIndex = (currentPage - 1) * campsPerPage;
    const paginatedCamps = sortedCamps.slice(startIndex, startIndex + campsPerPage);

    return (
        <div className="container mx-auto p-4">
            {/* Search Bar & Sorting Options */}
            <div className="box-border md:h-[50px] flex flex-col justify-between items-center md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search camps..."
                    className="p-2 md:flex-1 border rounded w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="p-2 border rounded"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="most-registered">Most Registered</option>
                    <option value="camp-fees">Camp Fees</option>
                    <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>

                <Button
                    className="p-2 font-semibold text-md text-white rounded"
                    onClick={() => setGridColumns(gridColumns === 3 ? 2 : 3)}
                >
                    {gridColumns === 3 ? "Switch to 2 Columns" : "Switch to 3 Columns"}
                </Button>
            </div>

            {/* Camps Grid */}
            <div className={`grid my-12 grid-cols-1 md:grid-cols-${gridColumns || 2} gap-y-10 gap-x-5`}>
                {paginatedCamps.map((camp) => (
                    <div key={camp._id} className="h-[100%] border-2 border-primary flex flex-col justify-between p-4 rounded-lg backdrop-filter bg-white backdrop-blur-md bg-opacity-20 shadow-md shadow-muted">
                        <img src={camp.image} alt={camp.campName} className="w-full h-[250px] object-fill rounded" />
                        <h2 className="text-2xl font-bold mt-2 whitespace-nowrap text-center">~{camp.campName}~</h2>
                        <p className="text-muted"><strong className='font-semibold text-accent'>Date & Time:</strong> {camp.dateTime}</p>
                        <p className="text-muted"><strong className='font-semibold text-accent'>Location:</strong> {camp.location}</p>
                        <p className="text-muted"><strong className='font-semibold text-accent'>Healthcare Professional:</strong> {camp.healthcareName}</p>
                        <p className="text-muted"><strong className='font-semibold text-accent'>Participants:</strong> {camp.participantCount}</p>
                        <p className="text-muted"><strong className='font-semibold text-accent'>Fees:</strong> ${camp.fees}</p>
                        <p className="text-muted mt-2">{camp.description.slice(0, 100)}...</p>
                        <Link to={`/user/allcamps/${camp._id}`} className="mt-3 flex justify-center items-center rounded">
                            <Button className="w-full text-lg hover:text-xl transition-all font-semibold text-white">
                                Details
                                <CiLocationArrow1 className="hover:text-2xl" />
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                    className={`px-4 py-2 text-white rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>

                <span className="font-semibold text-lg">{currentPage} / {totalPages}</span>

                <Button
                    className={`px-4 py-2 text-white rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AllCampsDetails;
