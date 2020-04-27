const handleProfile = (req, resp, db) => {
    const { id } = req.params;
    let found = false;
    console.log(id);

    db.select('*').from('users')
        .where({ id })
        .then(user => {
            if (user.length) {
                resp.json(user[0]);
            }
            else {
                resp.status(400).json('User not found')
            }
            found = true;
        }).catch(err => {
            console.log(err);

            resp.status(400).json('Error getting user')
        })
}

module.exports = {
    handleProfile : handleProfile
}