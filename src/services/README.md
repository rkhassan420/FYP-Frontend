# Services

Use this folder for all API calls. Components should import service functions instead of calling Axios directly.

## Base URL

Create a local `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Example

```jsx
import { useEffect, useState } from "react";
import { classService } from "../../services";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadClasses() {
      try {
        const data = await classService.getClasses();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadClasses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return classes.map((item) => <div key={item.id}>{item.name}</div>);
}
```

## Auth Token

After login or OTP verification, save the backend response like this:

```js
import { authService, saveAuthSession } from "../../services";

const response = await authService.studentLogin({ email, password });
saveAuthSession(response);
```

The Axios client will automatically send it as:

```http
Authorization: Bearer your-token
```

## Auth APIs From PDF

The first 13 endpoints from `ace_api_endpoints.pdf` are available through `authService`:

```js
authService.register(payload);
authService.verifyOtp({ email, otp });
authService.resendOtp({ email });
authService.getProfile();
authService.updateProfile(payload);
authService.studentLogin({ email, password });
authService.teacherLogin({ email, password });
authService.changePassword(payload);
authService.requestPasswordOtpLogout({ email });
authService.confirmPasswordOtp(payload);
authService.requestPasswordOtp({ email });
authService.logout({ refresh });
authService.deleteAccount();
```

## Class APIs From PDF

APIs 14-20 are available through `classService`:

```js
classService.createClass({ name, description });
classService.getClasses();
classService.getClassByCode(code);
classService.updateClass(code, { name, description });
classService.deleteClass(code);
classService.getEnrolledStudents(code);
classService.enrollInClass(code);
```

The enrolled students endpoint is configured as:

```txt
/classes/{code}/students/
```

If your backend action uses a different route name, update only `ENDPOINTS.classes.enrolledStudents` in `endpoints.js`.
