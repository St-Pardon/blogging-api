require("dotenv").config();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { userModel } = require("../models/user.model");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("jwt_key"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = req.body;
        const user = await userModel.create({...data, email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
