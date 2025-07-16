import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";


const createUser =  async (payload: Partial<IUser>) => {
    // const {name, email, password} = payload;
    // const user = await User.create({
    //     name,
    //     email,
    //     password
    // });

    const {email, ...rest} = payload;

    const isUsertExist = await User.findOne({email});

    if (isUsertExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists");
    }

    const authProvider: IAuthProvider = {provider: "credentials", providerId: email as string}

    const user = await User.create({
        email,
        auths: [authProvider],
        ...rest
    })

    // const user = await User.create(payload);

    return user;
}


const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();

    return {
        data: users,
        meta: {
            total: totalUsers
        }
    };
};



export const UserService = {
    createUser,
    getAllUsers
}