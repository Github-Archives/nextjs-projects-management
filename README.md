Video tutorial that assisted:
https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=1s

# Temp notes...

Video tutorial I'm currently working off of as of March 8 video @~35min (Edit column title):
Right now I can:

- Add a new column
- Delete a columnn- Drag/Rearrange columns
- Currently working on adding ability to Edit column titles (currently at 33:33)
  https://www.youtube.com/watch?v=RG-3R6Pu_Ik&t=1s

Official Docs for Multiple Containers:
https://docs.dndkit.com/presets/sortable#multiple-containers

Link to working StoryBook Multiple Containers:
https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/docs/presets-sortable-multiple-containers--basic-setup

Typescript Github versions:
https://github.com/clauderic/dnd-kit/tree/master/stories

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
- [x] Add the rest of the columns working with DND-Kit

Not using this anymore →(`Board/page.jsx`*imports*→`<CardColumn>`→`<TaskCard>`→`<Card>`)

- [ ] Remove: `<CardColumn>`→`<TaskCard>`→`<Card>` because the new way is just using (`Board/page.jsx`*imports*→ `ColumnContainer`→`TaskCard`)
- [ ] Rename `ATaskCard` to `TaskCard` after removing unused `TaskCard` component
- [ ] Global State Management:Redux, React Context, Zustand?
- [ ] Set/Get Card data from database
- [ ] Reconfigure how to `Add Card` (probably with **+ Add** button opening a [modal](https://ui.shadcn.com/docs/components/dialog))
- [ ] Get rid of `CardColumn.css` + `TaskCard.css` & utilize Tailwind
- [ ] Fix styling for Column/Cards
- [ ] Get rid of paranetheses around (components) to → Components
- [ ] Add Shadcn UI [Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)
- [ ] GraphQL (PostGraphile?)
- [ ] Validate emails (if we go outside of OAuth)

---

## Bugs 🐞

- [ ] Issue with dragging Tasks while on mobile. Dragging columns fixed with `touch-none`

---

## Notes

- Database still in POC mode. Simply displaying first row of database at the moment
- `app/utils/authUtils/returnUserStatus.js` is able to return if the user is logged in. I want this recognition to trigger a `Login/Register` button to appear where the top-right avatar is when user is not logged in.

Taken from offical docs - [`getting-started`](https://docs.dndkit.com/introduction/getting-started)
I have not implemented Draggable & Droppable components the way that the official docs suggest. Instead I followed guidlines from [this video](https://www.youtube.com/watch?v=dL5SOdgMbRY)

---

Converting the transform object to a string can feel tedious. You can avoid having to do this by hand by importing the CSS utility from the @dnd-kit/utilities package: ⤵

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
