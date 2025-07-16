import { useEffect, useState } from 'react'
import { Search } from 'lucide-react';
import { getSweets, purchaseSweet } from "../api/features.js"
import Toast from '../utils/Toast.jsx';

function SweetView() {
    const [sweets, setSweets] = useState([]);
    const [modal, setModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [quantity, setQuantity] = useState("");
    const [selectedSweetId, setSelectedSweetId] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    // Actual call for get sweets
    const getSweet = async () => {
        try {
            setLoader(true);
            const sweetRes = await getSweets(filters);
            setSweets(sweetRes.sweetsRes);
        } catch (error) {
            console.log(error.response.data.error);
            setMessage(error.response.data.error)
            setShowToast(true);
        } finally {
            setLoader(false);
            setFilters({
                name: '',
                category: '',
                minPrice: '',
                maxPrice: ''
            });
        }
    }

    // For purchase the sweet api
    const handlePurchase = async () => {
        try {
            setModal(false);
            const purchasedSweet = await purchaseSweet({ sweetId: selectedSweetId, quantity })
            setMessage(purchasedSweet.message)
            setShowToast(true);
        } catch (error) {
            setMessage(error.response.data.error)
            setShowToast(true);
        } finally {
            setQuantity("");
            setSelectedSweetId(null);
        }
    }

    // For search and sort functionality api
    const handleSearch = () => {
        getSweet();
    };

    // To load all sweets when page load
    useEffect(() => {
        getSweet();
    }, []);

    return (
        <div className="relative w-full h-full pt-5 flex flex-col gap-5">
            {/* For showing messages */}
            <Toast message={message} showToast={showToast} setShowToast={setShowToast} />
            
            {/* Modal overlay */}
            {modal && <div onClick={() => setModal(false)} className="fixed inset-0 bg-black/20 bg-opacity-80 backdrop-blur-[1px] flex justify-center items-center z-50">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-col gap-2 bg-white p-6 rounded-md shadow-md w-80">
                    <h2 className="text-lg font-semibold mb-4">Enter Quantity</h2>
                    <input
                        type="text"
                        placeholder="Enter quantity..."
                        className="w-full border border-gray-300 px-3 py-2 rounded-md"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button onClick={handlePurchase} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-green-400 hover:bg-green-500 duration-200' >Submit</button>
                    <button onClick={() => setModal(false)} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-red-400 hover:bg-red-500 duration-200' >Cancel</button>
                </div>
            </div>}

            {/* For filter and search */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-2">
                {/* Name Search */}
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border border-gray-300 px-3 py-2 rounded-md"
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />

                {/* Category Search */}
                <input
                    type="text"
                    placeholder="Search by category"
                    className="border border-gray-300 px-3 py-2 rounded-md"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                />

                {/* Min Price */}
                <input
                    type="number"
                    placeholder="Min Price"
                    className="border border-gray-300 px-3 py-2 rounded-md"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />

                {/* Max Price */}
                <input
                    type="number"
                    placeholder="Max Price"
                    className="border border-gray-300 px-3 py-2 rounded-md"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />

                {/* Search Button */}
                <button
                    onClick={handleSearch} disabled={loader}
                    className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    <Search size={16} />
                    Search
                </button>
            </div>

            {/* To display sweets */}
            <div className="overflow-hidden border border-gray-300 rounded-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-blue-50 text-left">
                        <tr className="first:rounded-t-md">
                            <td className="px-4 py-2">Name</td>
                            <td className="px-4 py-2">Category</td>
                            <td className="px-4 py-2">Price</td>
                            <td className="px-4 py-2 text-center">Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sweets.length > 0 && sweets.map(sweet => {
                                return (
                                    <tr key={sweet._id} className="border-t">
                                        <td className="px-4 py-2">{sweet.name}</td>
                                        <td className="px-4 py-2">{sweet.category}</td>
                                        <td className="px-4 py-2">{sweet.price} rs/kg</td>
                                        <td className="px-4 py-2 flex justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedSweetId(sweet._id);
                                                    setModal(true)
                                                }}
                                                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                                            >
                                                Purchase
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SweetView