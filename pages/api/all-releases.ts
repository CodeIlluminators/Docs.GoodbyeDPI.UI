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
 * Formats and adds additional assets (source code archives) to a GitHub release.
 * @param {GitHubReleaseResponse} release - The raw GitHub release response.
 * @returns {GitHubRelease} - The processed release with additional assets.
 */
const formatRelease = (release: GitHubReleaseResponse): GitHubRelease => {
	const assets: GitHubAsset[] =
		release.assets?.map(asset => ({
			name: asset.name,
			downloadUrl: asset.browser_download_url,
		})) || [];

	const zipUrl = `https://github.com/${GitHubAPI.REPO_OWNER}/${GitHubAPI.REPO_NAME}/archive/refs/tags/${release.tag_name}.zip`;
	const tarGzUrl = `https://github.com/${GitHubAPI.REPO_OWNER}/${GitHubAPI.REPO_NAME}/archive/refs/tags/${release.tag_name}.tar.gz`;

	if (!assets.some(asset => asset.downloadUrl === zipUrl)) {
		assets.push({ name: GitHubAPI.SOURCE_ZIP_SUFFIX, downloadUrl: zipUrl });
	}
	if (!assets.some(asset => asset.downloadUrl === tarGzUrl)) {
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
};

/**
 * Handles API requests to fetch paginated releases from a GitHub repository.
 * If releases are cached, returns cached data. Otherwise, fetches data from GitHub API.
 *
 * @async
 * @function handler
 * @param {NextApiRequest} req - The incoming API request object.
 * @param {NextApiResponse<ApiReleasesResponse>} res - The outgoing API response object.
 * @returns {Promise<void>} - Sends the paginated releases as a JSON response.
 *
 * @throws Will return a 500 status if the GitHub token is missing or if an error occurs during the API request.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiReleasesResponse>,
): Promise<void> {
	// ensure GitHub token is available for API requests
	if (!GitHubAPI.GITHUB_TOKEN) {
		return res.status(500).json({ message: GitHubAPI.Errors.NO_GITHUB_TOKEN });
	}

	// parse limit and page parameters from the request query
	const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1);
	const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
	const offset = (page - 1) * limit;

	// check cache for cached releases, but avoid holding too many items in memory
	const cachedReleases = cache.get<GitHubRelease[]>(
		CacheSettings.ALL_RELEASES_KEY,
	);
	if (cachedReleases) {
		return res
			.status(200)
			.json({ releases: cachedReleases.slice(offset, offset + limit) });
	}

	try {
		// fetch and process releases from GitHub if not found in cache
		const response = await phin<GitHubReleaseResponse[]>({
			url: `${GitHubAPI.BASE_URL}${GitHubAPI.ALL_RELEASES_ENDPOINT()}`,
			parse: 'json',
			headers: {
				'User-Agent': GitHubAPI.USER_AGENT,
				Authorization: `token ${GitHubAPI.GITHUB_TOKEN}`,
			},
		});

		if (response.statusCode !== 200 || !response.body) {
			console.error(`Failed to fetch releases: ${response.statusCode}`);
			return res
				.status(response.statusCode || 500)
				.json({ message: GitHubAPI.Errors.FETCH_FAILED });
		}

		// map and format releases for response
		const releases = response.body.map(formatRelease);

		// cache releases and ensure memory is freed if it fails
		const cacheSuccess = cache.set(CacheSettings.ALL_RELEASES_KEY, releases);
		if (!cacheSuccess) {
			console.warn('Failed to cache releases');
		}

		// send paginated releases in the response
		res.status(200).json({ releases: releases.slice(offset, offset + limit) });
	} catch (error) {
		console.error(`${GitHubAPI.Errors.SERVER_ERROR}:`, error);
		res.status(500).json({ message: GitHubAPI.Errors.SERVER_ERROR });
	}
}
