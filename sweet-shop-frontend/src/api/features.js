import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/sweet";


// For adding sweet
const addSweet = async (data) => {
    const res = await axios.post(`${BASE_URL}/`, data);
    return res.data;
};

// For deleting sweet
const deleteSweet = async ({sweetId}) => {
  const res = await axios.delete(`${BASE_URL}/${sweetId}`);
  return res.data;
};

// For get sweet by search, by sort price wise
const getSweets = async ({ name, category, minPrice, maxPrice }) => {
  const params = {};

  if (name) params.name = name;
  if (category) params.category = category;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;

  const res = await axios.get(BASE_URL, { params });
  return res.data;
};

// For purchase sweet
const purchaseSweet = async ({ sweetId, quantity }) => {
  const res = await axios.post(`${BASE_URL}/purchase`, { sweetId, quantity });
  return res.data;
};

// For restock the sweet
const restockSweet = async ({ sweetId, quantity }) => {
  const res = await axios.patch(`${BASE_URL}/restock`, { sweetId, quantity });
  return res.data;
};

export { addSweet, deleteSweet, getSweets, purchaseSweet, restockSweet };