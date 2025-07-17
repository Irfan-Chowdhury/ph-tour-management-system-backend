import { NextFunction, Request, Response, Router } from "express";
// import {AnyZodObject} from "zod";
import { ZodObject} from "zod";

import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../../middlewares/validateRequest";
import AppError from "../../errorHelpers/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../../config/env";
import { AuthControllers } from "../auth/auth.controller";

// const validateRequest = (zodSchema:ZodObject) => async(req: Request, res:Response, next:NextFunction) => {
//     try {
//         // console.log("Old Body: ",req.body);
//         req.body =  await zodSchema.parseAsync(req.body);
//         // console.log("New Body: ",req.body);

//         next();
//     } catch (error) {
//         next(error);
//     }
// }


const router = Router();

// router.post("/register", UserController.createUser);
// router.post("/register", 
//     async (req: Request, res: Response, next: NextFunction) => {
//         // const createUserZodSchema = z.object({
//         //     name: z
//         //         // .string({ invalid_type_error: "Name must be string" })
//         //         .string()
//         //         .min(2, { message: "Name must be at least 2 characters long." })
//         //         .max(50, { message: "Name cannot exceed 50 characters." }),
//         //     email: z
//         //         // .string({ invalid_type_error: "Email must be string" })
//         //         .string()
//         //             // .email({ message: "Invalid email address format." })
//         //             .min(5, { message: "Email must be at least 5 characters long." })
//         //             .max(100, { message: "Email cannot exceed 100 characters." }),
//         //     password: z
//         //         // .string({ invalid_type_error: "Password must be string" })
//         //         .string()
//         //         .min(8, { message: "Password must be at least 8 characters long." })
//         //         .regex(/^(?=.*[A-Z])/, {
//         //             message: "Password must contain at least 1 uppercase letter.",
//         //         })
//         //         .regex(/^(?=.*[!@#$%^&*])/, {
//         //             message: "Password must contain at least 1 special character.",
//         //         })
//         //         .regex(/^(?=.*\d)/, {
//         //             message: "Password must contain at least 1 number.",
//         //         }),
//         //     phone: z
//         //         // .string({ invalid_type_error: "Phone Number must be string" })
//         //         .string()
//         //         .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
//         //             message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
//         //         })
//         //         .optional(),
//         //     address: z
//         //         // .string({ invalid_type_error: "Address must be string" })
//         //         .string()
//         //         .max(200, { message: "Address cannot exceed 200 characters." })
//         //         .optional()
//         // })

//         req.body = await createUserZodSchema.parseAsync(req.body);
//         // next();
//         console.log(req.body);

// }, UserController.createUser);



// router.post("/register", UserController.createUser);


// router.get("/all-users", UserController.getAllUsers);



export const checkAuth = (...authRoles:string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);

        if ((verifiedToken as JwtPayload).Role !== Role.ADMIN) {
            throw new AppError(403, "You are not permitted to view this route");
        }
        
        // if (!AuthControllers.includes(verifiedToken.role)) {
        //     throw new AppError(403, "You are not permitted to view this route!!!")
        // }
        // req.user = verifiedToken
        console.log(verifiedToken);

        next();

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}

router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);

router.get("/all-users", checkAuth("ADMIN", "SUPER_ADMIN"),  UserController.getAllUsers);



export const UserRoutes = router;