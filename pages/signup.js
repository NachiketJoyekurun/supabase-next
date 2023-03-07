import Registratration from '@/components/buttons/Button';
import { supabase } from '@/utils/supabase';
import React, { useState } from 'react';

const Signup = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [form, setForm] = useState(initialState);
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form backdrop-blur-xl">
      <input
        type="text"
        value={email}
        name="email"
        onChange={handleChange}
        className="textfield"
        placeholder="Enter your email"
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleChange}
        className="textfield"
        placeholder="Enter your password"
      />

      <Registratration
        label={'Sign Up'}
        onClick={async () => {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) alert(error.message);
          alert('Check your email for the login link!');
          setForm(initialState);
        }}
      />
    </div>
  );
};

export default Signup;
