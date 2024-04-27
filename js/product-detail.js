const apiURL2 ="https://tiki.vn/api/v2/products?limit=4&include=advertisement&aggregations=2&trackity_id=4bfeab02-584e-ce42-4e4e-15f4f25250c7&q=th%E1%BB%B1c+ph%E1%BA%A9m+ch%E1%BB%A9c+n%C4%83ng";

fetch(apiURL2)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const products = data.data;

        const productDetails = document.querySelector('.product-details');
        const myCart2 = JSON.parse(localStorage.getItem('myCart')) || [];

        // Function to get query parameters from URL
        function $_GET(key) {
            const params = new URLSearchParams(window.location.search);
            return params.get(key);
        }

        // Function to find product by ID
        function get_product(id) {
            return products.find(sp => sp.id == id);
        }

        const productId = $_GET('id');
        const product = get_product(productId);

        if (product) {
            const container = document.createElement('div');
            container.classList.add('container');
            container.innerHTML = `
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="product__details__pic">
                            <div class="product__details__pic__item">
                                <img class="product__details__pic__item--large"
                                    src="${product.thumbnail_url}" alt="${product.name}">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="product__details__text">
                            <h3>${product.name}</h3>
                            <div class="product__details__price">${product.price.toLocaleString("vi-VN")} đ</div>
                            <p></p>
                            <div class="product__details__quantity">
                                <div class="quantity">
                                    <div class="pro-qty">
                                        <input type="text" value="1">
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="primary-btn addToCart">ADD TO CART</a>
                            <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
                            <ul>
                                <li><b>Availability</b> <span>In Stock</span></li>
                                <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                                <li><b>Weight</b> <span>${product.weight}</span></li>
                                <li><b>Share on</b>
                                    <div class="share">
                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                        <a href="#"><i class="fa fa-instagram"></i></a>
                                        <a href="#"><i class="fa fa-pinterest"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;
                
            container.querySelector('.addToCart').addEventListener('click', () => {
                const checkItem = myCart2.findIndex(itemCart => itemCart.id === product.id);
                if (checkItem !== -1) {
                    myCart2[checkItem].quantity++;
                } else {
                    const newItem = {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.thumbnail_url,
                        quantity: 1
                    };
                    myCart2.push(newItem);
                }
                localStorage.setItem('myCart', JSON.stringify(myCart2));
                Swal.fire({
                    icon: 'success',
                    title: 'Thành Công',
                    text: 'Đã thêm sản phẩm',
                    showConfirmButton: false,
                    timer: 1000,
                });
            });
            productDetails.appendChild(container);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
