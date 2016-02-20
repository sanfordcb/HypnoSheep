# API

## Authorization

  - **Sign In**
    + *method:* POST
    + *route:* `/auth/signin`
  - **Sign Up**
    + *method:* POST
    + *route:* `/auth/signup`
  - **Sign Out**
    + *method:* POST
    + *route:* `/auth/signout`

## Projects

  - **Get all Projects**
    + *method:* GET
    + *route:* `/api/projects`
  - **Create a Project**
    + *method:* POST
    + *route:* `/api/projects`
  - **Delete a Project**
    + *method:* DELETE
    + *route:* `/api/projects/project_id`

## Links

  - **Get all Links**
    + *method:* GET
    + *route:*`/api/links`
  - **Get Links for a single Project**
    + *method:* GET
    + *route:* `/api/links/:projectId`
  - **Create a Link**
    + *method:* POST
    + *route:* `/api/links`
  - **Update a Link**
    + *method:* PUT
    + *route:* `/api/links/:linkId`
