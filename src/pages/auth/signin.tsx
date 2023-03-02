import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setIsSuccess(false);

    const target = event.target as typeof event.target & {
      email: { value: string },
      password: { value: string },
    };

    const email = target.email.value;
    const password = target.password.value;

    const res = await fetch("/api/auth/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    console.log(data);
    if (res.status === 403) {
      setError(data.msg);
    }
    
    setIsSubmitting(false);
  }

  return <>
    <h1>Anmelden</h1>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-Mail-Adresse</label>
        <input type="email" className="form-control" id="email" required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Passwort</label>
        <input type="password" className="form-control" id="password" required />
      </div>
      {error &&
        <p className="text-danger">{error}</p>
      }
      <button type="submit" className="btn btn-primary">Anmelden</button>
    </form>
    <p className="mt-3">
      Du hast noch kein Konto? Dann registriere dich <Link href="/auth/signup">hier</Link>.
    </p>
  </>
}