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

## Resources

  - **Get all Resources**
    + *method:* GET
    + *route:*`/api/resources`
  - **Get Resources for a single Project**
    + *method:* GET
    + *route:* `/api/resources/:projectId`
  - **Create a Resource**
    + *method:* POST
    + *route:* `/api/resources`
  - **Update a Resource**
    + *method:* PUT
    + *route:* `/api/resources/:resourceId`
