const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080' 
    : 'http://crmwebapp-env.eba-hur2mvaf.us-east-1.elasticbeanstalk.com';

document.addEventListener('DOMContentLoaded', () => {
    async function fetchContacts() {
        try {
            console.log('Fetching contacts from:', `${API_URL}/api/contacts`);
            const response = await fetch(`${API_URL}/api/contacts`);
            if (!response.ok) {
                throw new Error(`Failed to fetch contacts. Status: ${response.status}`);
            }

            const contacts = await response.json();
            console.log('Fetched contacts:', contacts);

            const tableBody = document.getElementById('contactTableBody');
            tableBody.innerHTML = '';

            contacts.forEach(contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-4 py-2">${contact.contact_name || ''}</td>
                    <td class="px-4 py-2">${contact.account_name || ''}</td>
                    <td class="px-4 py-2">${contact.contact_owner || ''}</td>
                    <td class="px-4 py-2">${contact.title || ''}</td>
                    <td class="px-4 py-2">${contact.email_address || ''}</td>
                    <td class="px-4 py-2">${contact.phone_number || ''}</td>
                    <td class="px-4 py-2">${contact.company_address || ''}</td>
                    <td class="px-4 py-2">${contact.comments || ''}</td>
                    <td class="px-4 py-2">${contact.created_date || ''}</td>
                    <td class="px-4 py-2">
                        <a href="contact_detail.html?contactId=${contact.contact_id}" 
                           class="text-blue-600 hover:underline">View</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching contacts:', error);
            alert('An error occurred while fetching contacts.');
        }
    }

    fetchContacts();
});
