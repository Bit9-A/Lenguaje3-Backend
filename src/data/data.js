export const data = {
    user_roles: [
      { id: "1", role_name: "Administrator" },
      { id: "2", role_name: "Project Manager" },
      { id: "3", role_name: "Employee" }
    ],
    employee_types: [
      { id: "1", type_name: "Carpenter" },
      { id: "2", type_name: "Electrician" },
      { id: "3", type_name: "Plumber" }
    ],
    budget_types: [
      { id: "1", type_name: "Low Budget" },
      { id: "2", type_name: "Medium Budget" },
      { id: "3", type_name: "High Budget" }
    ],
    material_types: [
      { id: "1", name: "Wood", price: 50 },
      { id: "2", name: "Paint", price: 30 },
      { id: "3", name: "Tiles", price: 25 }
    ],
    payment_types: [
      { id: "1", name: "Credit Card", description: "Payment via credit card" },
      { id: "2", name: "Bank Transfer", description: "Direct bank transfer" },
      { id: "3", name: "Cash", description: "Cash payment" }
    ],
    clients: [
      {
        id: "2",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        address: "456 Elm St",
        birthdate: "1985-05-15",
        gender: "Female",
        national_id: "CD789012",
        status: "Activo"
      },
      {
        id: "3",
        firstname: "Bob",
        lastname: "Johnson",
        email: "bob@example.com",
        phone: "555-555-5555",
        address: "789 Oak St",
        birthdate: "1990-12-31",
        gender: "Male",
        national_id: "EF345678"
      },
      {
        id: "fbd6",
        firstname: "Adrian",
        lastname: "Vergel",
        email: "ADRIAN24VERGEL@GMAIL.COM",
        phone: "04129657169",
        address: "casa numero 18",
        birthdate: "2024-11-16",
        gender: "Male",
        national_id: "30297111"
      },
      {
        id: "5e84",
        firstname: "Adrian",
        lastname: "Vergel",
        email: "ADRIAN24VERGEL@GMAIL.COM",
        phone: "04149721069",
        address: "casa numero 18",
        birthdate: "2024-11-16",
        gender: "Male",
        national_id: "32141543"
      }
    ],
    users: [
      {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        password: "adminpass",
        phone: "111-222-3333",
        address: "Admin St",
        preferences: "Light Mode",
        username: "admin",
        role_id: 1,
        status: "Active"
      },
      {
        id: "2",
        name: "Manager User",
        email: "manager@example.com",
        password: "managerpass",
        phone: "444-555-6666",
        address: "Manager Ave",
        preferences: "Light Mode",
        username: "manager",
        role_id: 2,
        status: "Active"
      },
      {
        id: "3",
        name: "Employee User",
        email: "employee@example.com",
        password: "employeepass",
        phone: "777-888-9999",
        address: "Employee Blvd",
        preferences: "Default",
        username: "employee",
        role_id: 3,
        status: "Active"
      }
    ],
    employees: [
      {
        id: "1",
        firstname: "Alice",
        lastname: "Brown",
        email: "alice@example.com",
        phone: "111-111-1111",
        position: "Senior Carpenter",
        schedule: "Full-time",
        employee_type_id: 1,
        birthdate: "1975-03-10",
        gender: "Female",
        national_id: "GH901234",
        hire_date: "2010-01-15"
      },
      {
        id: "2",
        firstname: "Charlie",
        lastname: "Davis",
        email: "charlie@example.com",
        phone: "222-222-2222",
        position: "Electrician",
        schedule: "Part-time",
        employee_type_id: 2,
        birthdate: "1988-07-22",
        gender: "Male",
        national_id: "IJ567890",
        hire_date: "2015-06-01"
      },
      {
        id: "9226",
        firstname: "Adrian",
        lastname: "Vergel",
        email: "teste@exemplo.us",
        phone: "3121286800",
        position: "2",
        status: "Active",
        projects: "0",
        hireDate: "2024-11-04"
      }
    ],
    client_proposals: [
      {
        id: "2",
        client_id: "2",
        proposal_description: "Bathroom Remodel",
        proposal_date: "2023-02-15",
        budget_type_id: "1",
        status: "Accepted"
      },
      {
        id: "3",
        client_id: "3",
        proposal_description: "Home Extension",
        proposal_date: "2023-03-20",
        budget_type_id: "3",
        status: "Accepted"
      },
      {
        id: "4feb",
        client_id: "fbd6",
        proposal_description: "Hola Soy Goku",
        proposal_date: "2024-11-16",
        budget_type_id: "1",
        status: "Accepted",
        comments: []
      },
      {
        id: "26e3",
        client_id: "5e84",
        proposal_description: "Hola Soy Vegetta",
        proposal_date: "2024-11-17",
        budget_type_id: "2",
        status: "Accepted",
        comments: []
      },
      {
        id: "343d",
        client_id: "5e84",
        proposal_description: "Hola Soy Gohan",
        proposal_date: "2024-11-17",
        budget_type_id: "2",
        status: "Pending",
        comments: []
      }
    ],
    projects: [
      {
        id: "1",
        name: "Doe Kitchen Renovation",
        description: "Complete kitchen renovation for John Doe",
        start_date: "2023-02-01",
        end_date: "2023-04-30",
        status: "In Progress",
        proposal_id: 1,
        is_paid: false
      },
      {
        id: "2",
        name: "Smith Bathroom Remodel",
        description: "Bathroom remodeling for Jane Smith",
        start_date: "2023-03-01",
        end_date: "2023-04-15",
        status: "In Progress",
        proposal_id: 2,
        is_paid: true
      },
      {
        id: "13af",
        name: "Kitchen Renovation",
        description: "Kitchen Renovation",
        start_date: "2024-11-16",
        end_date: null,
        status: "In Progress",
        proposal_id: "1",
        is_paid: false
      },
      {
        id: "7eb3",
        name: "Hola Soy Goku",
        description: "Hola Soy Goku",
        start_date: "2024-11-16",
        end_date: "2024-11-16",
        status: "Completed",
        proposal_id: "4feb",
        is_paid: false
      },
      {
        id: "fcd9",
        name: "Bathroom Remodel",
        description: "Bathroom Remodel",
        start_date: "2024-11-17",
        end_date: null,
        status: "Planning",
        proposal_id: "2",
        is_paid: false
      }
    ],
    services: [
      {
        id: "1",
        name: "Carpentry",
        description: "Custom carpentry work",
        price: 500
      },
      {
        id: "2",
        name: "Electrical Installation",
        description: "Electrical wiring and fixture installation",
        price: 750
      },
      {
        id: "3",
        name: "Plumbing",
        description: "Plumbing installation and repair",
        price: 600
      },
      {
        id: "2165",
        name: "Remodelacion de Baño",
        description: "blah blah",
        price: "100"
      }
    ],
    project_services: [
      {
        project_id: 1,
        service_id: 1,
        is_paid: true,
        status: "Completed",
        end_date: "2023-03-15",
        id: "b7af"
      },
      {
        project_id: 1,
        service_id: 2,
        is_paid: false,
        status: "In Progress",
        end_date: "2023-04-15",
        id: "5f0d"
      },
      {
        project_id: 2,
        service_id: 3,
        is_paid: true,
        status: "Completed",
        end_date: "2023-04-10",
        id: "e7f2"
      },
      {
        id: "5e72",
        project_id: "1",
        service_id: 1,
        is_paid: false,
        status: "In Progress",
        end_date: null
      },
      {
        id: "102c",
        project_id: "1",
        service_id: 1,
        is_paid: false,
        status: "In Progress",
        end_date: null
      },
      {
        id: "93c3",
        project_id: "1",
        service_id: 1,
        is_paid: true,
        status: "Completed",
        end_date: null
      },
      {
        id: "9593",
        project_id: "13af",
        service_id: 1,
        is_paid: true,
        status: "Completed",
        end_date: null
      },
      {
        id: "0e89",
        project_id: "2cd0",
        service_id: 1,
        is_paid: true,
        status: "Completed",
        end_date: null
      },
      {
        id: "5e2a",
        project_id: "7eb3",
        service_id: 2165,
        is_paid: true,
        status: "Completed",
        end_date: null
      },
      {
        id: "f89e",
        project_id: "2",
        service_id: 2,
        is_paid: true,
        status: "In Progress",
        end_date: null
      },
      {
        id: "89f0",
        project_id: "2",
        service_id: 2,
        is_paid: false,
        status: "In Progress",
        end_date: null
      }
    ],
    payments: [
      {
        id: "1",
        amount: 1000,
        payment_date: "2023-02-15",
        project_id: 1,
        payment_type_id: 1,
        description: "Deposit for Kitchen Renovation",
        service_id: null,
        material_id: null
      },
      {
        id: "2",
        amount: 750,
        payment_date: "2023-03-20",
        project_id: 2,
        payment_type_id: 2,
        description: "Final payment for Bathroom Remodel",
        service_id: null,
        material_id: null
      },
      {
        id: "3",
        amount: 2000,
        payment_date: "2023-04-05",
        project_id: 3,
        payment_type_id: 3,
        description: "Initial payment for Home Extension",
        service_id: null,
        material_id: null
      }
    ],
    materials_project: [
      {
        id: "1",
        type_id: 1,
        quantity: 100,
        project_id: 1
      },
      {
        id: "2",
        type_id: 2,
        quantity: 50,
        project_id: 2
      },
      {
        id: "3",
        type_id: 3,
        quantity: 200,
        project_id: 3
      }
    ],
    notifications: [
      {
        id: "1",
        message: "Kitchen renovation project started",
        sent_at: "2023-02-01T09:00:00Z",
        project_id: 1
      },
      {
        id: "2",
        message: "Bathroom remodel completed",
        sent_at: "2023-04-15T16:30:00Z",
        project_id: 2
      },
      {
        id: "3",
        message: "Home extension planning phase initiated",
        sent_at: "2023-04-01T10:15:00Z",
        project_id: 3
      }
    ],
    project_progress: [
      {
        id: "1",
        project_id: 1,
        progress_description: "Demolition completed",
        progress_date: "2023-02-10",
        visible: true
      },
      {
        id: "2",
        project_id: 1,
        progress_description: "Cabinets installed",
        progress_date: "2023-03-05",
        visible: true
      },
      {
        id: "3",
        project_id: 2,
        progress_description: "Tiling finished",
        progress_date: "2023-03-25",
        visible: true
      }
    ],
    project_employees: [
      {
        project_id: 1,
        employee_id: 1,
        id: "6c1d"
      },
      {
        project_id: 1,
        employee_id: 2,
        id: "72b9"
      },
      {
        project_id: 2,
        employee_id: 3,
        id: "b808"
      }
    ],
    client_interactions: [
      {
        id: "f67b",
        client_id: "2",
        employee_id: "1",
        type: "Email",
        interaction_date: "2024-11-09",
        notes: "dasd",
        follow_up: false
      },
      {
        id: "ceb0",
        client_id: "5e84",
        employee_id: "2",
        type: "Email",
        interaction_date: "2024-11-16",
        notes: "adada",
        follow_up: false
      }
    ],
    project_service_employees: [
      {
        project_id: 1,
        service_id: 1,
        employee_id: 1,
        id: "5195"
      },
      {
        project_id: 1,
        service_id: 2,
        employee_id: 2,
        id: "fb6c"
      },
      {
        project_id: 2,
        service_id: 3,
        employee_id: 3,
        id: "88b8"
      }
    ]
  };