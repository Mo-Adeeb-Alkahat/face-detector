const handleProfileGet = (req, res, db) => {
    const { id } = req.params;

    //can type where({id})
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('not found')
        }
    }).catch(err => res.status(400).json('error getting user'))

}


module.exports = {
    // ecma 6 can now only type  handleProfileGet
    handleProfileGet: handleProfileGet
};