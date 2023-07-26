var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "377883117249-0h477cigf1c5n546tk3l05h49kboj2pa.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: [ 'profile' ],
      // callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // console.log(refreshToken)
      // console.log(accessToken)
      // console.log(profile)

      done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
