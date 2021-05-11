import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "../model/user.model";

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.getByEmailAndPassword(email, password);
      console.log("auth", user);

      if (user) {
        if (user.firstTime) {
          await UserModel.removeFirstTime(user.userId);
        }
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Your login is invalid. Please try again",
        });
      }

      //   return user
      //     ? done(null, user)
      //     : done(null, false, {
      //         message: "Your login is invalid. Please try again",
      //       });
    } catch (err) {
      console.log("auth err", err);
      done(err, false);
    }
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.userId);
});

passport.deserializeUser(async function (userId, done) {
  let user = await UserModel.getUserById(userId);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found by id." }, null);
  }
});

export default passport.use(localLogin);
