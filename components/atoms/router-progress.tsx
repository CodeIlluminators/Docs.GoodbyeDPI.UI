'use client';

import NProgress from 'nprogress';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const RouterProgress = () => {
	const pathname = usePathname();

	useEffect(() => {
		NProgress.configure({ showSpinner: true });
		NProgress.start();
		NProgress.done();

		return () => {
			NProgress.done();
		};
	}, [pathname]);

	return null;
};

export default RouterProgress;
