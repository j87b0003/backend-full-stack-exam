const express = require('express')
const router = express.Router()
const User = require('../models/user')
const response = require('../tools/response')
const type = require('../tools/type')

/**
 * get Total number of users who have signed up
 */
router.get('/signedUpTotal',
    async (req, resp) => {
        let count = 0

        User.getAll().then(list => {

            if (type.not.undef(list)) {
                count = list.length
            }
            response.success(resp, {
                info: {
                    number: count
                }
            })
        }).catch(err => {
            response.err(resp, err)
        })

    }
)

/**
 * get Total number of users with active sessions today
 */
router.get('/activeSessionTotal',
    async (req, resp) => {
        let count = 0

        User.getTotalOfActiveSession().then(list => {

            if (type.not.undef(list)) {
                count = list.length
            }
            response.success(resp, {
                info: {
                    number: count
                }
            })
        }).catch(err => {
            response.err(resp, err)
        })

    }
)

/**
 * get Average number of active session users in the last 7 days rolling
 */
router.get('/activeSessionAverage',
    async (req, resp) => {
        const DAYS = 7
        let count = 0

        User.getTotalOfActiveSession(DAYS).then(list => {

            if (type.not.undef(list)) {
                count = list.length
            }
            response.success(resp, {
                info: {
                    number: count / DAYS
                }
            })
        }).catch(err => {
            response.err(resp, err)
        })

    }
)

module.exports = router