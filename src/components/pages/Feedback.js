import React from 'react';
import TextInput from "../atoms/TextInput";



function Feedback() {
  return ( 
    <div className="sectionsContainer">
        <section className='feedback'>
            <h1>Feedback</h1>
            <h3>Sorry to see you leave</h3>
            <p>Could you share some feedback so I can improve the site in the future?</p>
           
            <form action="https://formsubmit.co/onewiththeinternet@gmail.com" method="POST">
                <input type="email" name="email" placeholder='Your email' required />
                <TextInput placeholder="Write feedback here..." />
                <input type="hidden" name="_subject" value="Account Deletion Feedback" />
                <input className="feedback__submit" type={'submit'} value={"Send"} />
            </form>
        </section>
    </div>
  )
}

export default Feedback