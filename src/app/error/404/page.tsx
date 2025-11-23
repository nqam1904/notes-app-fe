import type { Metadata } from 'next';
import { CONFIG } from '@/config-global';
import { View404 } from '@/sections/error';

export const metadata: Metadata = {
  title: `404 Page Not Found! | Error - ${CONFIG.appName}`,
};

export default function Page() {
  return <View404 />;
}
