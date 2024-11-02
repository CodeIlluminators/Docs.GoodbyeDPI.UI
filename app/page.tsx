import ExternalArrow from '@/components/atoms/external-arrow';
import Link from 'next/link';
import { TerminalSquareIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { page_routes } from '@/lib/routes-config';

export default function Home() {
	return (
		<div className="flex sm:min-h-[92vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 py-8 overflow-hidden">
			<Link
				href="https://github.com/Storik4pro/GoodbyeDPI-UI"
				target="_blank"
				className="relative mb-5 sm:text-lg flex items-center gap-1.5 underline underline-offset-4 sm:-mt-12"
			>
				Следите за проектом на GitHub{' '}
				<ExternalArrow className="absolute top-[1px] -right-[14px] w-3 h-3 font-extrabold" />
			</Link>
			<h1 className="text-3xl font-bold mb-4 sm:text-6xl">GoodbyeDPI UI</h1>
			<p className="mb-8 sm:text-xl text-base max-w-[750px] text-muted-foreground">
				Удобный графический интерфейс для управления GoodbyeDPI, Zapret, ByeDPI
				и SpoofDPI. <wbr />С его помощью вы можете легко изменять настройки DPI
				и запускать приложение в трее.
			</p>
			<div className="flex flex-wrap sm:flex-nowrap sm:flex-row justify-center items-center gap-y-3 gap-x-5">
				<Link
					href={`/docs${page_routes[0].href}`}
					className={buttonVariants({ className: 'px-6', size: 'lg' })}
				>
					Подробнее
				</Link>
				<Link
					href="/blog"
					className={buttonVariants({
						variant: 'secondary',
						className: 'px-6',
						size: 'lg',
					})}
				>
					Блог
				</Link>
			</div>
			<span className="flex flex-row items-start sm:gap-2 gap-0.5 text-muted-foreground mt-7 -mb-12 max-[800px]:mb-12 font-code sm:text-base text-sm font-medium">
				<TerminalSquareIcon className="w-5 h-5 mr-1 mt-0.5" />
				{'git clone https://github.com/Storik4pro/GoodbyeDPI-UI.git'}
			</span>
		</div>
	);
}
