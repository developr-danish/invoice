// table field start from here
document.getElementById('add-item').addEventListener('click', addItem);

let grandTotal = 0;
let cgstTotal = 0;
let sgstTotal = 0;
let totalPaid = 0;

function addItem() {
    const item = document.getElementById('item').value;
    const rate = parseFloat(document.getElementById('rate').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const paidAmount = parseFloat(document.getElementById('paid-amount').value);

    if (item && !isNaN(rate) && !isNaN(amount) && !isNaN(quantity) && !isNaN(paidAmount)) {
        const totalAmount = amount * quantity;
        const cgst = totalAmount * (rate / 200);
        const sgst = totalAmount * (rate / 200);
        const total = totalAmount + cgst + sgst;

        const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        // Store the values in the row as data attributes, including paid amount
        newRow.setAttribute('data-total-amount', totalAmount);
        newRow.setAttribute('data-cgst', cgst);
        newRow.setAttribute('data-sgst', sgst);
        newRow.setAttribute('data-total', total);
        newRow.setAttribute('data-paid-amount', paidAmount);  // Store the paid amount

        newRow.innerHTML = `
            <td>${item}</td>
            <td>${rate}%</td>
            <td>${quantity}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${totalAmount.toFixed(2)}</td>
            <td>${cgst.toFixed(2)}</td>
            <td>${sgst.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
            <button class="btn-delete"><i class="fa-solid fa-xmark"></i></button>
        `;

        // Update the grand total
        grandTotal += totalAmount;
        document.getElementById('ttl-amt').textContent = `₹${grandTotal.toFixed(2)}`;

        // Update the CGST total
        cgstTotal += cgst;
        document.getElementById('ttl-cgst').textContent = `₹${cgstTotal.toFixed(2)}`;

        // Update the SGST total
        sgstTotal += sgst;
        document.getElementById('ttl-sgst').textContent = `₹${sgstTotal.toFixed(2)}`;

        // Update the grand total with GST
        const grandTotalWithGST = grandTotal + cgstTotal + sgstTotal;
        document.getElementById('grandtotal').textContent = `₹${grandTotalWithGST.toFixed(2)}`;

        // Update the total paid amount
        totalPaid += paidAmount;
        document.getElementById('total-paid').textContent = `₹${totalPaid.toFixed(2)}`;

        // Update the balance left
        const balanceLeft = grandTotalWithGST - totalPaid;
        document.getElementById('balance-left').textContent = `₹${balanceLeft.toFixed(2)}`;

        // Add event listener for the delete button
        newRow.querySelector('.btn-delete').addEventListener('click', function() {
            deleteItem(this);
        });

        // Clear input fields
        document.getElementById('item').value = '';
        document.getElementById('rate').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('paid-amount').value = '';
    } else {
        alert('Please fill out all fields correctly.');
    }
}

function deleteItem(button) {
    const row = button.parentElement.parentElement;

    // Retrieve the stored values from the row's data attributes
    const totalAmount = parseFloat(row.getAttribute('data-total-amount'));
    const cgst = parseFloat(row.getAttribute('data-cgst'));
    const sgst = parseFloat(row.getAttribute('data-sgst'));
    const total = parseFloat(row.getAttribute('data-total'));
    const paidAmount = parseFloat(row.getAttribute('data-paid-amount'));  // Retrieve the paid amount

    // Update the totals
    grandTotal -= totalAmount;
    document.getElementById('ttl-amt').textContent = `₹${grandTotal.toFixed(2)}`;

    cgstTotal -= cgst;
    document.getElementById('ttl-cgst').textContent = `₹${cgstTotal.toFixed(2)}`;

    sgstTotal -= sgst;
    document.getElementById('ttl-sgst').textContent = `₹${sgstTotal.toFixed(2)}`;

    const grandTotalWithGST = grandTotal + cgstTotal + sgstTotal;
    document.getElementById('grandtotal').textContent = `₹${grandTotalWithGST.toFixed(2)}`;

    // Update the total paid amount
    totalPaid -= paidAmount;
    document.getElementById('total-paid').textContent = `₹${totalPaid.toFixed(2)}`;

    // Update the balance left
    const balanceLeft = grandTotalWithGST - totalPaid;
    document.getElementById('balance-left').textContent = `₹${balanceLeft.toFixed(2)}`;

    // Remove the row from the table
    row.remove();
}






// invoice field start from here

// Use datepicker on the date inputs

document.getElementById('add-invoice').addEventListener('click', addInvoice);

function addInvoice() {
    const invoice = document.getElementById('invoice-no').value;
    const date = document.getElementById('Invoice-date').value;
    const due = document.getElementById('invoice-due').value;
    
    document.getElementById('inv-no').textContent = invoice;
    document.getElementById('inv-no2').textContent = invoice;
    document.getElementById('inv-date').textContent = date;
    document.getElementById('inv-date2').textContent = date;
    document.getElementById('inv-due').textContent = due;

    // Clear input fields
    document.getElementById('invoice-no').value = '';
    document.getElementById('Invoice-date').value = '';
    document.getElementById('invoice-due').value = '';
    
}

// address field start from here

document.getElementById('add-address').addEventListener('click', addAddress);

function addAddress() {
    const name = document.getElementById('clientname').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const gst = document.getElementById('gst').value;
    
    document.getElementById('client-name').textContent = name;
    document.getElementById('client-name2').textContent = name;
    document.getElementById('client-address').textContent = address;
    document.getElementById('client-gst').textContent = `GSTIN: ${gst}`;
    document.getElementById('client-phone').textContent = phone;

    // Clear input fields
    document.getElementById('clientname').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('gst').value = '';
}


// bank account adding part start from here

document.getElementById('add-bank').addEventListener('click', addbank);

function addbank() {
    const accountname = document.getElementById('act-name').value;
    const accountnumber = document.getElementById('act-no').value;
    const bankifsc = document.getElementById('act-ifsc').value;
    const accounttype = document.getElementById('act-type').value;
    const bankname = document.getElementById('b-name').value;
    
    document.getElementById('account-name').textContent = accountname;
    document.getElementById('account-no').textContent = accountnumber;
    document.getElementById('ifsc').textContent = bankifsc;
    document.getElementById('bank-type').textContent = accounttype;
    document.getElementById('bank-name').textContent = bankname;

    // Clear input fields
    document.getElementById('account-name').value = '';
    document.getElementById('account-no').value = '';
    document.getElementById('ifsc').value = '';
    document.getElementById('bank-type').value = '';
    document.getElementById('bank-name').value = '';
}


