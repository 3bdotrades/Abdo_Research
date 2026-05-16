export default function RiskDisclosure() {
  const lastUpdated = 'May 12, 2026'

  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="badge-free mb-4 inline-block">Legal</span>
          <h1 className="text-4xl font-bold text-white mb-3">Risk Disclosure</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <Section title="1. Important Notice">
            <p>
              Please read this Risk Disclosure carefully before using any services, models, predictions, or outputs
              provided by Abdo Research ("the Service"). By accessing or using the Service, you acknowledge that
              you have read, understood, and agreed to the risks described herein.
            </p>
          </Section>

          <Section title="2. Nature of ML Outputs">
            <p>
              The machine learning models provided through this Service generate statistical predictions based on
              training data. These outputs are <strong>probabilistic estimates</strong>, not facts or guaranteed results.
            </p>
            <ul>
              <li>Model predictions may be inaccurate, incomplete, or misleading.</li>
              <li>Past model performance does not guarantee future accuracy.</li>
              <li>Models may exhibit biases inherited from their training data.</li>
              <li>Outputs should always be reviewed by a qualified professional before acting upon them.</li>
            </ul>
          </Section>

          <Section title="3. No Financial or Investment Advice">
            <p>
              Nothing produced by the Service constitutes financial advice, investment advice, trading recommendations,
              or any other form of professional financial guidance. Abdo Research is not a registered investment advisor,
              broker-dealer, or financial institution.
            </p>
            <p className="font-semibold text-yellow-400">
              You should not make financial, investment, or trading decisions based solely on the outputs of this Service.
              Always consult a licensed financial professional before making investment decisions.
            </p>
          </Section>

          <Section title="4. No Professional Advice">
            <p>
              Model outputs must not be used as a substitute for professional advice in any domain including but not
              limited to medicine, law, engineering, accounting, or psychology. Always consult a qualified professional
              for decisions in these areas.
            </p>
          </Section>

          <Section title="5. Accuracy Limitations">
            <p>Abdo Research makes no representations or warranties, express or implied, about:</p>
            <ul>
              <li>The accuracy, completeness, or reliability of model outputs.</li>
              <li>The fitness of the Service for any particular purpose.</li>
              <li>The absence of errors, bugs, or unexpected behavior.</li>
              <li>Continuous availability or uptime (except as specified in paid plan SLAs).</li>
            </ul>
          </Section>

          <Section title="6. User Responsibility">
            <p>You are solely responsible for:</p>
            <ul>
              <li>Validating any model output before relying on it for decisions.</li>
              <li>Ensuring your use of the Service complies with applicable laws and regulations.</li>
              <li>Maintaining the confidentiality and security of your API keys.</li>
              <li>Any actions, decisions, or outcomes arising from your use of the Service.</li>
            </ul>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Abdo Research and its affiliates, officers,
              directors, employees, and agents shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of, or inability to use, the Service
              or its outputs — including but not limited to financial loss, data loss, or lost profits.
            </p>
          </Section>

          <Section title="8. Regulatory Compliance">
            <p>
              It is your responsibility to determine whether your use of the Service complies with regulations
              applicable to you, including data protection laws (e.g., GDPR, CCPA), financial regulations,
              and sector-specific rules. Abdo Research provides no regulatory compliance guarantees.
            </p>
          </Section>

          <Section title="9. Changes to this Disclosure">
            <p>
              We may update this Risk Disclosure at any time. Continued use of the Service after changes
              are posted constitutes acceptance of the updated disclosure.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              If you have questions about this Risk Disclosure, please contact us at{' '}
              <a href="mailto:legal@abdoresearch.com" className="text-brand-400 hover:underline">
                legal@abdoresearch.com
              </a>.
            </p>
          </Section>
        </div>

        <div className="mt-12 p-5 rounded-xl border border-yellow-700/40 bg-yellow-900/10">
          <p className="text-yellow-300 text-sm font-semibold mb-1">Summary (non-legal)</p>
          <p className="text-yellow-200/70 text-sm leading-relaxed">
            Our ML models produce statistical predictions. They can be wrong. Don't make major financial,
            medical, legal, or other high-stakes decisions based solely on what our API returns.
            Use professional judgment and qualified advisors.
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
      <div className="text-gray-400 text-sm leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-white">
        {children}
      </div>
    </div>
  )
}
