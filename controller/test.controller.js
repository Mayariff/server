const db = require('../db')

class testController {
    async createItem(req, res) {
        const {planned_date, title, quantity, distance} = req.body
        const text = `INSERT INTO test (planned_date, title, quantity, distance) values ($1,$2,$3,$4) RETURNING *`

        const values = [planned_date, title, quantity, distance]
        const newItem = await db.query(text, values)
        res.json(newItem.rows[0]);
    }

    async findAllItems(req, res) {
        try {
            let {page, size, column, sort, searchingValue} = req.query
            let sortStyle = ''
            switch (sort) {
                case 'less_then':
                    sortStyle = '<';
                    break;
                case 'greater_then':
                    sortStyle = '>';
                    break;
                case 'equal':
                    sortStyle = '=';
                    break;
                case 'contains':
                    sortStyle = 'LIKE';
                    break;
            }
            size = Number(size) || null
            page = Number(page) || null
            const offset = (size != null && page > 0) ? (page - 1) * size + 1 : 0


            let values = [size, offset]
            let text = `SELECT * FROM test LIMIT $1 OFFSET $2`

            if (column && sortStyle && searchingValue) {
                text = "SELECT * FROM test WHERE " + column + " " + sortStyle + " '%" + searchingValue + "%' " + "LIMIT $1 OFFSET $2"
            }

            const items = await db.query(text, values)
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.json(items.rows)
        } catch (e) {
            throw new Error(e.message);
        }

    }

    async findItemById(req, res) {
        const id = req.params.id
        const text = `SELECT * FROM TEST WHERE id=$1`
        const values = [id]
        const item = await db.query(text, values)
        res.json(item.rows[0])
    }

    async updateItem(req, res) {
        const {id, planned_date, title, quantity, distance} = req.body
        const text = `UPDATE test set planned_date =$1, title=$2, quantity=$3, distance=$4 WHERE id=$5 RETURNING *`
        const values = [planned_date, title, quantity, distance, id]
        const item = await db.query(text, values)
        res.json(item.rows[0])
    }

    async deleteItem(req, res) {
        const id = req.params.id
        const text = `DELETE FROM TEST WHERE id=$1`
        const values = [id]
        const item = await db.query(text, values)
        res.json(item.rows[0])
    }
}

module.exports = new testController()