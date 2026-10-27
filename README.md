# Online Bookstore

A full-stack bookstore app with a React + TypeScript front end and an ASP.NET Core Web API. Users can browse the catalog, change how many books show per page, and sort by title, author, or price.

Built for a BYU Information Systems course (2025).

## Highlights

- **REST API in C#:** a `BookController` endpoint that handles pagination and sorting (title, author, price; ascending or descending) on the server
- **Entity Framework Core** with a SQLite database and dependency injection
- **React 19 + TypeScript front end** built with Vite, styled with Bootstrap, with user-selectable page size

## Tech stack

| Layer | Tools |
|---|---|
| Front end | React, TypeScript, Vite, Bootstrap |
| Back end | ASP.NET Core Web API (C#), Entity Framework Core |
| Database | SQLite |

## Run it locally

**Back end**
```bash
cd backend/Mission11.API
dotnet run
```

**Front end**
```bash
cd frontend
npm install
npm run dev
```

## Author

Gabriel Liza · [gabriellizam.com](https://gabriellizam.com) · [LinkedIn](https://www.linkedin.com/in/gabriellizam)
