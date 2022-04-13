const db = require('../DBConnection')

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
            const dbRes = await db('EMPLOYES').where('ID',id);
            res.json(dbRes);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async postEmploye(req, res, next){
        try{
            const result = await db('EMPLOYES').insert(req.body);
            res.json(result)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async putEmploye(req, res, next){
        try{
            const {ID, ...rest} = req.body;
            const result = await db('EMPLOYES').update(rest).where("ID", ID)
            console.log(result)
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async deleteEmploye(req, res, next){
        try{
            const result = await db('EMPLOYES').where("ID", req.params.id).del();
            console.log(result);
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new EmpolyesController()