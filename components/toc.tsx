import { AlignLeftIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ScrollToTopButton from '@/components/atoms/scroll-to-top-button';
import TocObserver from '@/components/toc-observer';
import { getDocsTocs } from '@/lib/markdown';

export default async function Toc({ path }: { path: string }) {
	const tocs = await getDocsTocs(path);

	return (
		<div className="lg:flex hidden toc flex-[1.5] min-w-[238px] py-10 lg:sticky top-16 h-[calc(100vh-4.5rem)] overflow-y-auto">
			<div className="flex flex-col gap-3 w-full pl-2">
				<div className="flex flex-row gap-3 items-center justify-start">
					<AlignLeftIcon className="h-5 w-5" />
					<h3 className="font-medium text-sm leading-relaxed">
						На этой странице
					</h3>
				</div>
				<ScrollArea className="pb-2 pl-10 pt-0.5 overflow-y-auto">
					<TocObserver data={tocs} />
				</ScrollArea>
				<ScrollToTopButton />
			</div>
		</div>
	);
}
