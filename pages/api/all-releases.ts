import {
	ApiReleasesResponse,
	GitHubAsset,
	GitHubRelease,
	GitHubReleaseResponse,
} from '@/pages/api/types';
import { CacheSettings, GitHubAPI } from '@/pages/api/config';
import { NextApiRequest, NextApiResponse } from 'next';

import NodeCache from 'node-cache';
import phin from 'phin';

const cache = new NodeCache({ stdTTL: CacheSettings.STD_TTL });

/**
 * API handler to fetch all releases with assets, including auto-generated source code archives.
 *
 * @param {NextApiRequest} req - The API request object
 * @param {NextApiResponse<ApiReleasesResponse>} res - The API response object
 * @returns {Promise<void>}
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiReleasesResponse>,
): Promise<void> {
	const cachedReleases = cache.get<GitHubRelease[]>(
		CacheSettings.ALL_RELEASES_KEY,
	);

	if (cachedReleases) {
		return res.status(200).json({ releases: cachedReleases });
	}

	try {
		const response = await phin<GitHubReleaseResponse[]>({
			url: `${GitHubAPI.BASE_URL}${GitHubAPI.ALL_RELEASES_ENDPOINT()}`,
			parse: 'json',
			headers: {
				'User-Agent': GitHubAPI.USER_AGENT,
				Authorization: `token ${GitHubAPI.GITHUB_TOKEN}`,
			},
		});

		if (response.statusCode !== 200) {
			let result = res
				.status(response.statusCode || 500)
				.json({ message: GitHubAPI.Errors.FETCH_FAILED });
			console.log(`RES: ${res.statusCode}\nRESPONSE: ${response}`);
			return result;
		}

		const releases: GitHubRelease[] = response.body.map(release => {
			const assets: GitHubAsset[] =
				release.assets?.map(asset => ({
					name: asset.name,
					downloadUrl: asset.browser_download_url,
				})) || [];

			// Generate URLs for auto-generated source code archives
			const zipUrl = `https://github.com/${GitHubAPI.REPO_OWNER}/${GitHubAPI.REPO_NAME}/archive/refs/tags/${release.tag_name}.zip`;
			const tarGzUrl = `https://github.com/${GitHubAPI.REPO_OWNER}/${GitHubAPI.REPO_NAME}/archive/refs/tags/${release.tag_name}.tar.gz`;

			// Check if source code archives are missing from assets and add them if so
			if (!assets.find(asset => asset.downloadUrl === zipUrl)) {
				assets.push({ name: GitHubAPI.SOURCE_ZIP_SUFFIX, downloadUrl: zipUrl });
			}

			if (!assets.find(asset => asset.downloadUrl === tarGzUrl)) {
				assets.push({
					name: GitHubAPI.SOURCE_TAR_GZ_SUFFIX,
					downloadUrl: tarGzUrl,
				});
			}

			return {
				id: release.id,
				tagName: release.tag_name,
				name: release.name,
				createdAt: release.created_at,
				assets,
			};
		});

		cache.set(CacheSettings.ALL_RELEASES_KEY, releases);
		res.status(200).json({ releases });
	} catch (error) {
		console.error(GitHubAPI.Errors.SERVER_ERROR, error);
		res.status(500).json({ message: GitHubAPI.Errors.SERVER_ERROR });
	}
}
