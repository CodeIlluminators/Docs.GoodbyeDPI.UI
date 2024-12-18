import { Logo, NavMenu } from '@/components/navbar';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { DialogTitle } from '@/components/ui/dialog';
import DocsMenu from '@/components/docs-menu';
import { FooterButtons } from '@/components/footer';
import { Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function Leftbar() {
	return (
		<aside className="md:flex hidden flex-[1.5] min-w-[238px] sticky top-16 flex-col h-[93.75vh] overflow-y-auto">
			<ScrollArea className="py-4">
				<DocsMenu />
			</ScrollArea>
		</aside>
	);
}

export function SheetLeftbar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden flex">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-4 px-0" side="left">
				<DialogTitle className="sr-only">Меню</DialogTitle>
				<DialogDescription id="dialog-description" className="sr-only">
					Всплывающее меню поиска по документации
				</DialogDescription>
				<SheetHeader>
					<SheetClose asChild>
						<Logo />
					</SheetClose>
				</SheetHeader>
				<div className="flex flex-col gap-4 overflow-y-auto">
					<div className="flex flex-col gap-2.5 mt-3 mx-2 px-5">
						<NavMenu isSheet />
					</div>
					<div className="mx-2 px-5">
						<DocsMenu isSheet />
					</div>
					<div className="p-6 pb-4 flex gap-2.5">
						<FooterButtons />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
