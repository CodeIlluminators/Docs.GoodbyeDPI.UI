import { ChevronDown, ChevronRight } from 'lucide-react';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useEffect, useRef, useState } from 'react';

import Anchor from '@/components/anchor';
import { EachRoute } from '@/lib/routes-config';
import { SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function SubLink({
	title,
	href,
	items,
	noLink,
	level,
	isSheet,
}: EachRoute & { level: number; isSheet: boolean }) {
	const path = usePathname();
	const [isOpen, setIsOpen] = useState(level === 0);
	const linkRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (path === href || path?.includes(href)) {
			setIsOpen(true);
			linkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}, [href, path]);

	const Comp = (
		<Anchor activeClassName="flex w-full text-primary font-medium" href={href}>
			{title}
		</Anchor>
	);

	const titleOrLink = !noLink ? (
		isSheet ? (
			<SheetClose asChild>{Comp}</SheetClose>
		) : (
			Comp
		)
	) : (
		<h4 className="font-medium sm:text-md text-foreground">{title}</h4>
	);

	if (!items) {
		return (
			<div
				className="flex flex-col w-full"
				ref={path === href ? linkRef : null}
			>
				{titleOrLink}
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-1 w-full">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<CollapsibleTrigger className="w-full pr-5">
					<div
						className="flex items-center justify-between cursor-pointer w-full"
						ref={path === href ? linkRef : null}
					>
						{titleOrLink}
						<span>
							{!isOpen ? (
								<ChevronRight className="h-[0.9rem] w-[0.9rem]" />
							) : (
								<ChevronDown className="h-[0.9rem] w-[0.9rem]" />
							)}
						</span>
					</div>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div
						className={cn(
							'flex flex-col items-start sm:text-sm dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3',
							level > 0 && 'pl-4 border-l ml-1.5',
						)}
					>
						{items?.map(innerLink => {
							const modifiedItems = {
								...innerLink,
								href: `${href + innerLink.href}`,
								level: level + 1,
								isSheet,
							};
							return <SubLink key={modifiedItems.href} {...modifiedItems} />;
						})}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
