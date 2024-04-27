const apiURL ="https://tiki.vn/api/v2/products?limit=4&include=advertisement&aggregations=2&trackity_id=4bfeab02-584e-ce42-4e4e-15f4f25250c7&q=th%E1%BB%B1c+ph%E1%BA%A9m+ch%E1%BB%A9c+n%C4%83ng";
const myCart = JSON.parse(localStorage.getItem('myCart')) || [];

//localStorage.removeItem('myCart')
const response = fetch(apiURL).then((response) => response.json()).then((data) => {
    console.log(data.data);
    const featuredfilter = document.querySelector(".featured__filter");
    data.data.forEach((item) => {
      const mix = document.createElement("div");
      mix.classList.add("col-lg-3","col-md-4","col-sm-6","mix","oranges","fresh-meat");
      mix.innerHTML = `
            <div class="featured__item">
                <div class="featured__item__pic set-bg="">
                 <img src="${item.thumbnail_url}" alt="">
                    <ul class="featured__item__pic__hover">
                        <li><a href=""><i class="fa fa-heart"></i></a></li>
                        <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                        <li><a href="#" class="addToCart">
                                <i class="fa fa-shopping-cart"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="featured__item__text">
                    <h6><a href="shop-details.html?id=${item.id}">${item.name}</a></h6>
                    <h5>${item.price.toLocaleString()} đ</h5>
                </div>
            </div>
        `;
        
     mix.querySelector('.addToCart').addEventListener('click' , () => {
        const checkItem = myCart.findIndex( itemCart => itemCart.id === item.id);
            if(checkItem !== -1){
            myCart[checkItem].quantity++;
            }
            else{
                const newItem = {
                    id: item.id,
                    name : item.name,
                    price : item.price,
                    image : item.thumbnail_url,
                    quantity : 1
                }
                myCart.push(newItem);
                }
                localStorage.setItem('myCart' ,JSON.stringify(myCart));
           
      Swal.fire({
        icon : 'success',
        title: 'Thành Công',
        text : 'Đã thêm sản phẩm',
        showConfirmButton: false,
        timer : 1000,
       })
        })

        featuredfilter.appendChild(mix); 

    });
  });
 
