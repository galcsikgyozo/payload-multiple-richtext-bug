### Steps to Reproduce the Payload CMS Rich Text Editor Bug

1.  Clone the repository from GitHub: [https://github.com/galcsikgyozo/payload-multiple-richtext-bug](https://github.com/galcsikgyozo/payload-multiple-richtext-bug)
2.  Install the dependencies using `pnpm install`.
3.  Duplicate the `.env.example` file and rename the copy to `.env`. Then, in the `.env` file, set the values for `DATABASE_URI` and `PAYLOAD_SECRET` according to your environment.
4.  Navigate to the Payload CMS admin interface in your browser: `https://localhost:3000/admin`.
5.  Create an admin user and log in.
6.  Create a new "Page" in the CMS.
7.  Add either the `FAQ section (Array)` or the `FAQ section (Blocks)` to the page. Note that the `FAQ section (RichText in RichText)` version is expected to work correctly.
8.  Populate the selected FAQ section with content. Duplicate the `Q&A items` until the editor breaks or malfunctions.
9.  For reference, the `./src/collections/Pages.ts` file contains all test cases, including those that work and those that do not. Uncomment specific configurations in this file to test different scenarios. Comments within the file provide additional context and details about the behavior observed during testing.
