import SweetView from './SweetView'
import AdminSweetView from './AdminSweetView'
import { useState } from 'react'
import { ShoppingCart, Package } from 'lucide-react';

export default function Home() {
    const [activeTab, setActiveTab] = useState("buy-sweet");

    return (
        <div className='h-screen w-screen flex flex-col items-center bg-neutral-50 font-montserrat'>
            <div className="text-center mb-4 pt-5">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Sweet Shop</h1>
            </div>
            <div className="flex justify-center mb-4">
                <div className="bg-white rounded-lg shadow-sm border p-1 flex">
                    <button
                        onClick={() => setActiveTab("buy-sweet")}
                        className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${activeTab === "buy-sweet"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                    >
                        <ShoppingCart className="w-4 h-4" /> Buy Sweet
                    </button>
                    <button
                        onClick={() => setActiveTab("add-stock")}
                        className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${activeTab === "add-stock"
                            ? "bg-blue-500 text-white"
                            : "text-gray-600 hover:text-blue-500"
                            }`}
                    >
                        <Package className="w-4 h-4" /> Add Stock
                    </button>
                </div>
            </div>
            
            <div className='w-4/5 h-full'>
                {
                    activeTab == "buy-sweet" ? <SweetView /> : <AdminSweetView />
                }
            </div>
        </div>
    )
}
