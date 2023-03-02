import Spinner from "@/components/spinner";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Signup() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors(null);
    setIsSubmitting(true);
    setIsSuccess(false);

    const target = event.target as typeof event.target & {
      email: { value: string },
      username: { value: string },
      password: { value: string },
      password_confirmation: { value: string },
    };

    const email = target.email.value;
    const username = target.username.value;
    const password = target.password.value;
    const password_confirmation = target.password_confirmation.value;

    if (password !== password_confirmation) {
      setIsSubmitting(false);
      setErrors(['Die Passwörter stimmen nicht überein.']);
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password })
    });
    
    const data = await res.json();

    if (res.status !== 201) {
      setErrors([data.msg])
    } else {
      setIsSuccess(true);
    }

    setIsSubmitting(false);
  }

  return <>
    <h1>Registrieren</h1>
    { isSuccess === false &&
      <>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-Mail-Adresse</label>
            <input type="email" className="form-control" name="email" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Benutzername</label>
            <input type="text" className="form-control" name="username" id="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Passwort</label>
            <input type="password" className="form-control" name="password" id="password" required minLength={8} maxLength={64} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Passwort wiederholen</label>
            <input type="password" className="form-control" name="password_confirmation" id="password_confirmation" />
          </div>
          { errors && 
            errors.map((err, idx) => <p className="text-danger" key={idx}>{err}</p>)
          }
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            { isSubmitting && <Spinner /> } Registrieren
          </button>
        </form>
        <p className="mt-3">
          Du hast bereits ein Konto? Dann melde dich <Link href="/auth/signin">hier</Link> an.
        </p>
      </>
    }
    { isSuccess &&
      <>
        <div className="alert alert-success" role="alert">Dein Account wurde erstellt.</div>
        <p><Link className="btn btn-primary" href="/auth/signin">Anmelden</Link></p>
      </>
    }
  </>
}