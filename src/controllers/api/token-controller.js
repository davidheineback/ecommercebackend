import jwt from 'jsonwebtoken'

/**
 * Encapsulates a controller.
 */
export class TokenController {
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

      jwt.verify(authToken, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'), (error, user) => {
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
}
