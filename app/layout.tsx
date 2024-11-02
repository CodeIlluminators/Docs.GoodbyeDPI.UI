import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';

import App from '@/app/App';
import RouterProgress from '@/components/atoms/router-progress';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
	title: 'GoodbyeDPI UI',
	metadataBase: new URL('https://goodbyedpi-ui.vercel.app/'),
	description:
		'Удобный графический интерфейс для управления GoodbyeDPI, Zapret, ByeDPI и SpoofDPI. С его помощью вы можете легко изменять настройки DPI и запускать приложение в трее.',
	openGraph: {
		title: 'GoodbyeDPI UI',
		description:
			'Удобный графический интерфейс для управления GoodbyeDPI, Zapret, ByeDPI и SpoofDPI. С его помощью вы можете легко изменять настройки DPI и запускать приложение в трее.',
		url: 'https://goodbyedpi-ui.vercel.app/',
		siteName: 'GoodbyeDPI UI',
		images: '/opengraph-image.jpg',
		locale: 'ru_RU',
		type: 'website',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
	maximumScale: 1.0,
	userScalable: false,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fbfdfe' },
		{ media: '(prefers-color-scheme: dark)', color: '#070b0d' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-regular antialiased`}
				suppressHydrationWarning
			>
				<RouterProgress />
				<App>{children}</App>
			</body>
		</html>
	);
}
