# Preview / PR Workflow Test

This file exists only to verify the ThatsKrispy build workflow end to end:

1. Branch created off `main` (`client/preview-test`)
2. Commit pushed via the Cowork GitHub connector
3. Cloudflare Pages should auto-build a preview deployment for this branch
4. This PR should show the Cloudflare preview URL + build status check

Safe to delete along with the branch once verified.
