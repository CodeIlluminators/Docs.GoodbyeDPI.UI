import {
	ApiResponse,
	GitHubAsset,
	GitHubReleaseResponse,
} from '@/pages/api/types';
import { CacheSettings, GitHubAPI } from '@/pages/api/config';
import { NextApiRequest, NextApiResponse } from 'next';

import NodeCache from 'node-cache';
import phin from 'phin';

// Initialize cache with standard TTL
const cache = new NodeCache({ stdTTL: CacheSettings.STD_TTL });

/**
 * API handler to fetch the latest release assets with download URLs.
 * Checks cache first, then retrieves from GitHub API if needed.
 *
 * @param {NextApiRequest} req - The API request object
 * @param {NextApiResponse<ApiResponse>} res - The API response object
 * @returns {Promise<void>}
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse>,
): Promise<void> {
	const cachedAssets = cache.get<GitHubAsset[]>(
		CacheSettings.LATEST_RELEASE_KEY,
	);

	if (cachedAssets) {
		return res.status(200).json({ assets: cachedAssets });
	}

	try {
		const response = await phin<GitHubReleaseResponse>({
			url: `${GitHubAPI.BASE_URL}${GitHubAPI.LATEST_RELEASE_ENDPOINT()}`,
			parse: 'json',
			headers: {
				'User-Agent': GitHubAPI.USER_AGENT,
				Authorization: `token ${GitHubAPI.GITHUB_TOKEN}`,
			},
		});

		if (response.statusCode !== 200) {
			return res
				.status(response.statusCode || 500)
				.json({ message: GitHubAPI.Errors.FETCH_FAILED });
		}

		const data: GitHubReleaseResponse = response.body;
		const assets: GitHubAsset[] = data.assets.map(asset => ({
			name: asset.name,
			downloadUrl: asset.browser_download_url,
		}));

		cache.set(CacheSettings.LATEST_RELEASE_KEY, assets);
		res.status(200).json({ assets });
	} catch (error) {
		console.error(GitHubAPI.Errors.SERVER_ERROR, error);
		res.status(500).json({ message: GitHubAPI.Errors.SERVER_ERROR });
	}
}
