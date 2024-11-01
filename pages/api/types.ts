/**
 * Represents an asset from a GitHub release.
 * @property {string} name - The name of the asset file.
 * @property {string} downloadUrl - The direct download URL of the asset.
 */
export interface GitHubAsset {
  name: string;
  downloadUrl: string;
}

/**
 * Represents the response structure of a GitHub release retrieved from the API.
 * @property {number} id - The unique ID of the release.
 * @property {string} tag_name - The tag name of the release.
 * @property {string} name - The display name of the release.
 * @property {string} created_at - The date and time when the release was created.
 * @property {GitHubAsset[]} assets - An array of assets included in the release.
 */
export interface GitHubReleaseResponse {
  id: number;
  tag_name: string;
  name: string;
  created_at: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
  }>;
}


/**
 * Represents the structure of a GitHub release that is processed and returned by the API routes.
 * @property {number} id - The unique ID of the release.
 * @property {string} tagName - The tag name of the release.
 * @property {string} name - The display name of the release.
 * @property {string} createdAt - The creation date of the release.
 * @property {GitHubAsset[]} assets - An array of assets for the release.
 */
export interface GitHubRelease {
  id: number;
  tagName: string;
  name: string;
  createdAt: string;
  assets: GitHubAsset[];
}

/**
 * Represents the API response structure for the "all-releases" route.
 * @property {GitHubRelease[]} releases - An array of GitHub releases with assets.
 * @property {string} [message] - Optional error message if an error occurs.
 */
export interface ApiReleasesResponse {
  releases?: GitHubRelease[];
  message?: string;
}

/**
 * Represents the API response structure for the "latest-release" route.
 * @property {GitHubAsset[]} [assets] - An array of assets included in the release.
 * @property {string} [message] - Optional error message if an error occurs.
 */
export interface ApiResponse {
  assets?: GitHubAsset[];
  message?: string;
}
