const setTokenCookie = (req, res, next) => {
    res.cookie("token", req.token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000
    });
    next();
}

export {setTokenCookie};