import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

import { profileLinks } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import { Earth } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";

const EarthFallback = () => (
  <div className="h-full min-h-[300px] rounded-lg border border-[#915eff]/30 bg-tertiary" aria-hidden="true" />
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const isEmailConfigured = emailServiceId && emailTemplateId && emailPublicKey;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailConfigured) {
      setStatus("Email form is not configured yet. Please use the direct links below.");
      return;
    }

    setLoading(true);
    setStatus("");

    emailjs
      .send(
        emailServiceId,
        emailTemplateId,
        {
          from_name: form.name,
          to_name: "Adel",
          from_email: form.email,
          to_email: "adelmohsen145@gmail.com",
          message: form.message,
        },
        emailPublicKey
      )
      .then(
        () => {
          setLoading(false);
          setStatus("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        () => {
          setLoading(false);
          setStatus("Something went wrong. Please use email, LinkedIn, or GitHub below.");
        }
      );
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        style={{ willChange: "transform, opacity" }}
        initial="hidden"
        animate="show"
        className="contact-panel flex-[0.75] bg-black-100 p-8 rounded-lg"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Adel Mohsen"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about the role, project, or opportunity."
              required
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-lg"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        {status && <p className="mt-5 text-secondary text-[14px]">{status}</p>}

        <div className="mt-6 flex flex-wrap gap-3 text-[14px]">
          <a className="hero-cta" href={profileLinks.email}>
            Email
          </a>
          <a className="hero-cta" href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hero-cta" href={profileLinks.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        initial="hidden"
        animate="show"
        className="contact-visual xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <ErrorBoundary label="Earth canvas error" fallback={<EarthFallback />}>
          <Earth />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
