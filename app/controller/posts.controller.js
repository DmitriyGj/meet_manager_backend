const db = require('../DBconnection')

//API
class PostsController {
    //API GET all contacts
    async getPosts(req, res, next ) {
        try{
            const dbRes = await db.select('*').from('POSTS');
            console.log(dbRes);
            res.json(dbRes);
        }
        catch(err) {
            next(err);
        };
    }
}

module.exports = new PostsController();