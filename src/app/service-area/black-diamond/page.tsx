import type { Metadata } from 'next';
import { AreaPage } from '@/components/service-area/AreaPage';
import { AREA_CONTENT } from '@/lib/constants/content';

const content = AREA_CONTENT['black-diamond'];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  openGraph: {
    title: content.metaTitle,
    description: content.metaDescription,
  },
};

export default function BlackDiamondAreaPage() {
  return <AreaPage slug="black-diamond" />;
}
