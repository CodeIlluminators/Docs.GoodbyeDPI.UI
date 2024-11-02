/**
 * Configuration constants and error messages for the GitHub API and Cache settings.
 * This file centralizes static values used across the application.
 */

export const GitHubAPI = {
	BASE_URL: 'https://api.github.com',
	REPO_OWNER: 'Storik4pro',
	REPO_NAME: 'goodbyeDPI-UI',
	LATEST_RELEASE_ENDPOINT: function () {
		return `/repos/${this.REPO_OWNER}/${this.REPO_NAME}/releases/latest`;
	},
	ALL_RELEASES_ENDPOINT: function () {
		return `/repos/${this.REPO_OWNER}/${this.REPO_NAME}/releases`;
	},
	USER_AGENT: 'docs-goodbyedpi-ui',
	SOURCE_ZIP_SUFFIX: 'source code.zip',
	GITHUB_TOKEN: process.env.GITHUB_TOKEN,
	SOURCE_TAR_GZ_SUFFIX: 'source code.tar.gz',
	Errors: {
		NO_GITHUB_TOKEN: 'GitHub token is not configured',
		FETCH_FAILED: 'Failed to fetch data from GitHub API',
		FILE_NOT_FOUND: 'Requested file not found in the latest release',
		SERVER_ERROR: 'An internal server error occurred',
	},
};

export const CacheSettings = {
	/** Time-to-live for cache, in seconds (10 minutes) */
	STD_TTL: 600,
	/** Cache key for the latest release URL */
	LATEST_RELEASE_KEY: 'latest-release-url',
	/** Cache key for all releases URL */
	ALL_RELEASES_KEY: 'all-releases',
};
