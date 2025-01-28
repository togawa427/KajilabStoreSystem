import { MantineProvider } from '@mantine/core'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { Suspense } from 'react';
import IPFilter from './components/IPFilter';
import { notoSansJP } from '@/utils/fonts';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.className} container mx-auto w-11/12 bg-yellow-200 text-slate-900`}>
      <Suspense fallback={<div></div>}>
      <MantineProvider>
        {/* <IPFilter> */}
          {children}
        {/* </IPFilter> */}
      </MantineProvider>
      </Suspense>
      </body>
    </html>
  )
}
