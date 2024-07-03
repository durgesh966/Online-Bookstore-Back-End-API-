const client = require("../database/PostgreSQL");
const bookSerialNumber = require("../middleware/bookSerialNumGenerator");

exports.uploadBookRoute = async (req, res) => {
    try {
        const serialNumber = bookSerialNumber();
        const { title, author, description, publisher, published_date, language, pages, price, quantity } = req.body;
        const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
        const gallery = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : null;

        if (!serialNumber || !title || !author || !description || !publisher || !published_date || !language || !pages || !price || !quantity || !photo || !gallery) {
            return res.status(400).json({ error: "Please check all input fields" });
        }

        const galleryJson = JSON.stringify(gallery);

        const result = await client.query(
            'INSERT INTO books (serialNumber, title, author, description, publisher, published_date, language, pages, price, quantity, photo, gallery) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [serialNumber, title, author, description, publisher, published_date, language, pages, price, quantity, photo, galleryJson]
        );
        const book = result.rows[0];

        res.status(201).json({ book: book, success: "Book added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateBookRoute = async (req, res) => {
    try {
        const { serialNumber } = req.params;
        const { title, author, description, publisher, published_date, language, pages, price, quantity } = req.body;
        const photo = req.files && req.files['photo'] ? req.files['photo'][0].filename : null;
        const gallery = req.files && req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : null;

        if (!serialNumber || !title || !author || !description || !publisher || !published_date || !language || !pages || !price || !quantity || !photo || !gallery) {
            return res.status(400).json({ error: "Please check all input fields" });
        }

        const book = await client.query('SELECT * FROM books WHERE serialNumber = $1', [serialNumber]);
        if (book.rows.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        // Convert gallery to a JSON array
        const galleryJson = JSON.stringify(gallery);

        const updateBookResult = await client.query(
            'UPDATE books SET title = $1, author = $2, description = $3, publisher = $4, published_date = $5, language = $6, pages = $7, price = $8, quantity = $9, photo = $10, gallery = $11 WHERE serialNumber = $12 RETURNING *',
            [title, author, description, publisher, published_date, language, pages, price, quantity, photo, galleryJson, serialNumber]
        );
        const updatedBook = updateBookResult.rows[0];

        return res.status(200).json({ book: updatedBook, message: "Book Info Update successful." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.deleteBookRoute = async (req, res) => {
    try {
        const { serialNumber } = req.params;
        console.log(serialNumber);
        if (!serialNumber) {
            return res.status(300).JSON({ error: "Book Serial Number Not Found" });
        }

        const BookResult = await client.query('DELETE FROM books WHERE serialNumber = $1 RETURNING *', [serialNumber]);
        const book = BookResult.rows[0];

        if (!book) {
            return res.status(404).json({ error: "Book not found." });
        }

        return res.status(200).json({ message: "Book deleted successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).JSON({ error: "internal Server Error" });
    }
};