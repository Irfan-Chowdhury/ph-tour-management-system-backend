import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// const createUserFunction = async (req: Response, res: Response) => {
//     const user = await UserService.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//         message: "User Created Successfully",
//         user
//     })
// }

// type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

// const catchAsync = (fn : AsyncHandler) => (req: Request, res:Response, next:NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error:any) => {
//         console.log(error);
//         next(error);
//     });
// }



// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {    
//         // throw new Error("fake error");
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error");

//         const user = await UserService.createUser(req.body);

//         res.status(httpStatus.CREATED).json({
//             message: "User Created Successfully",
//             user
//         })
//     } catch (error:any) {
//         console.log(error);

//         // 1st Approch
//         // res.status(httpStatus.BAD_REQUEST).json({
//         //     message: `Something went worng !! ${error.message} From UserController`,
//         //     error
//         // })

//         // 2nd Approch
//         next(error);
//     }
// }
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // });

    sendResponse(res, {
        success : true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user
    });
});


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();

    // res.status(httpStatus.OK).json({
    //     success:true,
    //     message: "All Users Retrieved Successfully",
    //     data:users
    // });
    sendResponse(res, {
        success : true,
        statusCode: httpStatus.OK,
        message: "All users retrive Successfully",
        data: result.data,
        meta: result.meta,
    });
});





export const UserController = {
    createUser,
    getAllUsers
}


// route matching --> controller --> service --> model --> DB