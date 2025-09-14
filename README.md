# SaaS Contracts Dashboard

A React + Tailwind CSS web application for managing SaaS contracts.  
This project was built as part of the **UI/UX Assignment**.

---

##  Features

- **Authentication**
  - Simple login with mock JWT (password = `test123`)
  - Redirect unauthenticated users to login

- **Dashboard**
  - Sidebar navigation (Contracts, Insights, Reports, Settings)
  - Topbar with Upload button and Logout
  - Contracts table with:
    - Search by contract name or parties
    - Filters for status and risk
    - Pagination (10 per page)
    - Loading / Error / Empty states

- **Contract Details**
  - Metadata: name, parties, expiry, status, risk
  - Clauses with summaries and confidence scores
  - AI Insights with severity labels
  - Evidence drawer that slides in/out

- **File Upload**
  - Upload modal with drag & drop or browse
  - Progress bar for each file
  - Success / Error / Cancel states



## Tech Stack

- React (functional components, hooks)
- React Router v6
- Tailwind CSS
- Context API (for state management)
- Vite (build tool)
- Mock API (static JSON in `/public`)

