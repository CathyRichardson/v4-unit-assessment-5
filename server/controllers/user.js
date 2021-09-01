const bcrypt = require('bcryptjs');


const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }
    const profile_pic = `https://robohash.org/${username}.png`;
    const db = req.app.get('db');
    const result = await db.user.find_user_by_username(username);
    const existingUser = result[0];
    if (existingUser) {
        return res.status(409).send('Username taken');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.user.create_user(username, hash, profile_pic);
    const user = registeredUser[0];
    req.session.user = { username: user.username, id: user.id, profile_pic: user.profile_pic };
    return res.status(201).send(req.session.user);
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    const foundUser = await db.user.find_user_by_username(username);
    const user = foundUser[0];
    if (!user) {
        return res.status(401).send('User  not found. Please register as a new user before logging in.');
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
        return res.status(403).send('Incorrect password');
    }
    req.session.user = { username: user.username, id: user.id, profile_pic: user.profile_pic };
    return res.send(req.session.user);
}

const logout = (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
}

const usersOnly = (req, res, next) => {
    if (!req.session.user) {
        return res.status(404).send('Please log in');
    }
    next();
}

const getUser = async (req, res) => {
    const { user } = req.session;
    return res.status(200).send(user);
}

module.exports = {
    register,
    login,
    logout,
    usersOnly,
    getUser
}