const User_Services = require('../services/user.service')
const User_T = new User_Services;
const joi = require('joi');
const { authenticationToken } = require('../auth/security.auth');

class Users {
    get_users = async (req, res) => {
        const result = await User_T.all_users();
        res.json({ result })
    }

    signup = async (req, res) => {
        const schemaValidate = joi.object({
            name: joi.string().max(30).required(),
            dob: joi.date(),
            email: joi.string().email().max(50).required(),
            password: joi.string().min(8).max(16).required(),
            phone_number: joi.string().min(10).max(20).required()
        })
        const schemaValidated = schemaValidate.validate(req.body);
        if (schemaValidated.error) {
            return res.status(415).json(schemaValidated.error.details)
        }
        try {
            const result = await User_T.singup(req.body);
            if (typeof (result) == 'object') {
                return res.status(201).json({ result });
            }
            res.status(208).json({ result });
        } catch (err) {
            res.status(400).json(err.message);

        }
    }

    login = async (req, res) => {
        const schemaValidate = joi.object({
            email: joi.string().email().max(50).required(),
            password: joi.string().min(8).max(16).required()
        })
        const schemaValidated = schemaValidate.validate(req.body);
        console.log(req.body);
        if (schemaValidated.error) {
            return res.status(415).json(schemaValidated.error.details)
        }
        try {
            const result = await User_T.login(req.body);
            if (typeof (result) == 'object') {
                const token = await authenticationToken(result);
                console.log(token, 'token');
                return res.status(202).cookie('token', token).json({ result, token });
            }
            res.status(404).json({ result });
        } catch (err) {
            res.status(400).json(err.message);

        }
    }

    change_pass = async (req, res) => {
        const schemaValidate = joi.object({
            email: joi.string().email().max(50).required(),
            password: joi.string().min(8).max(16).required()
        })
        const schemaValidated = schemaValidate.validate(req.body);
        if (schemaValidated.error) {
            return res.status(415).json(schemaValidated.error.details)
        }
        try {
            const result = await User_T.change_pass(req.body);
            if (typeof (result) == 'object') {
                return res.status(202).json({ result: 'Please verify your account by an OTP, sent on your email now.' })
            }
            res.status(404).json(result);
        } catch (err) {
            res.status(400).json(err.message);

        }
    }

    verify_acc = async (req, res) => {
        const schemaValidate = joi.object({
            email: joi.string().email().max(50).required(),
            otp: joi.number().min(6).required()
        })
        const schemaValidated = schemaValidate.validate(req.body);
        if (schemaValidated.error) {
            return res.status(415).json(schemaValidated.error.details)
        }
        try {
            const result = await User_T.verify_user(req.body);
            if (typeof (result) == 'object') {
                return res.status(202).json({ result })
            }
            res.status(406).json({ result });
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    delete_acc = async (req, res) => {
        try {
            const result = await User_T.delete_user(req.body.email);
            res.status(202).clearCookie('token').json({ result: 'This account is no longger now.' });
        } catch (err) {
            res.status(400).json(err.message);

        }
    }

    logout = async (req, res) => {
        await User_T.logout_formalities(req.user_id)
        res.clearCookie('token').json({ result: 'You are logged out now.' })
    }

}

module.exports = Users;

//VERIFIED :D.