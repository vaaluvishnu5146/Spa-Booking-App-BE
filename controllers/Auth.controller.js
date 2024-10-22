const { generateToken } = require("../jwt.util");
const UserModel = require("../model/User.model");

const AuthRouter = require("express").Router();

/**
 * METHOD = POST
 */
AuthRouter.post("/signin", async (request, response) => {
   const { email, password } = request.body;

   if (!email || !password) {
      return response.status(400).json({
        message: "Email or password is not provider!"
      });
   }

   try {
    const result = await UserModel.findOne({
        email
    });
    if (result && result._id) {
        if (result.password === password) {
            // generate JWT Token
            return response.status(200).json({
                token: generateToken({
                    name: result.name,
                    role: result.role,
                    permissions: result.permission
                }, result._id),
                message: "Sign in successful!"
            });
        } else {
            // generate JWT Token
            return response.status(401).json({
                message: "EmailId or Password is invalid!"
            });
        }
    } else {
        return response.status(404).json({
            message: "Account does not exists!!"
        });
    }
   } catch (error) {
        return response.status(500).json({
            message: "Something went wrong!!"
        });
   }

})

/**
 * METHOD = POST
 */
AuthRouter.post("/signup", async (request, response) => {
    try {
        const user = new UserModel(request.body);
        const result = await user.save();
        if (result && result._id) {
            return response.status(200).json({
                message: "Sign up successful"
            });
        } else {
            return response.status(400).json({
                message: "Something went wrong"
            });
        }
    } catch(error) {
        response.s
        return response.status(500).json({
            error: error.message,
            message: "Bad request!"
        })
    }
})

module.exports = AuthRouter;