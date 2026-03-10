# React Router Authentication & Role-Based Routing Tasks

## Task 1 — Project Setup

Create a new **Vite + React** app.

Install React Router:

```bash
npm install react-router-dom
```

Set up the folder structure:

```
src/
 ├── pages/
 ├── components/
```

Create **stub components** (just an `<h1>`) for each page listed in the assignment.

---

# Task 2 — Auth Context

Create `AuthContext.jsx` with a `useAuth()` hook.

Store the following in state:

* `user` object

  ```js
  { name, role }
  ```
* `isAuthenticated` boolean

Provide a `login(role)` function that:

* Sets a **fake user**
* Sets an **isLoading flag**

The `login()` function should accept a role argument:

```js
login('user')
login('admin')
```

This allows testing **both user roles**.

---

# Task 3 — Router Setup

Create `router.jsx` using:

```js
createBrowserRouter
```

Steps:

1. Define all routes from the assignment table.
2. Connect routes with page components.
3. Mount the router in `main.jsx` using:

```jsx
<RouterProvider />
```

---

# Task 4 — Public Routes

The following pages should be accessible **without authentication**:

* Home
* About
* Login

### Login Page Behavior

If the user is **already authenticated**, redirect them immediately:

```jsx
<Navigate to="/dashboard" replace />
```

Add a **login button** that:

1. Calls `login('user')`
2. Navigates to the **intended destination** (see Task 6).

---

# Task 5 — ProtectedRoute Guard

Create:

```
components/ProtectedRoute.jsx
```

Responsibilities:

1. Show a **spinner** if `isLoading` is `true`
2. If **not authenticated**, redirect:

```
/login
```

with state:

```js
state={{ from: location }}
```

and use `replace`.

3. If authenticated, render:

```jsx
<Outlet />
```

Wrap the following routes with `ProtectedRoute`:

* `/dashboard`
* `/profile`

---

# Task 6 — Redirect Back After Login

In `LoginPage.jsx`:

Read the intended route:

```js
location.state?.from?.pathname
```

After login:

```js
navigate(from, { replace: true })
```

Default behavior:

If `state.from` **does not exist**, redirect to:

```
/dashboard
```

### Test Case

1. Visit `/dashboard` while logged out
2. You should be redirected to `/login`
3. Log in
4. You should land on `/dashboard`

---

# Task 7 — Role-Based Route Guard

Create:

```
components/RoleRoute.jsx
```

Props:

```
allowedRoles
```

Logic:

1. **Check authentication first**

If not authenticated:

```
redirect → /login
```

with state.

2. **Check role**

If `user.role` is **not in** `allowedRoles`:

```
redirect → /unauthorized
```

3. If both checks pass:

```
render <Outlet />
```

Wrap this route:

```
/admin
```

with:

```jsx
<RoleRoute allowedRoles={['admin']} />
```

---

# Task 8 — 404 & Unauthorized Pages

Create pages:

* `NotFound.jsx`
* `Unauthorized.jsx`

### NotFound Page

Should contain:

* A clear **404 message**
* A link back to **Home**

### Unauthorized Page

Explain that:

* The user **does not have permission**

Provide links to:

* Go **Home**
* Log in with a **different account**

Add a **catch-all route** at the end:

```
*
```

---

# Task 9 — Navigation Component

Create:

```
components/Navbar.jsx
```

Use:

```jsx
<NavLink>
```

### Conditional Navigation

Show links based on authentication:

| Condition             | Show               |
| --------------------- | ------------------ |
| Always                | Home, About        |
| isAuthenticated       | Dashboard, Profile |
| user.role === 'admin' | Admin              |

### Buttons

Show conditionally:

* **Login** button if logged out
* **Logout** button if logged in

Create a **Layout component**:

```
components/Layout.jsx
```

It should render:

* `Navbar`
* `<Outlet />`

Wrap your routes with `Layout`.

---

# Task 10 — End-to-End Flows to Verify

Test the following flows.

### (a) Protected Redirect

1. Visit `/dashboard` while logged out
2. Redirect → `/login`
3. Log in
4. Land on `/dashboard`

---

### (b) Unauthorized User

1. Log in as **user**
2. Visit `/admin`

Expected:

```
/unauthorized
```

---

### (c) Admin Access

1. Log in as **admin**
2. Visit `/admin`

Expected:

```
Admin panel loads successfully
```

---

### (d) Unknown Route

Visit:

```
/xyz
```

Expected:

```
404 Not Found page
```

---

### (e) Logout Behavior

1. Log in as **admin**
2. Click **Logout**

Expected:

* All **private links disappear**
* **Back button should not return to dashboard**
