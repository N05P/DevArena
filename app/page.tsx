import React from 'react'
import ExploreButton from "@/components/ExploreButton";
import EventCard from "@/components/EventCard";
import {IEvent} from "@/database/event.model";
const BASE_URI= process.env.NEXT_PUBLIC_BASE_URI

const Page = async() => {

    const response =await  fetch(`${BASE_URI}/api/events`)
    const {event} = await  response.json();


    return (
        <section>
            <h1 className='text-center'>The Hub for Every Dev <br/> Event You can't Miss</h1>
            <p className='text-center mt-5'>Hackathons, Meetups, and Conferences , All in Once Place.</p>
            <ExploreButton />

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <ul className="events">
                    {
                        event&&event.length > 0 && event.map((event:IEvent)=>(
                            <li key={event.title}>
                                <EventCard {...event}/>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </section>
    )
}
export default Page
