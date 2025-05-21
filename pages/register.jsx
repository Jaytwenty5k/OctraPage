import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import RegisterForm from '../components/RegisterForm';

export default function RegisterForm() {
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { username: form.username }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Benutzer manuell zur eigenen Tabelle hinzufügen
    const { error: dbError } = await supabase.from('users').insert({
      id: data.user.id,
      email: form.email,
      username: form.username
    });

    if (dbError) {
      setError(dbError.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Benutzername" onChange={handleChange} required />
      <input name="email" type="email" placeholder="E-Mail" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Passwort" onChange={handleChange} required />
      <button type="submit">Registrieren</button>
      {error && <p>Fehler: {error}</p>}
      {success && <p>Erfolgreich registriert!</p>}
    </form>
  );
}