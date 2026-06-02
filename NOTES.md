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
# This technically let's us Navigate back even though the component is rendered fresh and navigates to /browse we can go back to the history route /sign-in. So this is where we use Protected routes
Key difference: re-render keeps everything alive, unmount destroys everything.
