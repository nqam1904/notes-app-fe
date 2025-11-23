import type { Metadata } from 'next';
import { CONFIG } from '@/config-global';
import { View403 } from '@/sections/error';

export const metadata: Metadata = {
  title: `403 Forbidden! | Error - ${CONFIG.appName}`,
};

export default function Page() {
  return <View403 />;
}
