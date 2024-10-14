export default (passport, User, LocalStrategy) => {
    passport.use('local', new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect username or password' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
}