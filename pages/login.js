import Registratration from '@/components/buttons/Button';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const router = useRouter();
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
        label={'Log In'}
        onClick={async () => {
          const { error } = await supabase.auth.signIn({
            email,
            password,
          });
          if (error) alert(error.message);
          router.push('/');
        }}
      />
    </div>
  );
};

export default Login;
