import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import {IEvent} from "@/database/event.model";
import Event from "@/database/event.model";

type RouteParams = {
    params:Promise<{
        slug:string
    }>
}

export async function GET(req:NextRequest, {params}:RouteParams):Promise<NextResponse>{
    try{
        await connectDB();
        const {slug} = await params;

        if(!slug || typeof slug!== 'string' || slug.trim()===''){
            return NextResponse.json({message:"Invalid or missing slug parameter"},{status:400})
        }

        const sanitizedSlug = slug.trim().toLowerCase();

        const event:IEvent | null = await Event.findOne({slug:sanitizedSlug}).lean();

        if(!event){
            return NextResponse.json({message:"No event found for event"},{status:404});
        }

        return NextResponse.json({message:"Event found for event",event});

    }
    catch(err){
        return NextResponse.json({message:"Something went wrong, please try again later"},{status:500});
    }
}