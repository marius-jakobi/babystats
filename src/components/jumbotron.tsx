import Link from "next/link";

export default function Jumbotron() {
  return <>
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">baby stats</h1>
        <p className="col-md-8 fs-4">
          Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap.
          Check out the examples below for how you can remix and restyle it to your liking.
        </p>
        <Link className="btn btn-primary btn-lg" type="button" href="/auth/signin">Anmelden</Link>
        <Link className="btn btn-secondary btn-lg ms-3" type="button" href="/auth/signup">Registrieren</Link>
      </div>
    </div>
  </>
}