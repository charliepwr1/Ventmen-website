import type { Metadata } from 'next';
import { AreaPage } from '@/components/service-area/AreaPage';
import { AREA_CONTENT } from '@/lib/constants/content';

const content = AREA_CONTENT['langdon'];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
  },
};

export default function LangdonAreaPage() {
  return <AreaPage slug="langdon" />;
}
