import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react';
import { Trash } from 'lucide-react';
import Toast from '../utils/Toast.jsx';
import { addSweet, deleteSweet, getSweets, restockSweet } from '../api/features.js';
import Loader from "../utils/Loader.jsx"

function AdminSweetView() {
  const [modal, setModal] = useState(false); // For identifying modal need to open or close
  const [modalFor, setModalFor] = useState(""); // For identifying which state show in modal (Restock or Confirmation for delete sweet)

  const [quantity, setQuantity] = useState(""); // Holds quantity which use while restock
  const [selectedSweetId, setSelectedSweetId] = useState(null); // Holds id  of sweet for deleting and restock
  const [showToast, setShowToast] = useState(false); // Store when to show message(Toast)
  const [message, setMessage] = useState(""); // Store message that display in message(Toast)
  const [allSweets, setAllSweets] = useState([]); // For storing all fetched sweets
  const [loader, setLoader] = useState(false); // For storing state of loader
  const [addSweetData, setAddSweetData] = useState({ // For maintaining data that use while adding new sweet
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  // For fetching all the sweets
  const getAllSweets = async () => {
    try {
      setLoader(true);
      const sweetRes = await getSweets({});
      setAllSweets(sweetRes.sweetsRes);
    } catch (error) {
      setMessage(error.response.data.error);
      setShowToast(true);
    } finally {
      setLoader(false);
    }
  }

  // For adding the sweet
  const handleAddSweet = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);
      const addedSweetRes = await addSweet(addSweetData);

      if (addedSweetRes && addedSweetRes.sweet._id) {
        await getAllSweets();

        // For showing success message 
        setMessage(addedSweetRes.message);
        setShowToast(true);
      }
    } catch (error) {
      console.log(error.response.data.erro)
    } finally {
      setLoader(false);
      setAddSweetData({
        name: '',
        category: '',
        price: '',
        quantity: ''
      });
    }

  }

  // For deleting the sweet
  const handleDeleteSweet = async () => {
    try {
      setLoader(true);
      setModal(false);
      const deletedSweetRes = await deleteSweet({ sweetId: selectedSweetId });
      setMessage(deletedSweetRes.message);
      setShowToast(true);

      // After delete show the display state
      if (deletedSweetRes && deletedSweetRes.deletedSweetRes._id) {
        await getAllSweets();
      }
    } catch (error) {
      console.log(error.response.data.error)
      setMessage(error.response.data.error);
      setShowToast(true);
    } finally {
      setLoader(false);
    }
  }

  // For restock the sweets
  const handleRestock = async () => {
    setModal(false);
    try {
      setLoader(true);
      const restockedSweet = await restockSweet({ sweetId: selectedSweetId, quantity });

      setMessage(restockedSweet.message);
      setShowToast(true);

      // After restock sweet display the latest state
      if (restockedSweet && restockedSweet?.sweetRes?._id) {
        await getAllSweets();
      }
    } catch (error) {
      console.log(error.response.data.error)
      setMessage(error.response.data.error);
      setShowToast(true);
    } finally {
      setLoader(false);
      setQuantity("");
      setSelectedSweetId(null);
    }
  }

  useEffect(() => {
    getAllSweets();
  }, []);

  return (
    <div className="relative w-full h-full pt-5 flex flex-col gap-5">
      {/* Loader (showing loading effect) */}
      {loader && <Loader />}

      {/* For showing messages */}
      <Toast message={message} showToast={showToast} setShowToast={setShowToast} />

      {/* Modal overlay */}
      {modal && <div onClick={() => setModal(false)} className="fixed inset-0 bg-black/20 bg-opacity-80 backdrop-blur-[1px] flex justify-center items-center z-50">
        {modalFor == "restock" ?
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-2 bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Restock Quantity</h2>
            <input
              type="text"
              placeholder="e.g. 2, 5, 10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
            <button onClick={handleRestock} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white' >Restock</button>
            <button onClick={() => setModal(false)} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white' >Cancel</button>
          </div>
          :
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-2 bg-white p-6 rounded-md shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <button onClick={handleDeleteSweet} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white' >Yes</button>
            <button onClick={() => setModal(false)} className='w-full cursor-pointer border border-gray-300 px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white' >Cancel</button>
          </div>
        }
      </div>}

      {/* For add the sweets */}
      <div className='w-full flex items-center'>
        <form onSubmit={handleAddSweet} className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-2">
          <input type="text" placeholder="Sweet name"
            required
            value={addSweetData.name}
            onChange={e => setAddSweetData({ ...addSweetData, name: e.target.value })}
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <input type="text" placeholder="Sweet category"
            required
            value={addSweetData.category}
            onChange={e => setAddSweetData({ ...addSweetData, category: e.target.value })}
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <input type="number" placeholder="Sweet price"
            required
            value={addSweetData.price}
            onChange={e => setAddSweetData({ ...addSweetData, price: e.target.value })}
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <input type="number" placeholder="Sweet quantity"
            required
            value={addSweetData.quantity}
            onChange={e => setAddSweetData({ ...addSweetData, quantity: e.target.value })}
            className="border h-full border-gray-300 px-3 py-2 rounded-md"
          />
          <button type='submit'
            className='h-full py-2 flex justify-center items-center gap-2 cursor-pointer border border-gray-300 bg-blue-500 hover:bg-blue-500 text-white px-5 rounded-md duration-200'>
            <Plus size={16} />Add
          </button>
        </form>
      </div>

      {/* For showing the sweets */}
      <div className="overflow-hidden border border-gray-300 rounded-md shadow-md overflow-x-auto">
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
            {
              allSweets.length > 0 ? allSweets.map(sweet => {
                return (
                  <tr key={sweet._id} className="border-t">
                    <td className="px-4 py-2">{sweet.name}</td>
                    <td className="px-4 py-2">{sweet.category}</td>
                    <td className="px-4 py-2">{sweet.price}</td>
                    <td className="px-4 py-2">{sweet.quantity}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setModalFor("deletesweet");
                          setSelectedSweetId(sweet._id);
                          setModal(true);
                        }}
                        className="flex items-center bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded-md"
                      >
                        <Trash size={15} />
                      </button>
                      <button
                        onClick={() => {
                          setModalFor("restock");
                          setSelectedSweetId(sweet._id);
                          setModal(true);
                        }}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-1 rounded-md"
                      >
                        Restock
                      </button>
                    </td>
                  </tr>
                )
              })
                :
                <tr className="border-t">
                  <td className="px-4 py-2 text-center" colSpan={5}>No sweets</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminSweetView