# The Shepherd's Infant School

Website for The Shepherd's Infant School, Madina, Accra: *Guide & Care*.

Built with Next.js, Tailwind CSS, GSAP and Lenis. The previous Angular site lives on the `angular-legacy` branch.

## Develop

```bash
npm install
npm run dev
```

All site copy is in `lib/content.ts`. Items marked `TODO: confirm` need checking with the school.

## Contact form

`app/api/contact/route.ts` validates messages and saves them to MongoDB (the `contacts` collection, same as the old Express backend).
Set `MONGODB_URI` in `.env.local` locally and in the Vercel project settings for production.

## Credits

Kids crowd animation adapted from Skiper UI (Skiper 39) by @gurvinder-singh02, https://gxuri.me.
