
const formToggleBtn = document.getElementById('formToggleBtn');
const floatingForm = document.getElementById('floatingForm');

// 1. Safe Event Listener Check

if (formToggleBtn && floatingForm) {
  formToggleBtn.addEventListener('click', () => {
    floatingForm.classList.toggle('active');
    formToggleBtn.classList.toggle('active-btn');
  });
}


if (closeBtn && floatingForm) {
  closeBtn.addEventListener('click', () => {
    floatingForm.classList.toggle('active');
    closeBtn.classList.toggle('active-btn');
  });
}
//const btnSideBar = document.getElementById('btnSideBar');
//const floatingNavBar = document.getElementById('floatingNavBar');

// 1. Safe Event Listener Check
//if (btnSideBar && floatingNavBar) {
 // btnSideBar.addEventListener('click', () => {
  //  floatingNavBar.classList.toggle('active');
  //  btnSideBar.classList.toggle('active-btn');
  //});
//}

let users = [
        { mawb: "160-2071 0432", account: "LAZADA MNL", arrival: "0530H", pcs: "120", instruction: "PSI to SPWH" },
        { mawb: "828-5729 0866", account: "LAZADA MNL", arrival: "2000H", pcs: "100", instruction: "PSI to SPWH" }
    ];

    // DOM Elements
    const userForm = document.getElementById('userForm');
    const userMawbInput = document.getElementById('mawb');
    const userAccountInput = document.getElementById('account');
    const userArrivalInput = document.getElementById('arrival');
    const userPcsInput = document.getElementById('pcs');
    const userInstructionInput = document.getElementById('instruction');
    const editIndexInput = document.getElementById('editIndex');
    const submitBtn = document.getElementById('submitBtn');
    const userTableBody = document.getElementById('userTableBody');

    // READ: Render data array into the HTML table
    function renderTable() {
        userTableBody.innerHTML = '';
        
        if (users.length === 0) {
            userTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No records found.</td></tr>`;
            return;
        }

        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.mawb}</td>
                <td>${user.account}</td>
                <td>${user.arrival}</td>
                <td>${user.pcs}</td>
                <td>${user.instruction}</td>
                <td>
                    <button id="btnEdit" class="btn-edit" onclick="editUser(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    // CREATE or UPDATE logic handler
    userForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload

        const mawb =userMawbInput.value.trim();
        const account = userAccountInput.value.trim();
        const arrival = userArrivalInput.value.trim(); //--wala pay sulod--//
        const pcs = userPcsInput.value.trim();  //--wala pay sulod--//
        const instruction = userInstructionInput.value.trim();  //--wala pay sulod--//
        const editIndex = parseInt(editIndexInput.value);

        if (editIndex === -1) {
            // CREATE operation: Add new entry to the array
            users.push({ mawb, account, arrival, pcs, instruction });
        } else {
            // UPDATE operation: Modify existing entry
            users[editIndex] = { mawb, account, arrival, pcs, instruction };
            editIndexInput.value = "-1"; // Reset form state flag
            submitBtn.textContent = "Add User";
            submitBtn.style.backgroundColor = "#28a745";
        }

        userForm.reset();
        renderTable();
    });


    // UPDATE: Populate form values to start edit mode
    function editUser(index) {
        userMawbInput.value = users[index].mawb;
        userAccountInput.value = users[index].account;
        userArrivalInput.value = users[index].arrival;
        userPcsInput.value = users[index].pcs;
        userInstructionInput.value = users[index].instruction;
        editIndexInput.value = index; // Store targeting index
        
        submitBtn.textContent = "Update User";
        submitBtn.style.backgroundColor = "#007bff";
    }

    // DELETE: Remove record by index array filtering
    function deleteUser(index) {
        if (confirm("Are you sure you want to delete this user?")) {
            users.splice(index, 1);
            
            // If deleting a row that is currently being edited, reset form
            if (parseInt(editIndexInput.value) === index) {
                userForm.reset();
                editIndexInput.value = "-1";
                submitBtn.textContent = "Add User";
                submitBtn.style.backgroundColor = "#28a745";
            }
            
            renderTable();
        }
    }

    // Initial table call on script load
    renderTable();
