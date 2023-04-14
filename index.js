const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()

app.get('/customers', async (req, res) => {
    const customers = await prisma.customers.findMany()

    res.send(`
        <table>
            <thead>
                <tr>
                    <th>Customer Number</th>
                    <th>Customer Name</th>
                    <th>Contact Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                ${customers.map(customer => `
                    <tr>
                        <td>${customer.customerNumber}</td>
                        <td>${customer.customerName}</td>
                        <td>${customer.contactFirstName} ${customer.contactLastName}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.addressLine1} ${customer.addressLine2 ? customer.addressLine2 : ''}</td>
                        <td>${customer.city}</td>
                        <td>${customer.country}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `)
})

app.get('/customers/:customerId/orders', async (req, res) => {
    const customerId = parseInt(req.params.customerId)

    if (isNaN(customerId)) {
        return res.status(400).json({ error: 'Invalid customer ID' })
    }

    const customer = await prisma.customers.findUnique({
        where: { customerNumber: customerId },
        include: { orders: true },
    })

    if (customer) {
        res.send(`
            <h1>Orders for ${customer.customerName}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Required Date</th>
                        <th>Shipped Date</th>
                        <th>Status</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    ${customer.orders.map(order => `
                        <tr>
                            <td>${order.orderNumber}</td>
                            <td>${order.orderDate}</td>
                            <td>${order.requiredDate}</td>
                            <td>${order.shippedDate ? order.shippedDate : ''}</td>
                            <td>${order.status}</td>
                            <td>${order.comments ? order.comments : ''}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `)
    } else {
        res.status(404).json({ error: 'Customer not found' })
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})