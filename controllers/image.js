const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '1c9d7eaac28b4edf9ca21d40f67e712d'
});

const handleAPICall = (req, resp) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            console.log(data);            
            resp.json(data);
        })
        .catch(err => {
            resp.status(400).json("Unable to work with API")
        })
}

const handleImage = (req, resp, db) => {
    const { id } = req.body;
    let found = false; 
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => resp.json(entries[0]))
        .catch(err => {
            console.log(err);
            resp.status(400).json("Error updating entires")
        })

}

module.exports = { handleImage, handleAPICall }