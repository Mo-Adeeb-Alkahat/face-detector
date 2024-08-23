const handleRegister = (req, res, db, bcrypt) => {
    // const {email , name , password } = req.body or below
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // we use a transaction when we submit to a multiple databases 
    // trx is now instead of db
    db.transaction(trx => {
            trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0].email,
                            name: name,
                            joined: new Date()

                        }).then(user => {
                            res.json(user[0]);
                        })

                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))

}


module.exports = {
    handleRegister: handleRegister
};