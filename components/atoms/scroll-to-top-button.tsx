'use client';

import { useCallback, useEffect, useState } from 'react';

import ScrollToTopIcon from '@/components/atoms/scroll-to-top-icon';

const ScrollToTopButton = ({
	scrollThreshold = 300,
}: {
	scrollThreshold?: number;
}): JSX.Element => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = useCallback(() => {
		setIsVisible(window.scrollY > scrollThreshold);
	}, [scrollThreshold]);

	useEffect(() => {
		const throttledScroll = () => requestAnimationFrame(handleScroll);
		window.addEventListener('scroll', throttledScroll);
		return () => window.removeEventListener('scroll', throttledScroll);
	}, [handleScroll]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			<div
				className={`mx-7 space-y-2 border-t transition-opacity ${
					isVisible ? 'opacity-100' : 'opacity-0'
				}`}
			></div>
			<div
				className={`ml-8 mt-1 transition-opacity ${
					isVisible
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
			>
				<button
					type="button"
					onClick={scrollToTop}
					className="w-full hover:underline underline-offset-4 flex items-center gap-x-2 text-sm dark:text-stone-300/85 text-stone-800"
					aria-label="Прокрутить страницу вверх"
				>
					Прокрутить вверх
					<ScrollToTopIcon />
				</button>
			</div>
		</>
	);
};

export default ScrollToTopButton;
