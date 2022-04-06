const db = require('../DBconnection')

//API
class DepartamentController {
    //API GET all contacts
    async getDepartaments(req, res, next ) {
        try{
            const dbRes = await db.select('*').from('DEPARTAMENT');
            console.log(dbRes);
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
    //API GET contact by id
    async getDepartamentById(req, res, next){
        try{
            const id = req.params.id
            const dbRes = await db('DEPARTAMENT').where('ID',id);
            res.json(dbRes);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API POST new contacts
    async postDepartament(req, res, next){
        try{
            console.log(req.body)
            const {NAME} = req.body
            console.log(NAME)
            const result = await db('DEPARTAMENT').insert({NAME})
            console.log(result);
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API PUT contacts
    async putDepartament(req, res, next){
        try{
            const {name} = req.body
            const result = await db('DEPARTAMENT').insert({NAME:name})
            console.log(result);
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //Проверить
    //API DELETE contacts
    async deleteDepartament(req, res, next){
        try{

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new DepartamentController()