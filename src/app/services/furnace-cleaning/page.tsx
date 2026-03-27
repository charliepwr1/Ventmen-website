import type { Metadata } from 'next';
import { ServicePage } from '@/components/services/ServicePage';
import { SERVICE_CONTENT } from '@/lib/constants/content';

const content = SERVICE_CONTENT['furnace-cleaning'];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
  },
};

export default function FurnaceCleaningPage() {
  return <ServicePage slug="furnace-cleaning" />;
}
