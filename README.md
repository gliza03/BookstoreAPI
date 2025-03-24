# Online Bookstore Web Application

## Project Overview
A full-stack web application for an online bookstore, demonstrating proficiency in modern web development technologies including React, TypeScript, and .NET Core API.

## Technologies Used
- **Frontend:** 
  - React
  - TypeScript
  - Bootstrap
- **Backend:**
  - ASP.NET Core Web API
  - Entity Framework Core
- **Database:**
  - SQL Server

## Key Features
- Comprehensive book catalog management
- Dynamic pagination
- Flexible sorting capabilities
- Responsive design

## Backend Highlights
- RESTful API design
- Pagination and sorting implementation
- Dependency injection
- Clean, modular controller architecture

### API Endpoint Example
The `BookController` provides a flexible endpoint for retrieving books with:
- Pagination support
- Multiple sorting options (by title, author, price)
- Ascending/descending sort directions

```csharp
[HttpGet("AllBooks")]
public IActionResult Get(
    int pageSize, 
    int pageNumber = 1, 
    string sortBy = "title", 
    string sortDirection = "asc")
{
    // Sophisticated sorting and pagination logic
}
```

## Frontend Capabilities
- Dynamic book listing
- User-configurable page size
- Client-side sorting
- Responsive UI using Bootstrap

## Learning Highlights
- Implementing complex sorting mechanisms
- Working with .NET Core Web API
- React and TypeScript integration
- Database connectivity and ORM usage

## Getting Started
1. Clone the repository
2. Set up backend dependencies
3. Configure database connection
4. Install frontend npm packages
5. Run the application

## Future Improvements
- Add authentication
- Implement advanced filtering
- Enhance error handling
- Create more detailed book views

## Contact
[Your Name]
- LinkedIn: [Your LinkedIn Profile]
- Email: [Your Professional Email]
