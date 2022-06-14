const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const seding_otp = require('./opt_user.service');


class Users {
    async all_users() {
        try {
            const result = await prisma.user.findMany({
                include: { blogs: true }
            });
            return result;
        } catch (err) {
            return err.message;
        }
    }

    async singup(data) {
        try {
            data['password'] = await bcrypt.hash(data.password, 10);
            const result2 = await prisma.user.findUnique({
                where: { email: data.email }
            })

            if (!result2) {
                const result = await prisma.user.create({
                    data
                });
                return result;
            }
            return 'The similar user already exists!!'
        } catch (err) {
            return err.message;

        }
    }

    async login(data) {
        try {
            const result = await prisma.user.findUnique({
                where: { email: data.email }
            })
            if (result) {
                const secondLevel = await bcrypt.compare(data.password, result.password)
                if (result.otp && !result.verify) {
                    return 'Please verify your account first!!'
                }
                else if (result.first_time && secondLevel) {
                    this.change_pass(data)
                    return 'Please verify your account by an OTP, sent on your email first!!'
                }
                return secondLevel ? result : "Something is Invalid!!"
            }
            return "The user doesn't exists!!"
        } catch (err) {
            return err.message;
        }
    }

    async change_pass(data) {
        try {
            const result = await prisma.user.findUnique({
                where: { email: data.email }
            })
            if (result) {
                const otp = crypto.randomInt(100000, 999999);
                data = {
                    ...data,
                    password: await bcrypt.hash(data.password, 10),
                    otp
                }
                const result = await prisma.user.update({
                    where: { email: data.email },
                    data
                })
                console.log(result);
                const otp_result = seding_otp(data.email, otp);
                console.log(otp_result, 'otp');
                return result;
            }
            return 'Invalid Account!!'
        } catch (err) {
            return err.message;
        }
    }

    async delete_user(id) {
        try {
            const result = await prisma.user.delete({
                where: { email: id }
            });
            return result;
        } catch (err) {
            return err.message;
        }
    }

    async verify_user(data) {
        try {
            const result = await prisma.user.findUnique({
                where: { email: data.email }
            })
            if (result && result.otp === data.otp) {
                data = { verify: true }
                if (result.first_time) {
                    data['first_time'] = false;
                }
                await prisma.user.update({
                    where: { id: result.id },
                    data
                })
                return result;
            }
            return 'Something went wrong, please try again!!'
        } catch (err) {
            return err.message;

        }
    }

    async logout_formalities(id) {
        try {
            await prisma.user.update({
                where: { id },
                data: { verify: false, otp: null }
            })
        } catch (err) {
            return err.message;

        }
    }
}


module.exports = Users;

// VERIFIED TOO :D.