import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import {  UserValidation } from "./auth.validation";
import { catchAsync } from "../../utils/catchAsync";
import z from "zod";

const router = Router();

const validateRequest = (zodSchema: z.ZodObject)=>{
	return catchAsync(async(req: Request, res:Response, next:NextFunction)=>{
	
		const payload = req.body ?? {}
		const result = zodSchema.safeParse(payload)
		console.log(result)
		if(!result.success){
			throw new Error(result.error.issues[0].message)
		}
		req.body = result.data
	next()
	
}
	)
}


router.post("/register", validateRequest(UserValidation.PatientRegistrationZodSchema) ,AuthController.registerPatient);
router.post("/login", validateRequest(UserValidation.LoginUserZodSchema), AuthController.loginUser);
router.get(
	"/me",
	auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
	AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
export const AuthRoutes = router;
