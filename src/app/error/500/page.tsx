import type { Metadata } from 'next';
import { CONFIG } from '@/config-global';
import { View500 } from '@/sections/error';

export const metadata: Metadata = {
  title: `500 Internal Server Error! | Error - ${CONFIG.appName}`,
};

export default function Page() {
  return <View500 />;
}
