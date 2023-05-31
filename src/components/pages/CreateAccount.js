import React from 'react';
import CreateAccountForm from '../organisms/CreateAccountForm';
import {Link} from 'react-router-dom'

function CreateAccount() {
  return (
    <div className='sectionsContainer'>
      <section className="createAccount">
        <h1>Create Account</h1>
        <p>
          Already have an account? <Link to='/login'>Log in here</Link>
        </p>
        <CreateAccountForm />
      </section>
    </div>
  )
}

export default CreateAccount