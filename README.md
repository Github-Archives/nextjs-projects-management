This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## [Tutorial help before 1hr mark](https://www.youtube.com/watch?v=MNm1XhDjX1s)

## Todo

- [x] OAuth Provider setup for Github and Google
- [x] Role-based authentication setup for both server rendered pages and client rendered pages
- [x] Admin Role-based authentication
- [x] Connect to database
- [ ] Validate emails (right now it's more like a username because it can be anything)

## Notes

- At the moment `app/CreateUser/page.jsx` is accessible to Admins only when logging in through Github, not Google login. See temp comments in `app/CreateUser/page.jsx` for more details
- Database still in POC mode. Simply displaying first row of database at the moment
- Database access is in Client Member and behind an OAuth login. So if you want to access the database, you need to login first. But consider where you want this database to be accessed from & what you want to set/get from it
