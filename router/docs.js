const express = require("express")
const router = express.Router()
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const swaggerOpt = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '2022.06',
            description: 'Example API for Exam'
        }
    },
    apis: [
        './router/docs.js'
    ]
}

/**
 * @swagger:
 * components:
 *  schemas:
 *      Header:
 *          type: object
 *          properties:
 *              access-token:
 *                  type: string
 *                  value: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImV4cGlyZSI6MTY1NzA0NTEzODMwOH0.VyeyAk-LYe8ICv9P9KvD4fMAjbC65BMSNE6bF1s5Bzo
 *      User:
 *          type: object
 *          properties:
 *              id:
 *                  type: number
 *              email:
 *                  type: string
 *              name:
 *                  type: string
 *              verify:
 *                  type: boolean
 *              verifytoken:
 *                  type: string
 *              createdtime:
 *                  type: string
 *              updatedtime:
 *                  type: string
 *             
 * /auth/email/signup:
 *    post:
 *      tags:
 *      - Auth
 *      description: Email sign up
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  email:
 *                                      description: Email
 *                                      type: string
 *                                  password:
 *                                      description: Password
 *                                      type: string
 *                  examples:
 *                      Signup:
 *                          value:
 *                              data:
 *                                  email: test@123.com
 *                                  password: aB1456789*
 *      responses:
 *         200:
 *          description:  Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          accessToken:
 *                                              $ref: '#/components/schemas/Header/properties/access-token'
 *         
 * /auth/email/login:
 *    post:
 *      tags:
 *      - Auth
 *      description: Email login
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  email:
 *                                      description: Email
 *                                      type: string
 *                                  password:
 *                                      description: Password
 *                                      type: string
 *                  examples:
 *                      Login:
 *                          value:
 *                              data:
 *                                  email: test@123.com
 *                                  password: aB1456789*
*      responses:
 *         200:
 *          description:  Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          accessToken:
 *                                              $ref: '#/components/schemas/Header/properties/access-token'
 *         
 * /auth/oauth:
 *    post:
 *      tags:
 *      - Auth
 *      description: OAuth
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  provider:
 *                                      description: Provider
 *                                      type: string
 *                                  email:
 *                                      description: Email
 *                                      type: string
 *                                  name:
 *                                      description: Name
 *                                      type: string
 *                                  accessToken:
 *                                      description: OAuth Token
 *                                      type: string
 *                  examples:
 *                      OAuth:
 *                          value:
 *                              data:
 *                                  provider: GOOGLE
 *                                  email: test@123.com
 *                                  name: test
 *                                  accessToken: ya29.a0ARrdaM_rlgmKfB3ncvLEetMwS4sHW4tX
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                          email:
 *                                              type: string
 *                                          name:
 *                                              type: string
 *                                          verify:
 *                                              type: boolean
 *                                          verifytoken:
 *                                              type: string
 *                                          createdtime:
 *                                              type: string
 *                                          updatedtime:
 *                                              type: string
 *                                          accessToken:
 *                                              type: string
 *         
 * /statistics/signedUpTotal:
 *    get:
 *      tags:
 *      - Statistics
 *      description: Total number of users who have signed up
 *      produces:
 *          - application/json
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          number:
 *                                              type: number
 *         
 * /statistics/activeSessionTotal:
 *    get:
 *      tags:
 *      - Statistics
 *      description: Total number of users with active sessions today
 *      produces:
 *          - application/json
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          number:
 *                                              type: number
 * 
 * /statistics/activeSessionAverage:
 *    get:
 *      tags:
 *      - Statistics
 *      description: Average number of active session users in the last 7 days rolling
 *      produces:
 *          - application/json
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          number:
 *                                              type: number
 *         
 * /user/info:
 *    get:
 *      tags:
 *      - User
 *      description: User Info
 *      parameters:
 *          - in: header
 *            name: access-token
 *            schema:
 *              type: string
 *            required: true
 *            value: 
 *              $ref: '#/components/schemas/Header/properties/access-token/value'
 *      produces:
 *          - application/json
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                          email:
 *                                              type: string
 *                                          name:
 *                                              type: string
 *                                          verify:
 *                                              type: boolean
 *                                          verifytoken:
 *                                              type: string
 *                                          createdtime:
 *                                              type: string
 *                                          updatedtime:
 *                                              type: string
 *                                          loginCount:
 *                                              type: number
 *         
 * /user/resetPassword:
 *    post:
 *      tags:
 *      - User
 *      description: Reset password
 *      parameters:
 *          - in: header
 *            name: access-token
 *            schema:
 *              type: string
 *            required: true
 *            value: 
 *              $ref: '#/components/schemas/Header/properties/access-token/value'
 *      produces:
 *          - application/json
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  oldPassword:
 *                                      description: Old password
 *                                      type: string
 *                                  password:
 *                                      description: New Password
 *                                      type: string
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          userId:
 *                                              type: number
 * /user/sendVerifyEmail:
 *    get:
 *      tags:
 *      - User
 *      description: Send verify email
 *      parameters:
 *          - in: header
 *            name: access-token
 *            schema:
 *              type: string
 *            required: true
 *            value: 
 *              $ref: '#/components/schemas/Header/properties/access-token/value'
 *      produces:
 *          - application/json
 * 
 *      responses:
 *         200:
 *          description: Success response
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  info:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                          email:
 *                                              type: string
 *                                          name:
 *                                              type: string
 *                                          verify:
 *                                              type: boolean
 *                                          verifytoken:
 *                                              type: string
 *                                          createdtime:
 *                                              type: string
 *                                          updatedtime:
 *                                              type: string
 *                                          loginCount:
 *                                              type: number
 *                                       
 * /:
 *    get:
 *      tags:
 *      - Response URL & CODE
 *      description: Response Spec
 *      produces:
 *          - application/json
 *      responses:
 *          code:
 *              description: >
 *                  200: Success
 *                  407: Exception
 *                  404: Data is null or not exist
 *                  422: Data Validation Error
 *                  451: Field Validation Error
 *          msg:
 *              description: Error message
 *          errors:
 *              description: 451-Field Validation Error that fields
 *          type:
 *              description: 422-Data Validation Error the error code
 */

const swaggerDocs = swaggerJSDoc(swaggerOpt);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

module.exports = router