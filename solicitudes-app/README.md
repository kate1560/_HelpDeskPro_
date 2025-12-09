# 📬 Request and Ticket System – Fullstack App

Application developed with **Next.js and Ts** and a backend in **Express**, which allows the management of requests/tickets made by users and administered by agents.

## 🚀 System Overview

The system allows for two types of users:

### 👤 **Customer**
- Create requests (tickets) with a title and description.
- View the status of each request.
- Receive updates when an agent changes its status.
- View comments added by agents.

### 🛠️ **Agent**
- View all requests in the system.
- Change the status of a ticket (pending, approved, rejected).
- Add comments to any ticket.
- Delete requests.
- Access the administration panel (Dashboard).

## 📌 Main Features

### ✔ Create tickets  
Users can create requests from the public view `/requests`.

### ✔ Ticket management (Agent)  
Agents can:
- Edit status
- Delete tickets
- View full details
- Add comments

### ✔ Ticket detail view  
Each ticket allows you to view:
- Title  
- Description  
- Status  
- User email  
- Agent comments  

### ✔ Authentication with NextAuth  
- Allows you to block access to the dashboard for non-agent users.

## ⚠️ What the system **DOES NOT** do (Limitations)
- It does not send emails.
- It does not have multiple roles or agent creation from the interface.
- It does not include WebSockets (comments do not appear in real time without reloading).
- It does not allow comment editing.
- It does not allow file attachments.
- It does not have a panel for creating users.
- It does not use MongoDB as its actual database (it uses **local JSON as a simulated database**).

# 📁 Project Structure (Frontend + Backend)

solicitudes-app/
│
├── backend/
│ ├── data/
│ ├── dist/
│ ├── src/
│ │ ├── routes/
│ │ │ └── requests.ts
│ │ ├── db.ts
│ │ └── server.ts
│ └── package.json
│
├── src/ ← Frontend (Next.js)
│ ├── app/
│ │ ├── requests/
│ │ │ ├── page.tsx
│ │ │ └── [id]/page.tsx ← Editar solicitud
│ │ ├── ticket/
│ │ │ ├── page.tsx ← Lista de tickets (agente)
│ │ │ └── [id]/page.tsx ← Detalle del ticket
│ │ ├── dashboard/page.tsx
│ │ └── api/auth/
│ ├── components/
│ ├── lib/
│ └── types/
│
├── public/
├── prisma/ (si aplica)
├── .env.local
├── package.json
└── README.md  


# 🖥️ How to run the Backend

* From the folder:
cd backend

* Install dependencies:

npm install

* Run:

npm run dev

# 🌐 How to run the Frontend (Next.js)

* From the project root:

* Install dependencies:

npm install

* Then:

npm run dev

# 📦 Technologies Used

- **Next.js **
- **React**
- **NextAuth**
- **TailwindCSS**
- **Express**
- **Typescript**

# 📸 Screenshots  



# 👨‍💻 Coder Data
| Dato | Información |
|------|-------------|
| **Name:** | Kateryn Yulieth Martinez Reyes |
| **Clan:** | Tayrona |
| **Email:** | katemartinez1507@gmail.com|
| **Document:** | 1052631043 |


