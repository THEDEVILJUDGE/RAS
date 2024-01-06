const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('./userModel');

// Локальная стратегия для аутентификации
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Неверный email или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Неверный email или пароль' });
    }
  } catch (error) {
    return done(error);
  }
}));

// JWT стратегия для аутентификации
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key' // Замените на свой секретный ключ
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));
