import type { MetaArgs } from '@remix-run/node';
import { metaV1 } from '@remix-run/v1-meta';

import Layout from '~/components/Layout';
import LoveIcon from '~/components/ui/icons/Love';

export function meta(args: MetaArgs) {
  return metaV1(args, {
    title: 'ConcertX - Terms of Use',
    description: 'The terms of use for ConcertX.',
  });
}

export default function Index() {
  return (
    <Layout title="Terms of Use">
      <section className="mt-10 container mx-auto px-6 py-12 text-dark-gray dark:text-dark">
        <h1 className="text-3xl lg:text-6xl font-medium mb-8">Terms of Use</h1>
        <p className="text-base dark:font-light lg:text-lg mb-6">Welcome to ConcertX! These terms of use (the "Terms") govern your access to and use of our website, mobile app, and other online services (collectively, the "Services").</p>
        <h2 className="text-2xl font-medium mb-4">Accepting the Terms</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">By accessing or using the Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use the Services.</p>
        <h2 className="text-2xl font-medium mb-4">Changes to the Terms</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">We may modify the Terms at any time. If we do, we will post the revised Terms on this page and encourage you to review the Terms regularly. If you continue to use the Services after the revised Terms become effective, you agree to be bound by the revised Terms.</p>
        <h2 className="text-2xl font-medium mb-4">Content</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">The Services may include text, images, videos, and other materials (collectively, the "Content"). The Content is protected by copyright and other intellectual property laws. You may not use the Content for any commercial purpose without our permission.</p>
        <h2 className="text-2xl font-medium mb-4">Connecting Your Wallet</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">In order to access certain features of the Services, you may need to connect your wallet to the platform. You are responsible for maintaining the security of your wallet and for restricting access to it. You agree to accept responsibility for all activities that occur through your wallet. If you believe that your wallet has been compromised, you should immediately take steps to secure it and notify us.</p>
        <h2 className="text-2xl font-medium mb-4">Prohibited Conduct</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">You agree not to engage in any of the following prohibited conduct:</p>
        <ul className="list-disc pl-6">
          <li className="text-base dark:font-light lg:text-lg mb-4">Using the Services for any unlawful purpose.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Posting or transmitting any content that is defamatory, obscene, fraudulent, or that infringes on the intellectual property rights of others.</li>
          <li className="textxt-base lg:text-lg mb-6">"Spamming" or sending unsolicited emails or other messages.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Interfering with the Services or attempting to access them using a method other than through the interfaces provided by us.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Attempting to interfere with or compromise the system integrity or security of the Services.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Using the Services to transmit any viruses, worms, or other harmful code.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Collecting or storing personal data about other users without their consent.</li>
        </ul>
        <h2 className="text-2xl font-medium mb-4">Disclaimer of Warranties</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">The Services are provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the Services or the information, content, materials, or products included on the Services. You expressly agree that your use of the Services is at your sole risk. To the full extent permissible by law, we disclaim all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.</p>
        <h2 className="text-2xl font-medium mb-4">Limitation of Liability</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">We will not be liable for any damages of any kind arising from the use of the Services, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages.</p>
        <h2 className="text-2xl font-medium mb-4">Governing Law</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">These Terms and your use of the Services will be governed by and construed in accordance with the laws of the United States and the State of California, without giving effect to any principles of conflicts of law.</p>
        <h2 className="text-2xl font-medium mb-4">Dispute Resolution</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">Any dispute arising out of or relating to these Terms or the Services will be resolved through binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association.</p>
        <h2 className="text-2xl font-medium mb-4">General</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">These Terms constitute the entire agreement between you and us and govern your use of the Services. If any provision of these Terms is found to be invalid or unenforceable, that provision will be enforced to the maximum extent possible, and the remaining provisions will remain in full force and effect. Our failure to exercise or enforce any right or provision of these Terms will not constitute a waiver of such right or provision. You may not assign these Terms or transfer any rights to use the Services without our prior written consent. We may assign these Terms at any time without notice to you. The section titles in these Terms are for convenience only and have no legal or contractual effect. These Terms will be binding upon and will inure to the benefit of the parties, their successors and permitted assigns. Any rights not expressly granted herein are reserved.</p>
        <p className="text-2xl font-medium mb-4 flex flex-row">
          Thank you for using ConcertX <LoveIcon className="w-6 ml-1" />
        </p>
      </section>
    </Layout>
  );
}
