import { ThemeProvider } from '@/components/contexts/theme-provider';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PropsWithChildren } from 'react';

export const App = (props: PropsWithChildren) => {
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Navbar />
				<main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
					{props.children}
				</main>
				<Footer />
			</ThemeProvider>
			<Analytics />
			<SpeedInsights />
		</>
	);
};

export default App;
