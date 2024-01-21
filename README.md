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
- [ ] Fix OAuth after deployment issue (look into using [Clerk](https://clerk.com/))
- [ ] Shadcn UI
- [ ] Create card component for tasks
- [ ] Implement Drag-and-Drop for tasks (dnd-kit)
- [ ] Global State Management (Redux, React Context, Zustand?)
- [ ] GraphQL (PostGraphile?)
- [ ] Validate emails (if we go outside of OAuth)

## Notes

- Try another OAuth provider for now while I figure out how to fix the OAuth issue after deployment with NextJS /app Router. Note: everything did work locally, so there could have been an issue with how environment variables were set up on Vercel and not being recognized
- Database still in POC mode. Simply displaying first row of database at the moment
- Database access is in Client Member and shouold be behind an OAuth login. So if you want to access the database, you need to login first. But consider where you want this database to be accessed from & what you want to set/get from it
