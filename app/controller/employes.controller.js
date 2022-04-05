const db = require('../DBconnection')

//API
class EmpolyesController {
    //API GET all contacts
    async getEmployes(req, res, next ) {
        try{
            const dbRes = await db.select('*').from('EMPLOYES');
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
    //API GET contact by id
    async getEmployeById(req, res, next){
        try{
            const id = req.params.id
            const dbRes = await db.select('*').from('EMPLOYES').where('id',id);
            res.json(dbRes);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API POST new contacts
    async postEmploye(req, res, next){
        try{
            const {website, phoneNumber, VK, inst} = req.body
            const result = await db.query(`INSERT INTO contacts (website, phoneNumber, VK, inst) values($1, $2, $3, $4) RETURNING *`, [website, phoneNumber, VK, inst])
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API PUT contacts
    async putEmploye(req, res, next){
        try{

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API DELETE contacts
    async deleteEmploye(req, res, next){
        try{

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new EmpolyesController()