const supabaseUrl = 'https://uxrlbdynjhcvnmlafeit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cmxiZHluamhjdm5tbGFmZWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3NTgxMjYsImV4cCI6MjA2MzMzNDEyNn0.u_P6r4wO0QBxtJALQ0h79ZnXgfbSnlM720lZmD9d8-E';

const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
        role: 'user'
      }
    }
  });

  const message = document.getElementById("message");
  if (error) {
    message.textContent = `Fehler: ${error.message}`;
    message.style.color = "red";
  } else {
    message.textContent = "Bitte bestätige deine E-Mail, um dich einzuloggen.";
    message.style.color = "green";
  }
});