import { Sweet } from "../model/sweet.model.js"

const addSweet = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;

        // check that all fields are there or not
        if (!name || !category || price == null || quantity == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check whether the value of price and quantity is as expected
        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        // Validate numbers
        if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
            return res.status(400).json({ error: 'Price and quantity must be valid numbers' });
        }

        if (parsedPrice < 0 || parsedQuantity < 0) {
            return res.status(400).json({ error: 'Price and quantity must be ≥ 0' });
        }

        const sweet = await Sweet.create({ name, category, price, quantity });

        return res.status(201).json(sweet);
    } catch (err) {
        console.log("Error in creating sweet");
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const deleteSweet = async (req, res) => {
    try {
        const { sweetId } = req.params;

        const deletedSweetRes = await Sweet.findByIdAndDelete(sweetId);

        if (!deletedSweetRes) {
            return res.status(404).json({ error: 'Sweet not found' });
        }

        return res.status(200).json(deletedSweetRes);
    } catch (err) {
        console.log("Error in deleting sweet");
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getSweets = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        const filter = {};

        if (name) {
            filter.name = { $regex: new RegExp(name, 'i') }; // case-insensitive partial match
        }

        if (category) {
            filter.category = { $regex: new RegExp(category, 'i') };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const sweetsRes = await Sweet.find(filter);

        return res.status(200).json(sweetsRes);
    } catch (err) {
        console.log("Error in fetching sweets");
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const purchaseSweet = async (req, res) => {
    try {
        const { sweetId, quantity } = req.body;

        // Validate input
        if (!sweetId || quantity == null) {
            return res.status(400).json({ error: "sweetId and quantity are required" });
        }

        if (quantity <= 0) {
            return res.status(400).json({ error: "Quantity must be greater than 0" });
        }

        const sweet = await Sweet.findById(sweetId);

        if (sweet.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient quantity" });
        }

        sweet.quantity -= quantity;
        await sweet.save();

        return res.status(200).json({ message: "Purchase successful", sweet });
    } catch (err) {
        console.log("Error in purchasing sweet");
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

const restockSweets = async (req, res) => {
    const { sweetId, quantity } = req.body;

    if (sweetId == null || quantity == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const parsedQuantity = Number(quantity);

    if (isNaN(parsedQuantity)) {
        return res.status(400).json({ error: 'Quantity must be valid numbers' });
    }

    if (parsedQuantity < 0) {
        return res.status(400).json({ error: 'Quantity must be ≥ 0' });
    }

    const sweetRes = await Sweet.findById(sweetId);

    if (!sweetRes) {
        return res.status(404).json({ error: 'Sweet not found!' });
    }

    sweetRes.quantity += parsedQuantity;

    await sweetRes.save();

    return res.status(200).json({ message: "Restock successful", sweetRes });
};

export { addSweet, deleteSweet, getSweets, purchaseSweet, restockSweets };