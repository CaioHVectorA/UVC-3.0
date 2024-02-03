import { NextResponse } from "next/server";

export class ServerError {  
    constructor(message: string, status = 400) {
        return { message, status }
    } 
  }