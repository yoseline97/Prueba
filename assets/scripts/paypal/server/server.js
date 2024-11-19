const express = require('express');
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
app.use(bodyParser.json());

const Environment = new paypal.core.SandboxEnvironment('AZ9a26BQjiLj69UkpOySrQBzCdlSu8uwN4xYwQUTE9vHr_0MlaBsChY_6q-lunjErVZCNflc8-D4DvR4', 'EL4Pg7VzqKVcykBa_qiXy_ggTJ494U3j0NKUX91ycSJys0JBAbni3YoNujNhNARCb0mlMS7h6UjMgXzB');
const client = new paypal.core.PayPalHttpClient(Environment);

app.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'USD', value: '100.00' } }]
    });
    const order = await client.execute(request);
    res.json({ id: order.result.id });
});

app.post('/capture-order', async (req, res) => {
    const { orderId } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    const capture = await client.execute(request);
    res.json(capture.result);
});

app.listen(8080, () => console.log('Server running on http://localhost:8080'));
