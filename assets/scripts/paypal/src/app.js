paypal.Buttons({
    createOrder: function(data, actions) {
        return fetch('/create-order', {
            method: 'post'
        }).then(res => res.json()).then(data => data.id);
    },
    onApprove: function(data, actions) {
        return fetch('/capture-order', {
            method: 'post',
            body: JSON.stringify({ orderId: data.orderID }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(data => {
            alert('Transaction completed: ' + JSON.stringify(data));
        });
    }
}).render('#paypal-button-container');
