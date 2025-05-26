// ////////////////////////////////////////////////////////////////////////////

// simple Pub/Sub system (publish and subscribe):
const PubSubSystem = (function () {
  const subscribers = {};

  // subscribe to a topic
  function subscribe(topic, callback) {
    if (!subscribers[topic]) {
      subscribers[topic] = [];
    }
    subscribers[topic].push(callback);
  }

  // publish data to a topic
  function publish(topic, data) {
    if (subscribers[topic]) {
      subscribers[topic].forEach((callback) => callback(topic, data));
    }
  }

  return { subscribe, publish };
})();

// ////////////////////////////////////////////////////////////////////////////

// order module:
const FoodOrderModule = (function () {
  let orderList = [];
  let latestDeliveryTime = null;
  const DELIVERY_TOPIC = 'delivery_time_update';

  // subscribe to delivery time updates:
  PubSubSystem.subscribe(DELIVERY_TOPIC, (topic, time) => {
    latestDeliveryTime = time; // cache latest time
    renderOrders(); // update UI with new times
  });

  // create a new order:
  function createOrder(orderId, items) {
    const order = {
      id: orderId,
      items,
      estimatedDeliveryTime: latestDeliveryTime || 30, // default if no update
    };
    orderList.push(order);
    renderOrders();
    return order;
  }

  // render orders to UI
  function renderOrders() {
    const orderListElement = document.getElementById('orderList');
    orderListElement.innerHTML = '';

    orderList.forEach((order) => {
      const orderElement = document.createElement('div');

      orderElement.classList.add('order');
      orderElement.textContent = `Order ${order.id}: ${order.items.join(
        ', '
      )} - Delivery in ${order.estimatedDeliveryTime} min`;
      orderListElement.appendChild(orderElement);
    });
  }

  return { createOrder };
})();

// delivery module:
const DeliveryModule = (function () {
  const DELIVERY_TOPIC = 'delivery_time_update';

  // calculate and publish delivery time
  function calculateDeliveryTime(orderCount) {
    const deliveryTime = 10 + orderCount * 5; // 10 min + 5 per order
    PubSubSystem.publish(DELIVERY_TOPIC, deliveryTime);
    return deliveryTime;
  }

  return { calculateDeliveryTime };
})();

// UI controller
function deliveryAppController() {
  const orderInput = document.getElementById('orderItems');
  const submitButton = document.getElementById('submitOrder');

  let orderCount = 0;

  submitButton.addEventListener('click', () => {
    const items = orderInput.value.split(',').map((item) => item.trim());

    if (items.length > 0) {
      orderCount++;
      FoodOrderModule.createOrder(orderCount, items); // create order
      DeliveryModule.calculateDeliveryTime(orderCount); // update delivery time
      orderInput.value = ''; // clear input
    }
  });
}

deliveryAppController();
