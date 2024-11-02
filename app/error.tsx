'use client'; // Error components must be Client Components

import { Button, buttonVariants } from '@/components/ui/button';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-[87vh] px-2 sm:py-28 py-36 flex flex-col gap-4 items-center">
			<div className="text-center flex flex-col items-center justify-center w-fit gap-2">
				<h2 className="text-7xl font-bold pr-1">Упсс!</h2>
				<p className="text-muted-foreground text-md font-medium">
					Что-то пошло не так {':('}
				</p>
				<p>При обработке вашего запроса произошла неизвестная ошибка.</p>
			</div>
			<div className="flex items-center gap-2">
				<Button
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
				>
					Перезагрузить страницу
				</Button>
				<Link href="/" className={buttonVariants({})}>
					Вернуться на главную
				</Link>
			</div>
		</div>
	);
}
