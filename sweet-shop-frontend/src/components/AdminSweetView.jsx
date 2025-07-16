import { useState } from 'react'
import { Plus } from 'lucide-react';
import { Trash } from 'lucide-react';


function AdminSweetView() {
  const [modal, setModal] = useState(false);

  return (
    <div className="relative w-full h-full pt-5 flex flex-col gap-5">
      
      {/* Modal overlay */}
      {modal && <div onClick={() => setModal(false)} className="fixed inset-0 bg-black/20 bg-opacity-80 backdrop-blur-[1px] flex justify-center items-center z-50">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-2 bg-white p-6 rounded-md shadow-md w-80">
          <h2 className="text-lg font-semibold mb-4">Enter Quantity</h2>
          <input
            type="text"
            placeholder="Type something..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <button onClick={() => alert("hello")} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-green-400 hover:bg-green-500 duration-200' >Restock</button>
          <button onClick={() => setModal(false)} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-red-400 hover:bg-red-500 duration-200' >Cancel</button>
        </div>
      </div>}

      {/* For add the sweets */}
      <div className='w-full h-10 flex items-center'>
        <form className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-2">
          <input type="text" placeholder="Sweet name..."
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <input type="text" placeholder="Sweet category..."
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <input type="text" placeholder="Sweet price..."
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <input type="text" placeholder="Sweet quantity..."
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <button onClick={() => alert("hello")}
            className='h-full flex justify-center items-center gap-2 cursor-pointer border border-gray-300 bg-blue-500 hover:bg-blue-500 text-white px-5 rounded-md duration-200'>
            <Plus size={16} />Add
          </button>
        </form>
      </div>

      {/* For showing the sweets */}
      <div className="overflow-hidden border border-gray-300 rounded-md">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-50 text-left">
            <tr className="first:rounded-t-md">
              <td className="px-4 py-2">Name</td>
              <td className="px-4 py-2">Category</td>
              <td className="px-4 py-2">Price</td>
              <td className="px-4 py-2">Quantity</td>
              <td className="px-4 py-2 text-center">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Halvo</td>
              <td className="px-4 py-2">Nut-based</td>
              <td className="px-4 py-2">15 rs/kg</td>
              <td className="px-4 py-2">100</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => setModal(true)}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  <Trash size={15} />
                </button>
                <button
                  onClick={() => setModal(true)}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                >
                  Restock
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminSweetView