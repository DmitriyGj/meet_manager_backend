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
            console.log(dbRes);
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
            console.log(meetingInfoDbRes)
            const membersInfo = await db.select('EMPLOYES.ID')
                                            .from('MEMBER_CARDS')
                                            .leftJoin('EMPLOYES', 'MEMBER_ID', 'EMPLOYES.ID')
                                            .where("MEETING_ID", id);

            const info = {...meetingInfoDbRes[0], members: membersInfo.map(item=>item.ID)};

            res.json(info);
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async postMeeting(req, res, next){
        try{
            const {START_DATE, END_DATE, members} = req.body;
            const result = await db('MEETINGS').insert({START_DATE, END_DATE}).returning('ID');
            console.log(result[0].ID, members);
            const membersCards = []
            for(let member of members){
                console.log(member);
                const res = await db('MEMBER_CARDS').insert({MEMBER_ID:member.ID, MEETING_ID: result[0].ID}).returning('ID')
                membersCards.push( res[0].ID);
            }
            console.log(result)
            res.json({meeting:result[0].ID , membersCards})
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    async putMeeting(req, res, next){
        try{
            const {ID, ...rest} = req.body;
            const {meeting, members} = rest;
            const result = await db('MEETINGS').update(meeting).where("ID", ID).returning("*");
            const membersCards = [];
            for(let member in members){
                const res = await db('MEMBER_CARDS').update(member).WHERE("ID", member.CARD_ID).returning("*")
                res.push(res[0])
            }
            res.json({meeting: result[0], members: membersCards});
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