const db = require('../DBConnection')

//API
class EmpolyesController {
    //API GET all contacts
    async getEmployes(req, res, next ) {
        try{
            const dbRes = await db.select('EMPLOYES.ID as ID',
                                'EMPLOYES.NAME as NAME',
                                'EMPLOYES.LAST_NAME as LAST_NAME',
                                'EMPLOYES.PATRONYMIC as PATRONYMIC',
                                'EMPLOYES.PHONE as PHONE',
                                'POSTS.POST_NAME as POST_NAME',
                                'EMPLOYES.POST_ID as POST_ID',
                                'POSTS.DEPART_ID as DEPART_ID',
                                'DEPARTAMENT.NAME as DEPART_NAME',
                                'EMPLOYES.ADDRESS as ADDRESS',
                                'EMPLOYES.EMAIL as EMAIL',
                                ).from('EMPLOYES').leftJoin('POSTS',"POST_ID","POSTS.ID" ).leftJoin('DEPARTAMENT','POSTS.DEPART_ID','DEPARTAMENT.ID');
            console.log(dbRes);
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
            res.json(dbRes[0]);
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
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new EmpolyesController()