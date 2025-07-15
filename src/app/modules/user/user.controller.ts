import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {    
        // throw new Error("fake error");
        // throw new AppError(httpStatus.BAD_REQUEST, "fake error");

        const user = await UserService.createUser(req.body);

        res.status(httpStatus.CREATED).json({
            message: "User Created Successfully",
            user
        })
    } catch (error:any) {
        console.log(error);

        // 1st Approch
        // res.status(httpStatus.BAD_REQUEST).json({
        //     message: `Something went worng !! ${error.message} From UserController`,
        //     error
        // })

        // 2nd Approch
        next(error);

    }
}

export const UserController = {
    createUser
}


// route matching --> controller --> service --> model --> DB