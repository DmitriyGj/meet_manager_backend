const db = require('../DBConnection')

class EmpolyesController {
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
                                ).from('EMPLOYES')
                                .leftJoin('POSTS',"POST_ID","POSTS.ID" )
                                .leftJoin('DEPARTAMENT','POSTS.DEPART_ID','DEPARTAMENT.ID');
            dbRes.forEach(item => Object.entries(item).forEach(([key,value] )=> item[key]=value.toString().trim()));
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }

    async getEmployeById(req, res, next){
        try{
            const id = req.params.id;
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

    async getMemberCards(req,res,next){
        try{
            const result = await db('MEMBER_CARDS').where("MEMBER_ID", req.params.id);
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

    async getChartInfo(req,res,next) {
        try {
            const emps = await db.select('ID',"NAME","LAST_NAME").from('EMPLOYES');
            const meetings = await db.select('*').from('MEETINGS');
            console.log(meetings)
            const result = []
            for(let employe of emps){
                const {ID} = employe;
                const meetingsOfEmploye = meetings.filter(item =>item.MEMBERS.includes(ID));
                result.push({...employe, count: meetingsOfEmploye.length})
            }
            res.json(result);
        }
        catch(error){
            console.log(error);
            next(error);
        }
    }

}

module.exports = new EmpolyesController()