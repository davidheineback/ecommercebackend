import createError from 'http-errors'
import { User } from '../../models/user.js'
import * as methodHandler from './method-controller.js'

/**
 * Encapsulates a controller.
 */
export class TokenController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)

      const payload = {
        sub: user.username,
        isAdmin: user.isAdmin
      }

      // Create the access token with the shorter lifespan.
      const accessToken = methodHandler.getAccessToken(payload)

      // Create the access token with the shorter lifespan.
      const refreshToken = methodHandler.getRefreshToken(payload)

      await User.setToken(user.username, refreshToken)
      res
        .status(200)
        .json({
          user: payload,
          access_token: accessToken,
          refresh_token: refreshToken
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.innerException = error

      next(err)
    }
  }

  /**
   * Logout a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {status} - Returns a status representing the logout proccess
   */
  async logout (req, res, next) {
    try {
      await User.logout(req.body.user)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authorize the user by validating the token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async authenticateToken (req, res, next) {
    console.log(req.route.path)
    try {
      let authToken
      if (req.body.access_token) {
        authToken = req.body.access_token
      } else {
        const authBearerHeader = req.headers.authorization
        authToken = authBearerHeader && authBearerHeader.split(' ')[1]
      }

      if (authToken == null) return res.sendStatus(401)
      const authObject = { body: req.body, secret: process.env.ACCESS_TOKEN_SECRET }
      const user = await User.findOne({ username: req.body.user.sub })
      const token = methodHandler.accessCheckCall(authObject, user)
      if (token) {
        res.status(200).json(token)
      } else {
        next()
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = await User.insert({
        username: req.body.username,
        password: req.body.password
      })

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.innerException = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.innerException = error
      }
      next(err)
    }
  }
}
