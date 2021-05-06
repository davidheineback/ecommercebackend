import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../../models/user.js'

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
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      // Create the access token with the shorter lifespan.
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.REFRESH_TOKEN_LIFE
      })

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
   * Authorize the user by validating the token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async authenticateToken (req, res, next) {
    try {
      const authBearerHeader = req.headers.authorization
      const authToken = authBearerHeader && authBearerHeader.split(' ')[1]
      if (authToken == null) {
        return res.sendStatus(401)
      }

      jwt.verify(authToken, Buffer.from(process.env.SIGN_TOKEN_SECRET, 'base64'), (error, user) => {
        if (error) {
          return res.sendStatus(403)
        }
        req.user = user.sub
      })

      // Next middleware.
      next()
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
