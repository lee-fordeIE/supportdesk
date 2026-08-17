// =========================
// SupportDesk - Ticket Data
// =========================

const tickets = [
    {
        id: 1042,
        customer: "Acme Ltd",
        customerInitials: "AC",
        title: "Unable to sign in",
        description: "Customer is unable to authenticate using their account credentials.",
        category: "Authentication",
        priority: "High",
        status: "Open",
        updated: "12 min ago"
    },
    {
        id: 1041,
        customer: "Northstar",
        customerInitials: "NS",
        title: "Invoice not showing",
        description: "Recent invoice is not appearing in the customer's billing section.",
        category: "Billing",
        priority: "Medium",
        status: "In Progress",
        updated: "38 min ago"
    },
    {
        id: 1040,
        customer: "GreenTech",
        customerInitials: "GT",
        title: "API connection timeout",
        description: "Customer is receiving timeout errors when connecting to the API.",
        category: "Integrations",
        priority: "Critical",
        status: "Open",
        updated: "1 hr ago"
    },
    {
        id: 1039,
        customer: "BrightView",
        customerInitials: "BV",
        title: "User permissions issue",
        description: "User is unable to access the required account permissions.",
        category: "Account",
        priority: "Low",
        status: "Resolved",
        updated: "2 hrs ago"
    }
];


// =========================
// Dashboard Elements
// =========================

const ticketTableBody = document.querySelector(".ticket-table tbody");
const statCards = document.querySelectorAll(".stat-card");


// =========================
// Modal Elements
// =========================

const ticketModal = document.getElementById("ticketModal");
const closeModalButton = document.getElementById("closeModal");
const cancelModalButton = document.getElementById("cancelModal");
const ticketForm = document.getElementById("ticketForm");

const newTicketButtons = document.querySelectorAll(".primary-button");


// =========================
// Render Tickets
// =========================

function renderTickets() {

    ticketTableBody.innerHTML = "";

    tickets.forEach(ticket => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>#${ticket.id}</strong>
            </td>

            <td>
                <div class="customer">
                    <div class="customer-avatar">
                        ${ticket.customerInitials}
                    </div>

                    <span>${ticket.customer}</span>
                </div>
            </td>

            <td>
                <strong>${ticket.title}</strong>
                <span class="ticket-subtitle">
                    ${ticket.category}
                </span>
            </td>

            <td>
                <span class="priority ${ticket.priority.toLowerCase()}">
                    ${ticket.priority}
                </span>
            </td>

            <td>
                <span class="status ${getStatusClass(ticket.status)}">
                    ${ticket.status}
                </span>
            </td>

            <td>
                ${ticket.updated}
            </td>
        `;

        ticketTableBody.appendChild(row);
    });
}


// =========================
// Status Styling
// =========================

function getStatusClass(status) {

    switch (status) {

        case "Open":
            return "open";

        case "In Progress":
            return "progress";

        case "Resolved":
            return "resolved";

        default:
            return "";
    }
}


// =========================
// Dashboard Statistics
// =========================

function updateStatistics() {

    const openTickets = tickets.filter(
        ticket => ticket.status === "Open"
    ).length;

    const inProgressTickets = tickets.filter(
        ticket => ticket.status === "In Progress"
    ).length;

    const resolvedTickets = tickets.filter(
        ticket => ticket.status === "Resolved"
    ).length;

    const criticalTickets = tickets.filter(
        ticket => ticket.priority === "Critical"
    ).length;


    statCards[0].querySelector(".stat-number").textContent =
        openTickets;

    statCards[1].querySelector(".stat-number").textContent =
        inProgressTickets;

    statCards[2].querySelector(".stat-number").textContent =
        resolvedTickets;

    statCards[3].querySelector(".stat-number").textContent =
        criticalTickets;
}


// =========================
// Generate Ticket ID
// =========================

function generateTicketId() {

    if (tickets.length === 0) {
        return 1001;
    }

    const highestId = Math.max(
        ...tickets.map(ticket => ticket.id)
    );

    return highestId + 1;
}


// =========================
// Generate Customer Initials
// =========================

function getCustomerInitials(customer) {

    const words = customer
        .trim()
        .split(/\s+/);

    if (words.length === 1) {
        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();
}


// =========================
// Open Modal
// =========================

function openTicketModal() {

    ticketModal.classList.add("active");

    document.body.classList.add("modal-open");

    document.getElementById("customer").focus();
}


// =========================
// Close Modal
// =========================

function closeTicketModal() {

    ticketModal.classList.remove("active");

    document.body.classList.remove("modal-open");

    ticketForm.reset();
}


// =========================
// Create Ticket
// =========================

function createTicket(event) {

    event.preventDefault();

    const customer =
        document.getElementById("customer").value.trim();

    const title =
        document.getElementById("title").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const category =
        document.getElementById("category").value;

    const priority =
        document.getElementById("priority").value;


    const newTicket = {

        id: generateTicketId(),

        customer: customer,

        customerInitials:
            getCustomerInitials(customer),

        title: title,

        description: description,

        category: category,

        priority: priority,

        status: "Open",

        updated: "Just now"
    };


    tickets.unshift(newTicket);


    renderTickets();

    updateStatistics();

    closeTicketModal();
}


// =========================
// Event Listeners
// =========================

newTicketButtons.forEach(button => {

    if (button.textContent.includes("New Ticket")) {

        button.addEventListener(
            "click",
            openTicketModal
        );

    }

});


closeModalButton.addEventListener(
    "click",
    closeTicketModal
);


cancelModalButton.addEventListener(
    "click",
    closeTicketModal
);


ticketForm.addEventListener(
    "submit",
    createTicket
);


ticketModal.addEventListener(
    "click",
    event => {

        if (event.target === ticketModal) {
            closeTicketModal();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            ticketModal.classList.contains("active")
        ) {
            closeTicketModal();
        }

    }
);


// =========================
// Initialise Dashboard
// =========================

renderTickets();

updateStatistics();