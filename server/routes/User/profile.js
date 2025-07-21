import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const route = Router();
const jwtpasskey = process.env.JWT_PASSKEY;
const prisma = new PrismaClient();

route.get('/profile', async (req, res) => {
  try {
    const { usertoken } = req.headers;

    if (!usertoken ) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing or invalid"
      });
    }

    const token = usertoken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, jwtpasskey);
    const userId = decoded.id;

    // Fetch user
    let user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: false,
        username: true,
        firstname: true,
        lastname: true,
        DOB: true,
        comments: true,
      }
    });

    const uniqueSolved=await prisma.solve.findMany({
      where: { userId },
      distinct:['problemId'],
      select: { problemId:true }
    })



    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user={
      ...user,
      solved:uniqueSolved
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: error.message
    });
  }
});

route.get('/submission',async (req,res)=>{
     const { usertoken } = req.headers;

    if (!usertoken) {
      return res.json({
        success: false,
        message: "Authorization token missing or invalid"
      });
    }


    const token = usertoken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, jwtpasskey);
    const userId = decoded.id;

    try {
      
      const response = await prisma.solve.findMany({
            where: {
              userId: userId
            },
            orderBy:{
              date:'desc'
            },
            select: {
              code: true,
              date: true,
              problem: {
                select: {
                  title: true
                }
              }
            }
          });
          
          return res.json({
            success:true,
            solved:response
          })

    } catch (error) {
      return res.json({
        success:false,
        message:error
      })
    }

})

route.get("/submission/:pid",async (req,res)=>{
    const { usertoken } = req.headers;
    const pid=req.params.pid;

    if (!usertoken) {
      return res.json({
        success: false,
        message: "Authorization token missing or invalid"
      });
    }

    if(!pid){
      return res.json({
        success: false,
        message: "Problem Id missing"
      });
    }

    const token = usertoken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, jwtpasskey);
    const userId = decoded.id;

    try {
      const response=await prisma.solve.findMany({
        where:{
          userId:userId,
          problemId:pid
        },
        select:{
          code:true,
          date:true
        }
      })

      return res.json({
        success:true,
        submissions:response
      })


    } catch (error) {
      return res.json({
        success:false,
        message:error
      })
    }


})


export default route
