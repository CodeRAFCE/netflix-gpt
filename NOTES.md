# Notes

## Route change vs re-render

When navigating between `/sign-in` and `/sign-up`, React Router treats them as two different component instances — not the same component with a changed prop.

- `/sign-in` → `<AuthForm isSignUp={false} />` is **unmounted**
- `/sign-up` → `<AuthForm isSignUp={true} />` is **mounted fresh**

Everything inside the component is wiped on route change:
- Ref values (input values) — gone
- Local state (`errors`, `loading`) — gone
- `useAsync` state (`error`, `loading`) — gone

This gives a free form reset on navigation — no need for `form.reset()` when switching between sign-in and sign-up.

This is different from a re-render (same route, state changes via `useState`) where the component instance is preserved and state is kept.

## Mounting vs Rendering

These are not the same thing.

**Rendering** — React calling your component function to compute what the UI should look like. Happens on every state or prop change. Can happen many times during a component's lifetime.

**Mounting** — React inserting the component into the DOM for the first time. Happens once per component instance. This is when `useEffect(() => {}, [])` runs.

**Unmounting** — React removing the component from the DOM. All state and refs are destroyed. This is when `useEffect` cleanup functions run.

So every mount includes a render, but not every render is a mount.

### Real example with `AuthForm`:

```tsx
// User lands on /sign-in
// → AuthForm MOUNTS (inserted into DOM)
// → useEffect with [] runs (if any)
// → emailRef, errors, loading all initialized fresh

// User types in email input
// → AuthForm RE-RENDERS (state didn't change, but ref value updated)
// → No mount, no unmount — same instance, same state

// User clicks submit, validation fails
// → setErrors(...) triggers a RE-RENDER
// → errors state updated, component re-renders with error messages
// → Still same instance — refs still hold the typed values

// User clicks "Sign Up" link → navigates to /sign-up
// → /sign-in AuthForm UNMOUNTS — errors, refs, loading all gone
// → /sign-up AuthForm MOUNTS fresh — blank form, fresh state
// → useEffect with [] would run again on the new instance
```
Key difference: re-render keeps everything alive, unmount destroys everything.

## Protected Routes

Even though `AuthForm` is unmounted and fresh on each route visit, the **browser history stack** is separate from React's component lifecycle. So:

```
/sign-in → login success → navigate("/browse")
user hits back button → goes to /sign-in (history still has it)
```

The component remounts fresh but the user is back on the auth page even though they're logged in.

**Protected routes** solve this — before rendering the route, check if the user is authenticated:

- User logged in + tries to visit `/sign-in` → redirect to `/browse`
- User not logged in + tries to visit `/browse` → redirect to `/sign-in`

The history entry exists but the user never sees the page — they get redirected before the component renders.

### How ProtectedRoute works

```tsx
if (requireAuth && !user) return <Navigate to={redirectTo} replace />;
if (!requireAuth && user) return <Navigate to={redirectTo} replace />;
```

**Line 1** — Guest tries to visit `/browse`:
- `requireAuth` is `true` — this route requires login
- `user` is `null` in Redux — not logged in. `!null` flips to `true`
- Both true → redirected to `/sign-in`

**Line 2** — Logged in user tries to visit `/sign-in`:
- `requireAuth` is `false` — this route is for guests only. `!false` flips to `true`
- `user` is a Firebase User object in Redux — already logged in, so truthy
- Both true → redirected to `/browse`

If neither condition matches → `<Outlet />` renders the page normally.

### Why use `Navigate` instead of `useNavigate` here

`useNavigate` is for navigation triggered by user actions — button clicks, form submits.

`Navigate` component is for redirects during render — when you want to redirect based on a condition before anything is shown. Calling `navigate()` during render is a side effect inside render which React doesn't allow cleanly.

### React SPA security limitation

`ProtectedRoute` is a UI guard, not a real security boundary. Someone can:
1. Open DevTools
2. Manually dispatch a fake user object to Redux
3. `user` is now truthy → `ProtectedRoute` lets them through to `/browse`

But they only see the **UI shell** — when the page makes real API calls to Firebase, Firebase checks the **actual auth token** on the server. A fake Redux user has no real token, so all data requests get rejected.

**Protected routes = good user experience. Firebase security rules = real security.**

The only way to fully prevent client-side manipulation is SSR (like Next.js) where the auth check happens on the server before any HTML is sent.
