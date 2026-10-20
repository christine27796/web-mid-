import { useState } from "react";
import "./App.css";

const services = [
  { id: 1, title: "Book Borrowing & Returning", text: "Borrow from thousands of titles and return them easily." },
  { id: 2, title: "Internet & Computer Access", text: "Free computers and Wi-Fi for research and study." },
  { id: 3, title: "Reading & Study Spaces", text: "Quiet, comfortable areas for individuals and groups." },
  { id: 4, title: "Workshops & Literacy Programmes", text: "Educational workshops for children, youth and adults." },
];

const events = [
  { id: 1, title: "Reading Competition", date: "15 November 2026", description: "Students compete to read and review the most books." },
  { id: 2, title: "Children's Storytelling Session", date: "22 November 2026", description: "A fun morning of stories and activities for kids." },
  { id: 3, title: "Community Literacy Workshop", date: "29 November 2026", description: "Free reading and writing support for adults." },
];

const books = [
  { id: 1, title: "Things Fall Apart", author: "Chinua Achebe", description: "A classic African novel about tradition and change." },
  { id: 2, title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", description: "A story of love and war during the Biafran conflict." },
  { id: 3, title: "A Long Walk to Freedom", author: "Nelson Mandela", description: "The inspiring autobiography of Nelson Mandela." },
];

function Header() {
  return (
    <header className="header">
      <h1>Bright Future Library</h1>
      <p>
        Our mission is to promote reading, support students, and give every
        resident access to educational resources.
      </p>
    </header>
  );
}

function Navbar() {
  const links = [
    ["Home", "home"],
    ["About Us", "about"],
    ["Services", "services"],
    ["Events", "events"],
    ["Featured Books", "books"],
    ["Contact Us", "contact"],
  ];
  return (
    <nav className="navbar">
      <ul>
        {links.map(([label, id]) => (
          <li key={id}>
            <a href={`#${id}`}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      {subtitle && <h4>{subtitle}</h4>}
      <p>{children}</p>
    </article>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } else {
      setSuccess(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>
        Full Name
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>
      <label>
        Email Address
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>
      <label>
        Message
        <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
        {errors.message && <span className="error">{errors.message}</span>}
      </label>
      <button type="submit">Send Message</button>
      {success && <p className="success">Thank you! Your message has been sent.</p>}
    </form>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main>
        <section id="home" className="section">
          <h2>Welcome to Bright Future Library</h2>
        </section>

        <section id="about" className="section">
          <h2>About Us</h2>
          <p>
            Bright Future Library is a newly established community library. It
            matters to our town because it gives everyone free access to books,
            technology and learning, helping students and residents grow.
          </p>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <div className="grid">
            {services.map((s) => (
              <Card key={s.id} title={s.title}>{s.text}</Card>
            ))}
          </div>
        </section>

        <section id="events" className="section">
          <h2>Upcoming Events</h2>
          <div className="grid">
            {events.map((ev) => (
              <Card key={ev.id} title={ev.title} subtitle={ev.date}>{ev.description}</Card>
            ))}
          </div>
        </section>

        <section id="books" className="section">
          <h2>Featured Books</h2>
          <div className="grid">
            {books.map((b) => (
              <Card key={b.id} title={b.title} subtitle={`by ${b.author}`}>{b.description}</Card>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact Us</h2>
          <address>
            Address: KG 123 St, Kigali<br />
            Phone: +250 788 000 000<br />
            Email: info@brightfuturelibrary.org
          </address>
          <ContactForm />
        </section>
      </main>
      <footer className="footer">© 2026 Bright Future Library</footer>
    </div>
  );
}
