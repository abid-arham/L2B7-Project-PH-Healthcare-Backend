
import { tr } from "zod/locales"
import { Role } from "../../generated/prisma/enums"
import config from "../config"
import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"
import { email } from "zod"
export const seedSuperAdmin = async () =>{
    try {
        const isSuperAdminExist = await prisma.user.findFirst({
            where:{
                role: Role.SUPER_ADMIN
            }
        })

        if(isSuperAdminExist){
            console.log("Super Admin already exists")
            return
        }
        const name = config.super_admin_name
        const email = config.super_admin_email
        const password = config.super_admin_password
        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error("Super Admin Email, Name, Password missing")
        }

        const superAdmin = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role: Role.SUPER_ADMIN,
                needPasswordChange: false,
                emailVerified: true,

            }
        })
        console.log("Super Admin created: ", superAdmin)
    } catch (error) {
        console.log(error)
        
    }
}


export const seedTesterAdmin = async()=>{
    try {
        const isTesterAdminExist = await prisma.user.findFirst({
            where:{
                role: Role.ADMIN
            }
        })

        if(isTesterAdminExist){
            console.log("Tester Admin already exists")
            return
        }
        const name = config.tester_admin_name
        const email = config.tester_admin_email
        const password = config.tester_admin_password
        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error("Tester Admin Email, Name, Password missing")
        }

        const testerAdmin = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role: Role.ADMIN,
                needPasswordChange: false,
                emailVerified: true,

            }
        })
        console.log("Super Admin created: ", testerAdmin)
    } catch (error) {
        console.log(error)
        
    }
}


export const seedTesterDoctor = async()=>{
    try {
        const isTesterDoctorExist = await prisma.user.findFirst({
            where:{
                role: Role.DOCTOR
            }
        })

        if(isTesterDoctorExist){
            console.log("Tester Doctor already exists")
            return
        }
        const name = config.tester_doctor_name
        const email = config.tester_doctor_email
        const password = config.tester_doctor_password
        const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error("Tester Doctor Email, Name, Password missing")
        }

        const testerDoctor = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role: Role.DOCTOR,
                needPasswordChange: false,
                emailVerified: true,

            }
        })
        console.log("Super Doctor created: ", testerDoctor)
    } catch (error) {
        console.log(error)
        
    }
}