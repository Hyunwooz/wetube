import User from "../models/User";

export const getJoin = (req,res) => {
    res.render("join" , {pageTitle: "Join"});
};
export const postJoin = async (req,res) => {
    console.log(req.body);
    const {name,username,email,password,location} = req.body;
    const pageTitle = "Join"
    const usernameExists = await User.exists({ username });
    if(usernameExists) {
        return res.render("Join" , {pageTitle : pageTitle, errorMessage: "This username is already taken."});
    };
    const emailExists = await User.exists({ email });
    if(emailExists) {
        return res.render("Join" , {pageTitle : pageTitle, errorMessage: "This Email is already taken."});
    };
    await User.create({
        name,
        username,
        email,
        password,
        location,
    });

    return res.redirect("/login");
};
export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const login = (req,res) => res.send("Log In");
export const logout = (req,res) => res.send("Log Out");
export const see = (req,res) => res.send("See User");