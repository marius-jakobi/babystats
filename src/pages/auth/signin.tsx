import Link from "next/link";

export default function Signup() {
  return <>
    <h1>Anmelden</h1>
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-Mail-Adresse</label>
        <input type="email" className="form-control" id="email" required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Passwort</label>
        <input type="password" className="form-control" id="password" required />
      </div>
      <button type="submit" className="btn btn-primary">Anmelden</button>
    </form>
    <p className="mt-3">
      Du hast noch kein Konto? Dann registriere dich <Link href="/auth/signup">hier</Link>.
    </p>
  </>
}