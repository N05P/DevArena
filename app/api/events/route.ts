import {NextResponse,NextRequest} from "next/server";
    import connectDB from "@/lib/mongodb";
    import Event from "@/database/event.model"
import {v2 as cloudinary} from "cloudinary";

export async function POST(req:NextRequest) {
    try{
        await connectDB();
        const formData = await req.formData();
        let event;

        try{
            event = Object.fromEntries(formData.entries())
        }
        catch(err){
            return NextResponse.json({message:"Invalid message"},{status:500})
        }

        const file = formData.get('image') as File

        if(!file){
            return NextResponse.json({message:"Please upload a valid image"},{status:401})
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({resource_type:"image",folder:"DevEvent"},
                (error, result) => {
                if(error) {
                    return reject(error)
                }
                resolve(result)
            }).end(buffer)
        })

        event.image = (uploadResult as {secure_url:string}).secure_url;

        let tags = JSON.parse(formData.get('tags') as string)
        let agenda = JSON.parse(formData.get('agenda') as string)

        const createdEvent = await Event.create({...event,tags:tags,agenda:agenda});

        return NextResponse.json({message:"Data is created is successfully",event:createdEvent},{status:201})
    }
    catch(e){
        // @ts-ignore
        return NextResponse.json({message:"Event creation failed" , err: e instanceof Error ? e.message : 'unkonw'},{status:401})
    }
}

export async function GET(){

    try{
        await connectDB();
        const event = await Event.find().sort({createdAt:-1})

        return NextResponse.json({message:"Event Found",event},{status:200})
    }
    catch(e){
        return NextResponse.json({message:"No event found for this event",err: e },{status:500})
    }
}