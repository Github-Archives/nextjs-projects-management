## Getting Started

First, run the development server:

```bash
npm run dev
```

##### Go to [http://localhost:3000](http://localhost:3000)

##### [Clerk Dashboard](https://dashboard.clerk.com/sign-in) & [Docs](https://clerk.com/docs)

## Todo

- [x] OAuth Provider setup for Github and Google
- [x] Role-based authentication setup for both server rendered pages and client rendered pages
- [x] Admin Role-based authentication
- [x] Connect to database
- [x] Add OAuth (Try [Clerk](https://clerk.com/))
- [x] Shadcn UI
- [x] Create card component for tasks
- [x] Implement Drag-and-Drop for tasks (dnd-kit)
- [ ] Get rid of paranetheses around (components) to -> Components
- [ ] Global State Management (Redux, React Context, Zustand?)
- [ ] GraphQL (PostGraphile?)
- [ ] Validate emails (if we go outside of OAuth)

---

## Notes

- Database still in POC mode. Simply displaying first row of database at the moment
- `app/utils/authUtils/returnUserStatus.js` is able to return if the user is logged in. I want this recognition to trigger a `Login/Register` button to appear where the top-right avatar is when user is not logged in.

Taken from offical docs - [`getting-started`](https://docs.dndkit.com/introduction/getting-started)
I have not implemented Draggable & Droppable components the way that the official docs suggest. Instead I followed guidlines from [this video](https://www.youtube.com/watch?v=dL5SOdgMbRY)

---

Converting the transform object to a string can feel tedious. Fear not, you can avoid having to do this by hand by importing the CSS utility from the @dnd-kit/utilities package:

#### Suggested Usage from offical docs

```jsx
import { CSS } from "@dnd-kit/utilities";

// Within your component that receives `transform` from `useDraggable`:
const style = {
  transform: CSS.Translate.toString(transform),
};
```

#### My Usage

`app/(components)/Task/Task.jsx`

```jsx
const style = {
  transition, // <- from youtube tutorial
  transform: CSS.Transform.toString(transform), // <- from youtube tutorial
  // transform: CSS.Translate.toString(transform), // <- only line from notes/official tips
};
```
