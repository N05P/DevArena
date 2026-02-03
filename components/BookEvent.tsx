'use client'

import {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

const BookEvent = ({eventId,slug}:{eventId:string,slug:string}) => {

    const [email,setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {

        const {success} = await  createBooking({eventId,slug,email});
        if(success){
            setSubmitted(true);
            posthog.capture('new_event_booked',{eventId,slug,email});
        }
        else {
            console.log("error")
            posthog.captureException("Booking creation failed");
        }
    }
    return (
        <div id='book-event'>
            {
                submitted ? (
                    <p>Thanks you for signing up!</p>
                ):(
                    <form action={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Email Address</label>
                            <input type='email'
                                   value={email} onChange={(e)=> setEmail(e.target.value)}
                                   placeholder="Enter your email address"
                                   id='email'/>
                            <button type='submit' className='button-submit'>Submit</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}
export default BookEvent
