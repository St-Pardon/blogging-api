const { authenticate, use } = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

module.exports = { localStrategy, JWTstrategy, ExtractJWT, authenticate, use };
