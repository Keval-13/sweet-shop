import { Sweet } from "../model/sweet.model.js"

const addSweet = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;

        // check that all fields are there or not
        if (!name || !category || price == null || quantity == null) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check whether the value of price and quantity is as expected
        if (price < 0 || quantity < 0) {
            return res.status(400).json({ error: 'Price and quantity must be > 0' });
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
        const sweetsRes = await Sweet.find({});
    
        return res.status(200).json(sweetsRes);
    } catch (err) {
        console.log("Error in fetching sweets");
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export { addSweet, deleteSweet, getSweets };