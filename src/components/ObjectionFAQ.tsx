const faqs = [
  {
    question: "Do you need access to my systems today?",
    answer: "No. This is only a demo. A real setup would connect after approval."
  },
  {
    question: "Will AI send messages without me?",
    answer:
      "No. V1 drafts responses for approval. Auto-send can be added later only if you want it."
  },
  {
    question: "Can this connect to WhatsApp?",
    answer: "Yes. WhatsApp can be added in a production setup."
  },
  {
    question: "Can this work with my current tools?",
    answer:
      "Most likely. We can connect to forms, email, Google Sheets, CRMs, WhatsApp, and other tools depending on what you already use."
  },
  {
    question: "How much does it cost?",
    answer:
      "Simple systems usually start around $1,500. More complete setups are usually around $2,500 depending on the tools and workflow."
  },
  {
    question: "What happens after I say yes?",
    answer:
      "We do a short discovery call, confirm the workflow, build the production version, test it with your team, and launch."
  }
];

export function ObjectionFAQ() {
  return (
    <section className="page-shell py-16">
      <div className="max-w-3xl">
        <p className="eyebrow">Common Questions</p>
        <h2 className="mt-3 text-3xl font-black tracking-normal text-ink">
          Clear answers before the next step.
        </h2>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {faqs.map((faq) => (
          <article key={faq.question} className="panel p-5">
            <h3 className="text-base font-bold text-ink">{faq.question}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-700">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
