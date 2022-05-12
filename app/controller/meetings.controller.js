const db = require('../DBConnection')

//API
class MeetingsController {
    //API GET all contacts
    async getMeetings(req, res, next ) {
        try{
            const dbRes = await db.select('MEETINGS.ID as ID',
                                'MEETINGS.START_DATE as START_DATE',
                                'MEETINGS.END_DATE as END_DATE',
                                ).from('MEETINGS')
            dbRes.forEach(item => Object.entries(item).forEach(([key,value] )=> item[key]=value.toString().trim()));
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
    //API GET contact by id
    async getMeetingById(req, res, next){
        try{
            const id = req.params.id
            const meetingInfoDbRes = await db('MEETINGS')
                                            .where('ID',id);

            res.json(meetingInfoDbRes[0]);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async postMeeting(req, res, next){
        try{
            const {START_DATE, END_DATE, MEMBERS} = req.body;
            const result = await db('MEETINGS').insert({START_DATE, END_DATE, MEMBERS}).returning('ID');
            res.json({meeting:result[0].ID})
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async putMeeting(req, res, next){
        try{
            const {ID,  MEMBERS,...rest} = req.body;
            const parsedMembers = MEMBERS.map(id => +id);
            const result = await db('MEETINGS').update({...rest, MEMBERS:parsedMembers}).where("ID", ID).returning("*");
            res.json({meeting: result[0]});
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async deleteMeeting(req, res, next){
        try{
            const result = await db('MEETINGS').where("ID", req.params.id).del();
            res.json(result);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

}

module.exports = new MeetingsController()