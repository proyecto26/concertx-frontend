import type { MetaArgs } from '@remix-run/react';
import { metaV1 } from '@remix-run/v1-meta';

import Layout from '~/components/Layout';

export function meta(args: MetaArgs) {
  return metaV1(args, {
    title: 'ConcertX - Privacy Policy',
    description: 'The privacy policy for ConcertX.',
  });
}

export default function Index() {
  return (
    <Layout title="Privacy Policy">
      <section className="mt-10 container mx-auto px-6 py-12 text-dark-gray dark:text-dark">
        <h1 className="text-3xl lg:text-6xl font-medium mb-8">Privacy Policy</h1>
        <p className="text-base dark:font-light lg:text-lg mb-6">ConcertX is committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and share information about you when you use our website, mobile app, and other online services (collectively, the "Services").</p>
        <h2 className="text-2xl font-medium mb-4">Information We Collect</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">We may collect the following types of information about you:</p>
        <ul className="list-disc pl-6">
          <li className="text-base dark:font-light lg:text-lg mb-4">Personal information, such as your name, email address, and phone number, that you provide to us when you create an account or when you communicate with us.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Information about your interactions with the Services, such as your IP address, the pages you visit, and the actions you take.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">Information about your device, such as your device type, operating system, and browser type.</li>
        </ul>
        <h2 className="text-2xl font-medium mb-4">How We Use Your Information</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">We use the information we collect about you for the following purposes:</p>
        <ul className="list-disc pl-6">
          <li className="text-base dark:font-light lg:text-lg mb-4">To provide the Services to you and to personalize your experience.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">To communicate with you about your use of the Services.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">To understand how you use the Services and to improve the Services.</li>
        </ul>
        <h2 className="text-2xl font-medium mb-4">Information Sharing and Disclosure</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">We may share your information in the following circumstances:</p>
        <ul className="list-disc pl-6">
          <li className="text-base dark:font-light lg:text-lg mb-4">With third-party service providers who perform services on our behalf, such as hosting providers, payment processors, and customer support providers.</li>
          <li className="text-base dark:font-light lg:text-lg mb-4">In response to legal process, such as a court order or subpoena.
          </li>
          <li className="text-base dark:font-light lg:text-lg mb-4">
            In connection with a merger, acquisition, or sale of all or part of our business.
          </li>
        </ul>
        <h2 className="text-2xl font-medium mb-4">Your Choices and Rights</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">
          You have the following choices and rights regarding your information:
        </p>
        <ul className="list-disc pl-6">
          <li className="text-base dark:font-light lg:text-lg mb-4">
            You can access, update, or delete your personal information by logging into your account and accessing your account settings.
          </li>
          <li className="text-base dark:font-light lg:text-lg mb-4">
            You can opt out of receiving marketing communications from us by following the unsubscribe instructions in the communications you receive.
          </li>
          <li className="text-base dark:font-light lg:text-lg mb-4">
            You can exercise your right to object to the processing of your information by contacting us.
          </li>
          <li className="text-base dark:font-light lg:text-lg mb-4">
            You can exercise your right to data portability by contacting us.
          </li>
        </ul>
        <h2 className="text-2xl font-medium mb-4">Data Retention</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">
          We retain your information for as long as your account is active or as needed to provide you the Services. We may also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
        </p>
        <h2 className="text-2xl font-medium mb-4">Data Security</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">
          We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no security measures are perfect and we cannot guarantee the security of your information.
        </p>
        <h2 className="text-2xl font-medium mb-4">Changes to This Privacy Policy</h2>
        <p className="text-base dark:font-light lg:text-lg mb-6">
          We may update this privacy policy from time to time. We will post any changes on this page and encourage you to review the privacy policy regularly.
        </p>
      </section>
    </Layout>
  );
}
