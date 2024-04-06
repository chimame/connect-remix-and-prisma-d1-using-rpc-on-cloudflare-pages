import { Form, useLoaderData } from "@remix-run/react";
import { loader, action } from "./handlers";

export default function UserPage() {
  const { users } = useLoaderData<typeof loader>()

  return (
    <div>
      <Form method="post">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <button type="submit">Add</button>
      </Form>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export { loader, action };
