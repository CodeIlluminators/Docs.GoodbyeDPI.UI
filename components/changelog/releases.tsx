import { GitHubRelease } from '@/pages/api/types';
import Preloader from '@/components/atoms/preloader';
import { memo } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) =>
	fetch(url).then(res => {
		if (!res.ok) throw new Error('Failed to fetch all releases');
		return res.json();
	});

const Releases = memo(() => {
	const { data, error } = useSWR<{ releases: GitHubRelease[] }>(
		'/api/all-releases',
		fetcher,
	);

	return (
		<div className="mb-7 mt-5">
			{error ? (
				<p className="text-red-500">
					An error occurred while fetching all releases. Please try again later.
				</p>
			) : !data ? (
				<Preloader />
			) : (
				<>
					<ul className="pl-5">
						{data.releases.map(release => (
							<li className="my-5" key={release.id}>
								<div className="font-semibold">{release.name}</div>
								<span className="text-accent">
									({release.tagName}) -{' '}
									{new Date(release.createdAt).toLocaleDateString()}
								</span>
								{release.assets.length > 0 && (
									<ul className="list-disc pl-5 mt-1">
										{release.assets.map(asset => (
											<li key={asset.name}>
												<a
													href={asset.downloadUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="text-primary hover:underline"
												>
													{asset.name}
												</a>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
});

Releases.displayName = 'Releases';

export default Releases;
