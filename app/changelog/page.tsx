import { ChevronRightIcon, CircleIcon } from 'lucide-react';

import { BlogMdxFrontmatter } from '@/lib/markdown';
import { Button } from '@/components/ui/button';
import DownloadComp from '@/components/changelog/download-comp';
import Link from 'next/link';
import { Metadata } from 'next';
import { formatDate2 } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Журнал изменений - GoodbyeDPI UI',
};

export default function ChangelogIndexPage() {
	// const blogs = (await getAllBlogs()).sort(
	// 	(a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime(),
	// );
	return (
		<div className="w-full flex  flex-col gap-5 sm:min-h-[91vh] min-h-[88vh] md:pt-6 pt-2">
			<div className="md:mb-7 mb-4 flex flex-col gap-2 ">
				<h1 className="text-3xl font-extrabold">Журнал изменений</h1>
				<p className="text-muted-foreground">
					Сводка ключевых изменений и релизов в главном репозитории проекта.
				</p>
			</div>
			<DownloadComp />
			{/* <div>
        {blogs.map((blog) => (
          <ChangelogPoint {...blog} slug={blog.slug} key={blog.slug} />
        ))}
      </div> */}
		</div>
	);
}

function ChangelogPoint({
	date,
	title,
	description,
	slug,
}: BlogMdxFrontmatter & { slug: string }) {
	return (
		<div className="flex flex-col md:flex-row items-start">
			<div className="text-sm text-muted-foreground text-nowrap md:pr-12 mb-2">
				<p className="md:w-24">{formatDate2(date)}</p>
			</div>
			<div className="md:border-l md:pl-14 pb-12 relative">
				<CircleIcon className="w-3.5 h-3.5 absolute -left-[0.481rem] fill-background text-muted-foreground md:flex hidden" />
				<Link className="flex flex-col gap-3" href={`/changelog/${slug}`}>
					<h3 className="sm:text-xl text-lg font-bold -mt-1">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
					<Button
						variant="link"
						size="sm"
						className="w-fit px-0 underline -mt-2"
					>
						Подробнее <ChevronRightIcon className="w-4 h-4 ml-1" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
