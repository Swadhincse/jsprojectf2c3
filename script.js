function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(data => {
        const menuDiv = document.getElementById('menu');
        data.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('food-item');
          div.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p>$${item.price}</p>
          `;
          menuDiv.appendChild(div);
        });
      })
      .catch(error => console.log(error));
  }
  
  function takeOrder() {
    const orderPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const burgers = [];
        fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
          .then(response => response.json())
          .then(data => {
            for (let i = 0; i < 3; i++) {
              const burger = data.find(item => item.category === 'Burgers');
              burgers.push(burger);
            }
            resolve(burgers);
          })
          .catch(error => reject(error));
      }, 2500);
    });
  
    orderPromise
      .then(order => {
        console.log('Order received:', order);
        return orderPrep();
      })
      .then(status => {
        console.log('Order status:', status);
        return payOrder();
      })
      .then(status => {
        console.log('Payment status:', status);
        thankyouFnc();
      })
      .catch(error => console.log(error));
  }
 
  function orderPrep() {
    const prepPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
    return prepPromise;
  }
  
  function payOrder() {
    const payPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
    return payPromise;
  }
  
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
  }
  
  getMenu();
  