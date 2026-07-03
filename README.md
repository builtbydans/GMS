# Workshop

> A modern Garage & Workshop Management System built with Next.js, Express, TypeScript and Supabase.

Workshop is a full-stack web application designed to model the day-to-day operations of an independent vehicle workshop. Rather than focusing solely on CRUD operations, the project aims to capture real business workflows such as customer enquiries, quoting, job management and workshop progression.

The project serves as my flagship portfolio piece and continues to evolve as I learn new engineering practices and production techniques.

---

# Live Demo

Frontend

> https://workshop-eight-pi.vercel.app

Backend API

> Railway

---

# Why I Built Workshop

I wanted to build a project that demonstrates how I approach software engineering beyond simply creating pages and forms.

Workshop focuses on:

- Designing real business workflows
- Layered backend architecture
- Clean separation of concerns
- Production deployment
- Scalable folder structures
- Type-safe full-stack development
- Building software that solves operational problems

Rather than creating isolated CRUD pages, the aim is to model how an actual garage operates from the moment a customer makes an enquiry through to job completion.

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Node.js
- Express
- TypeScript

## Database

- Supabase (PostgreSQL)

## Deployment

- Vercel
- Railway
- Supabase

---

# Architecture

## Frontend

```
Pages
    ↓
Components
    ↓
Services
    ↓
REST API
```

## Backend

```
Routes
    ↓
Controllers
    ↓
Services
    ↓
Repositories
    ↓
Supabase
```

This layered architecture keeps HTTP handling, business logic and database access separated, making the application easier to extend and maintain.

---

# Current Features

## Customer Management

- Create customers
- Edit customer information
- View customer profiles
- Soft delete support
- Email validation
- Phone validation
- Duplicate checking

---

## Vehicle Management

- Register customer vehicles
- Link vehicles to customers
- Vehicle history
- Registration validation

---

## Lead Management

The project currently models the early stages of the customer journey.

Current workflow:

```
Customer Enquiry

↓

Lead Created

↓

Quote Generated

↓

Customer Accepts / Rejects
```

---

## Job Management

Jobs can be created and tracked throughout the workshop.

Current workflow:

```
Booked

↓

Awaiting Parts

↓

In Progress

↓

Awaiting Review

↓

Final Inspection

↓

Ready For Collection

↓

Completed
```

Business rules prevent invalid workflow transitions.

---

## Employees

Current implementation includes:

- Employee records
- Employee roles
- Foundation for future staff assignment

---

## Dashboard

Current dashboard displays key operational information including:

- Customers
- Vehicles
- Jobs
- Invoices

---

## Audit Logging

Important actions throughout the system generate audit entries to improve traceability and provide a historical record of changes.

---

## Activity Timeline

Jobs include an activity timeline to display important workflow events and progress over time.

---

# Folder Structure

```
client/

    app/
    components/
    services/
    types/
    utils/

server/

    modules/
        customer/
        vehicle/
        lead/
        job/
        invoice/
        employee/
        dashboard/
        audit/

    config/
    middleware/
    errors/
    types/
```

---

# Current Workflow

The current customer journey is modelled as:

```
Customer Enquiry

↓

Lead Created

↓

Quote

↓

Accepted

↓

Booked

↓

Workshop

↓

Completed
```

---

# Engineering Decisions

A number of design decisions were made throughout the project to keep the codebase maintainable.

These include:

- Repository Pattern
- Service Layer
- Thin Controllers
- Centralised validation
- Modular feature structure
- Shared TypeScript DTOs
- Consistent API responses
- Separation between frontend and backend deployments

---

# What I've Learned

Workshop has become far more than simply building pages.

Some of the areas I've explored while developing this project include:

- Structuring larger TypeScript projects
- Designing REST APIs
- Repository and Service patterns
- Modelling business workflows
- State machine design
- Error handling
- Production deployment
- Environment management
- Vercel deployment
- Railway deployment
- Debugging production-only issues
- Module interoperability between CommonJS and ES Modules
- Working with Supabase in production

One particularly valuable learning experience was deploying Workshop publicly. This involved configuring production builds, environment variables, deployment pipelines and diagnosing issues across multiple services.

---

# Roadmap

Workshop is an active project and the following features are planned for future releases.

## Authentication

- Secure login
- JWT authentication
- Session management

---

## Role-Based Access Control

Different user roles including:

- Administrator
- Manager
- Technician
- Reception

Each role will have different permissions throughout the application.

---

## Staff Assignment

Assign technicians to workshop jobs.

Example workflow:

```
Manager

↓

Assign Technician

↓

Technician Starts Work

↓

Review

↓

Manager Inspection
```

---

## Labour Tracking

Track:

- Start work
- Pause work
- Resume work
- Finish work

Generate estimated versus actual labour times.

---

## Internal Notes

Allow technicians to record:

- Work completed
- Customer conversations
- Additional findings
- Recommendations

---

## Parts Management

Record parts used during repairs.

Future versions may include inventory management and stock levels.

---

## Dashboard Analytics

Planned reporting includes:

- Jobs awaiting review
- Jobs awaiting parts
- Revenue metrics
- Average completion time
- Technician workload
- Quote acceptance rates

---

## Customer Notifications

Future support for:

- Job progress updates
- Collection notifications
- Internal workflow alerts

---

## Automated Testing

Increase test coverage by introducing:

- Unit tests
- Integration tests
- Component tests
- End-to-end testing

---

# Future Vision

The long-term vision for Workshop is to evolve from a portfolio project into software that could realistically be used by an independent garage.

Future development will focus less on adding CRUD pages and more on improving operational workflows, staff collaboration, reporting and overall product quality.

---

# Running Locally

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Author

**Danish Shafi**

GitHub

https://github.com/builtbydans

LinkedIn

https://www.linkedin.com/in/danishshafi/

---

## Status

🚧 Active Development

Workshop is continuously evolving as I explore new software engineering concepts, improve the architecture and add production-focused features.
