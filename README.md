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

`app/api/contact/route.ts` forwards messages to the Express backend (`schoolsSitebackend`).
Set `CONTACT_API_URL` to its public URL in production (defaults to `http://localhost:3003/api/addmessage`).

## Credits

Kids crowd animation adapted from Skiper UI (Skiper 39) by @gurvinder-singh02, https://gxuri.me.
